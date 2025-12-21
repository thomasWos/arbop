import { archwayPairs } from './chains/archway.js';
import { avaxPairs } from './chains/avalanche.js';
import { chihuahuaLsds } from './chains/chihuahua.js';
import { ethPairs } from './chains/ethereum.js';
import { injectivePairs } from './chains/injective.js';
import { junoLsds } from './chains/juno.js';
import { kujiLsds } from './chains/kujira.js';
import { multiversXpairs } from './chains/multiversx.js';
import { neutronLsds } from './chains/neutron.js';
import { osmoLsds } from './chains/osmosis.js';
import { secretPairs } from './chains/secret.js';
import { terraLsds } from './chains/terra.js';
import { maxSwap } from './pool.js';
import { fetchRedemptionsMap } from './redemptions.js';
import { arbitrage, arbitrageDecimals, calculateApy, queryContract } from './utils.js';

async function computeArbs() {
  const redemptionMap = await fetchRedemptionsMap();

  const lsds = [
    ...archwayPairs,
    ...avaxPairs,
    ...chihuahuaLsds,
    ...ethPairs,
    ...injectivePairs,
    ...junoLsds,
    ...kujiLsds,
    ...multiversXpairs,
    ...neutronLsds,
    ...osmoLsds,
    ...secretPairs,
    ...terraLsds,
  ];

  const arbs = await Promise.all(
    lsds.map((lsd, index) =>
      computeArb(lsd, index, redemptionMap).catch((e) => {
        console.log(`Error computing arb for ${lsd.name}`, e);
        return { id: index, name: lsd.name, arb: 0, dex: lsd.dex };
      })
    )
  );
  console.log('Fetch arbs - done');
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
    tokenOutAmount = (await pair.simuSwap(tokenInAmount)) || 0;
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
    }).catch((e) => console.log(pair, e));
    tokenOutAmount = (simulationResult?.return_amount && parseInt(simulationResult.return_amount)) || 0;
    maxSwapInPool = pair.dex !== 'FIN' && (await maxSwap(pair, exchangeRate).catch((e) => 0));
  }

  const arb =
    pair.decimalIn && pair.decimalOut
      ? arbitrageDecimals(tokenInAmount, exchangeRateIn, pair.decimalIn, tokenOutAmount, exchangeRate, pair.decimalOut)
      : arbitrage(tokenInAmount, exchangeRateIn, tokenOutAmount, exchangeRate);

  const apy = unboundingPeriod && calculateApy(arb, unboundingPeriod);
  return {
    id: index,
    name: pair.name,
    arb: arb || 0,
    dex: pair.dex,
    ...(apy && { apy }),
    ...(maxSwapInPool && { maxSwapInPool }),
    ...(pair.dexUrl && { dexUrl: pair.dexUrl }),
  };
}

export async function tryComputeArbs() {
  try {
    return await computeArbs();
  } catch (error) {
    console.error(`Error computing arbs`, error);
  }
}
