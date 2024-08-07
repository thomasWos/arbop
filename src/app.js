import { strideRedemptionMap } from './chains/stride.js';
import { neutronRedemptionMap, neutronLsds } from './chains/neutron.js';
import { terraRedemptionMap, terraLsds } from './chains/terra.js';
import { kujiraRedemptionMap, kujiLsds } from './chains/kujira.js';
import { osmosisRedemptionMap, osmoLsds } from './chains/osmosis.js';
import { migalooRedemptionMap, whaleLsds } from './chains/migaloo.js';
import { chihuahuaRedemptionMap, chihuahuaLsds } from './chains/chihuahua.js';
import { stafiRedemptionMap } from './chains/stafihub.js';
import { multiversxRedemptionMap, multiversxArbs } from './chains/multiversx.js';
import { queryContract, arbitrage, calculateApy } from './utils.js';
import { stafiLsds } from './chains/stafihub.js';
import { junoRedemptionMap, junoLsds } from './chains/juno.js';
import { persistenceRedemptionMap, persistencePairs } from './chains/persistence.js';
import { quicksilverRedemptionMap } from './chains/quicksilver.js';
import { secretRedemptionMap, secretPairs } from './chains/secret.js';
import { evmosPairs } from './chains/evmos.js';
import { archwayPairs } from './chains/archway.js';
import { ethereumRedemptionMap, ethPairs } from './chains/ethereum.js';

async function computeArbs() {
  const redemptionPromosises = [
    terraRedemptionMap(),
    kujiraRedemptionMap(),
    osmosisRedemptionMap(),
    chihuahuaRedemptionMap(),
    strideRedemptionMap(),
    neutronRedemptionMap(),
    migalooRedemptionMap(),
    junoRedemptionMap(),
    persistenceRedemptionMap(),
    stafiRedemptionMap(),
    multiversxRedemptionMap(),
    quicksilverRedemptionMap(),
    secretRedemptionMap(),
    ethereumRedemptionMap(),
  ];

  const redemptionsResult = await Promise.all(redemptionPromosises);
  const redemptionsList = [].concat(...redemptionsResult);

  /* Compute inverse rates */
  const redemptionsInv = redemptionsList.map((r) => {
    const redemp = r[1] instanceof Object ? r[1].redemptionRate : r[1];
    return [r[0] + 'inv', 1 / redemp];
  });

  const allRedemptionsList = [['identity', 1], ...redemptionsList, ...redemptionsInv].sort((a, b) => a[0].localeCompare(b[0]));
  const redemptionMap = new Map(allRedemptionsList);
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
    ...secretPairs,
    ...evmosPairs,
    ...archwayPairs,
    ...ethPairs,
  ];

  // Mainly cosmos chains
  const arbs = await Promise.all(lsds.map((lsd, index) => computeArb(lsd, index, redemptionMap)));
  console.log('Fetch arbs - COSMOS done');

  const arbsMultiversx = await multiversxArbs(redemptionMap);
  arbsMultiversx.forEach((a, index) => {
    a.id = lsds.length + index;
    arbs.push(a);
  });

  console.log('Fetch arbs - All done');
  return arbs.sort((a, b) => b.arb - a.arb);
}

async function computeArb(lsd, index, redemptionMap) {
  const tokenInAmount = lsd.tokenInAmount || 1000000;

  let tokenOutAmount;
  if (lsd.simuSwap) {
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

    const simulationResult = await queryContract(lsd.poolContract, {
      simulation: {
        offer_asset: {
          info: infoOfferAsset,
          amount: `${tokenInAmount}`,
        },
      },
    }).catch((e) => console.log(e));
    tokenOutAmount = simulationResult?.return_amount || tokenInAmount;
  }

  let exchangeRate = redemptionMap.get(lsd.redemptionKey);
  let unboundingPeriod = lsd.unboundingPeriod;

  const redemption = redemptionMap.get(lsd.redemptionKey);
  if (redemption instanceof Object) {
    exchangeRate = redemption.redemptionRate;
    unboundingPeriod = redemption.unboundingPeriod;
  }

  let exchangeRateIn = redemptionMap.get(lsd.offerRedemptionKey) || 1;
  if (exchangeRateIn instanceof Object) {
    exchangeRateIn = exchangeRateIn.redemptionRate;
  }

  const arb = arbitrage(tokenInAmount, exchangeRateIn, tokenOutAmount, exchangeRate);

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
