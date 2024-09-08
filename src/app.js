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
import { archwayRedemptionMap, archwayPairs } from './chains/archway.js';
import { ethereumRedemptionMap, ethPairs } from './chains/ethereum.js';
import { injectivePairs } from './chains/injective.js';

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
    archwayRedemptionMap(),
  ];

  const redemptionsResult = await Promise.allSettled(redemptionPromosises);
  const validRedemptions = redemptionsResult.filter((result) => result.status === 'fulfilled').map((result) => result.value);
  const redemptionsList = [].concat(...validRedemptions);

  /* Compute inverse rates */
  const redemptionsInv = redemptionsList.map((r) => {
    const redemp = r[1] instanceof Object ? r[1].redemptionRate : r[1];
    return [r[0] + 'inv', 1 / redemp];
  });

  const allRedemptionsList = [['identity', 1], ...redemptionsList, ...redemptionsInv].sort((a, b) => a[0].localeCompare(b[0]));
  const redemptionMap = new Map(allRedemptionsList);
  printMap(redemptionMap);

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
    ...injectivePairs,
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

async function computeArb(pair, index, redemptionMap) {
  const tokenInAmount = pair.tokenInAmount || 1000000;

  let tokenOutAmount;
  if (pair.simuSwap) {
    tokenOutAmount = await pair.simuSwap(tokenInAmount);
  } else {
    // DEX smart contract
    let infoOfferAsset;
    if (pair.offerTokenAddr) {
      // Token
      infoOfferAsset = {
        token: {
          contract_addr: pair.offerTokenAddr,
        },
      };
    } else {
      // Native token
      infoOfferAsset = {
        native_token: {
          denom: pair.offerNativeTokenDenom,
        },
      };
    }

    const simulationResult = await queryContract(pair.poolContract, {
      simulation: {
        offer_asset: {
          info: infoOfferAsset,
          amount: `${tokenInAmount}`,
        },
      },
    }).catch((e) => console.log(e));
    tokenOutAmount = simulationResult?.return_amount || tokenInAmount;
  }

  let exchangeRate = redemptionMap.get(pair.redemptionKey);
  let unboundingPeriod = pair.unboundingPeriod;

  const redemption = redemptionMap.get(pair.redemptionKey);
  if (redemption instanceof Object) {
    exchangeRate = redemption.redemptionRate;
    unboundingPeriod = redemption.unboundingPeriod;
  }

  let exchangeRateIn = redemptionMap.get(pair.offerRedemptionKey) || 1;
  if (exchangeRateIn instanceof Object) {
    exchangeRateIn = exchangeRateIn.redemptionRate;
  }

  const arb = arbitrage(tokenInAmount, exchangeRateIn, tokenOutAmount, exchangeRate);

  let apy;
  if (unboundingPeriod) {
    apy = calculateApy(arb, unboundingPeriod);
  }
  return { id: index, name: pair.name, arb: arb, dex: pair.dex, ...(apy && { apy }) };
}

export async function tryComputeArbs() {
  try {
    return await computeArbs();
  } catch (error) {
    console.error(`Error computing arbs`, error);
  }
}

function printMap(map) {
  map.forEach((value, key) => {
    if (typeof value === 'object') {
      console.log(`${key}: ${JSON.stringify(value)}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });
}
