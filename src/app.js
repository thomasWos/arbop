import { strideRedemptionMap } from './chains/stride.js';
import { neutronRedemptionMap, neutronLsds } from './chains/neutron.js';

import { terraLsds } from './chains/terra.js';
import { kujiLsds } from './chains/kujira.js';
import { osmoLsds } from './chains/osmosis.js';
import { migalooRedemptionMap, whaleLsds } from './chains/migaloo.js';
import { chihuahuaLsds } from './chains/chihuahua.js';
import { queryMoarRate } from './moarRate.js';
import { stafiRedemptionMap } from './chains/stafihub.js';
import { sEgldArb } from './multiversx.js';
import { queryContract, arbitrage, calculateApy } from './utils.js';
import { stafiLsds } from './chains/stafihub.js';
import { junoRedemptionMap, junoLsds } from './chains/juno.js';
import { persistenceRedemptionMap, persistencePairs } from './chains/persistence.js';

function setAll(from, to) {
  from.forEach((value, key) => to.set(key, value));
}

async function computeArbs() {
  const redemptionMap = new Map();
  setAll(await strideRedemptionMap(), redemptionMap);
  setAll(await neutronRedemptionMap(), redemptionMap);
  setAll(await migalooRedemptionMap(), redemptionMap);
  setAll(await junoRedemptionMap(), redemptionMap);
  setAll(await persistenceRedemptionMap(), redemptionMap);

  const moarRate = await queryMoarRate();
  redemptionMap.set('MOAR', moarRate);
  redemptionMap.set('MOARtoROAR', 1 / moarRate);

  const stafiMap = await stafiRedemptionMap();
  redemptionMap.set('rATOM', stafiMap.get('uratom'));
  redemptionMap.set('rHUAHUA', stafiMap.get('urhuahua'));
  redemptionMap.set('rIRIS', stafiMap.get('uriris'));
  redemptionMap.set('rSWTH', stafiMap.get('urswth'));

  console.log(redemptionMap);

  const lsds = [
    ...terraLsds,
    ...kujiLsds,
    ...chihuahuaLsds,
    ...whaleLsds,
    ...osmoLsds,
    ...stafiLsds,
    ...neutronLsds,
    ...junoLsds,
    ...persistencePairs,
  ];

  const arbs = await Promise.all(lsds.map((lsd, index) => computeArb(lsd, index, redemptionMap)));

  const sEgld = await sEgldArb();
  const apy = calculateApy(sEgld.arb, 10);

  sEgld.id = lsds.length;
  arbs.push(sEgld);

  console.log('Fetch arbs SUCCESS');
  return arbs.sort((a, b) => b.arb - a.arb);
}

async function computeArb(lsd, index, redemptionMap) {
  let exchangeRate;
  let unboundingPeriod;

  if (lsd.unboundingPeriod) {
    unboundingPeriod = lsd.unboundingPeriod;
  }

  if (lsd.redemptionKey) {
    const redemption = redemptionMap.get(lsd.redemptionKey);
    if (redemption instanceof Object) {
      exchangeRate = redemption.redemptionRate;
      unboundingPeriod = redemption.unboundingPeriod;
    } else {
      exchangeRate = redemptionMap.get(lsd.redemptionKey);
    }
  } else if (lsd.stakingContract) {
    const data = await queryContract(lsd.stakingContract.contract, { state: {} });
    exchangeRate = lsd.stakingContract.exchangeRate(data);
  }

  const tokenInAmount = 1000000;
  let tokenOutAmount;

  if (lsd.osmosis) {
    const quote =
      'https://sqsprod.osmosis.zone/router/quote' +
      `?tokenIn=${tokenInAmount}` +
      `${encodeURIComponent(lsd.osmosis.tokenIn)}` +
      `&tokenOutDenom=${encodeURIComponent(lsd.osmosis.tokenOut)}`;

    await fetch(quote)
      .then((response) => response.json())
      .then((data) => (tokenOutAmount = data.amount_out));
  } else if (lsd.simuSwap) {
    tokenOutAmount = await lsd.simuSwap(tokenInAmount);
  } else {
    // DEX smart contract
    let infoOfferAsset;
    if (lsd.offerTokenAddr) {
      // Token
      infoOfferAsset = {
        token: {
          contract_addr: lsd.offerTokenAddr,
        },
      };
    } else {
      // Native token
      infoOfferAsset = {
        native_token: {
          denom: lsd.offerNativeTokenDenom,
        },
      };
    }

    const { return_amount } = await queryContract(lsd.poolContract, {
      simulation: {
        offer_asset: {
          info: infoOfferAsset,
          amount: `${tokenInAmount}`,
        },
      },
    });
    tokenOutAmount = return_amount;
  }

  const arb = arbitrage(exchangeRate, tokenInAmount, tokenOutAmount);

  let apy;
  if (unboundingPeriod) {
    apy = calculateApy(arb, unboundingPeriod);
  }
  return { id: index, name: lsd.name, arb: arb, dex: lsd.dex, ...(apy && { apy }) };
}

export async function tryComputeArbs() {
  try {
    return await computeArbs();
  } catch (error) {
    console.error(`Error computing arbs`, error);
  }
}
