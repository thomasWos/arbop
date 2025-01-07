import { archwayPairs } from './chains/archway.js';
import { chihuahuaLsds } from './chains/chihuahua.js';
import { ethPairs } from './chains/ethereum.js';
import { evmosPairs } from './chains/evmos.js';
import { injectivePairs } from './chains/injective.js';
import { junoLsds } from './chains/juno.js';
import { kujiLsds } from './chains/kujira.js';
import { whaleLsds } from './chains/migaloo.js';
import { multiversxArbs } from './chains/multiversx.js';
import { neutronLsds } from './chains/neutron.js';
import { osmoLsds } from './chains/osmosis.js';
import { persistencePairs } from './chains/persistence.js';
import { secretPairs } from './chains/secret.js';
import { stafiLsds } from './chains/stafihub.js';
import { terraLsds } from './chains/terra.js';
import { fetchRedemptionsMap } from './redemptions.js';
import { arbitrage, arbitrageDecimals, calculateApy, queryContract } from './utils.js';
import { maxSwap } from './pool.js';
import { avaxPairs } from './chains/avalanche.js';

async function computeArbs() {
  const redemptionMap = await fetchRedemptionsMap();

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
    ...avaxPairs,
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
  const decimalIn = pair.decimalIn || pair.decimal || 6;
  const tokenInAmount = pair.tokenInAmount || Math.pow(10, decimalIn);

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

  let tokenOutAmount;
  let maxSwapInPool;

  if (pair.simuSwap) {
    tokenOutAmount = await pair.simuSwap(tokenInAmount);
    maxSwapInPool = pair.maxSwap && (await pair.maxSwap(exchangeRate));
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
    tokenOutAmount = (simulationResult?.return_amount && parseInt(simulationResult.return_amount)) || tokenInAmount;
    maxSwapInPool = pair.dex !== 'FIN' && (await maxSwap(pair, exchangeRate).catch((e) => 0));
  }

  const arb =
    pair.decimalIn && pair.decimalOut
      ? arbitrageDecimals(tokenInAmount, exchangeRateIn, pair.decimalIn, tokenOutAmount, exchangeRate, pair.decimalOut)
      : arbitrage(tokenInAmount, exchangeRateIn, tokenOutAmount, exchangeRate);

  let apy;
  if (unboundingPeriod) {
    apy = calculateApy(arb, unboundingPeriod);
  }

  return { id: index, name: pair.name, arb: arb, dex: pair.dex, ...(apy && { apy }), ...(maxSwapInPool && { maxSwapInPool }) };
}

export async function tryComputeArbs() {
  try {
    return await computeArbs();
  } catch (error) {
    console.error(`Error computing arbs`, error);
  }
}
