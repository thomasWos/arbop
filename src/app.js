import { strideRedemptionMap } from './lsds/stride.js';
import { neutronRedemptionMap } from './lsds/neutron.js';

import { terraLsds } from './lsds/terra.js';
import { kujiLsds } from './lsds/kujira.js';
import { osmoLsds } from './lsds/osmosis.js';
import { migalooRedemptionMap, whaleLsds } from './lsds/migaloo.js';
import { chihuahuaLsds } from './lsds/chihuahua.js';
import { queryMoarRate } from './moarRate.js';
import { stafiRedemptionMap } from './lsds/stafihub.js';
import { sEgldArb } from './multiversx.js';
import { queryContract, arbitrage, calculateApy } from './utils.js';
import { stafiLsds } from './lsds/stafihub.js';

function setAll(from, to) {
  from.forEach((value, key) => to.set(key, value));
}

async function computeArbs() {
  const redemptionMap = new Map();
  setAll(await strideRedemptionMap(), redemptionMap);
  setAll(await neutronRedemptionMap(), redemptionMap);
  setAll(await migalooRedemptionMap(), redemptionMap);

  const moarRate = await queryMoarRate();
  redemptionMap.set('MOAR', moarRate);
  redemptionMap.set('MOARtoROAR', 1 / moarRate);

  const stafiMap = await stafiRedemptionMap();
  redemptionMap.set('rATOM', stafiMap.get('uratom'));
  redemptionMap.set('rHUAHUA', stafiMap.get('urhuahua'));
  redemptionMap.set('rIRIS', stafiMap.get('uriris'));
  redemptionMap.set('rSWTH', stafiMap.get('urswth'));

  console.log(redemptionMap);

  const xAstroNeutron = {
    name: 'ASTRO → xASTRO',
    dex: 'Astroport Neutron',
    redemptionKey: 'xASTRO',
    offerNativeTokenDenom: 'factory/neutron1ffus553eet978k024lmssw0czsxwr97mggyv85lpcsdkft8v9ufsz3sa07/astro',
    poolContract: 'neutron1kmkukaad9v0vc60xacgygtz9saukyhjutr60zj7weyjlnuf8eymq3tdqny',
  };
  const astroNeutron = {
    name: 'xASTRO → ASTRO',
    dex: 'Astroport Neutron',
    redemptionKey: 'ASTRO',
    offerNativeTokenDenom: 'factory/neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn/xASTRO',
    poolContract: 'neutron1kmkukaad9v0vc60xacgygtz9saukyhjutr60zj7weyjlnuf8eymq3tdqny',
  };

  const lsds = [...terraLsds, ...kujiLsds, ...chihuahuaLsds, ...whaleLsds, ...osmoLsds, ...stafiLsds, xAstroNeutron, astroNeutron];

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
  if (lsd.redemptionKey) {
    exchangeRate = redemptionMap.get(lsd.redemptionKey);
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
  if (lsd.unboundingPeriod) {
    apy = calculateApy(arb, lsd.unboundingPeriod);
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
