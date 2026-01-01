import { archwayPairs } from './chains/archway.js';
import { avaxPairs } from './chains/avalanche.js';
import { chihuahuaPairs } from './chains/chihuahua.js';
import { ethPairs } from './chains/ethereum.js';
import { injectivePairs } from './chains/injective.js';
import { junoLsds } from './chains/juno.js';
import { multiversXpairs } from './chains/multiversx.js';
import { neutronPairs } from './chains/neutron.js';
import { osmoPairs } from './chains/osmosis.js';
import { terraPairs, terraLendingSupply } from './chains/terra.js';
import { maxSwap } from './pool.js';
import { fetchRedemptionsMap } from './redemptions.js';
import { arbitrage, arbitrageDecimals, calculateApy, queryContract } from './utils.js';

async function computeArbs() {
  const redemptionMap = await fetchRedemptionsMap();

  const pairs = [
    ...archwayPairs,
    ...avaxPairs,
    ...chihuahuaPairs,
    ...ethPairs,
    ...injectivePairs,
    ...junoLsds,
    ...multiversXpairs,
    ...neutronPairs,
    ...osmoPairs,
    ...terraPairs,
  ];

  // Arbitrages from swaps
  const arbs = await Promise.all(
    pairs.map((pair, index) =>
      computeArb(pair, index, redemptionMap).catch((e) => {
        console.error(`Error computing arb for ${pair.name}`, e);
        return { id: index, name: pair.name, arb: 0, dex: pair.dex };
      })
    )
  );
  console.info('Fetch arbs - done');

  // Supply APY
  const terraLendingSupplyApy = await terraLendingSupply();
  const lunaSupply = { id: arbs.length, ...terraLendingSupplyApy };

  return [...arbs, lunaSupply].sort((a, b) => b.arb - a.arb);
}

async function computeArb(pair, index, redemptionMap) {
  const decimalIn = pair.decimalIn || pair.decimal || 6;
  const tokenInAmount = pair.tokenInAmount || Math.pow(10, decimalIn);

  const redemption = redemptionMap.get(pair.redemptionKey);
  let exchangeRate;
  let unboundingPeriod;
  if (redemption instanceof Object) {
    exchangeRate = redemption.redemptionRate;
    unboundingPeriod = redemption.unboundingPeriod;
  } else {
    exchangeRate = redemption;
    unboundingPeriod = null;
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
    maxSwapInPool = await maxSwap(pair, exchangeRate).catch((e) => 0);
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
