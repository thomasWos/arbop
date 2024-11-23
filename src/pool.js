import { queryContract } from './utils.js';

export async function maxSwap(pair, exchangeRate) {
  const r = await queryContract(pair.poolContract, { pool: {} });
  const asset0 = r.assets[0];
  const asset0Amount = parseInt(r.assets[0].amount);
  const asset1Amount = parseInt(r.assets[1].amount);

  const asset0Denom = asset0.info?.native_token && asset0.info.native_token.denom;
  const asset0ContractAdd = asset0.info?.token && asset0.info.token.contract_addr;
  const asset0Name = asset0Denom || asset0ContractAdd;

  const pairOfferName = pair.offerNativeTokenDenom || pair.offerTokenAddr;
  return computeMaxSwap(asset0Name, pairOfferName, asset0Amount, asset1Amount, exchangeRate);
}

export function computeMaxSwap(asset0Name, pairOfferName, asset0Amount, asset1Amount, exchangeRate) {
  let maxToSwap;
  if (asset0Name === pairOfferName) {
    const asset1AmountWithRedemption = asset1Amount * exchangeRate;
    maxToSwap = (asset1AmountWithRedemption - asset0Amount) / 2;
  } else {
    const asset0AmountWithRedemption = asset0Amount * exchangeRate;
    maxToSwap = (asset0AmountWithRedemption - asset1Amount) / 2;
  }
  const maxToSwapForHuman = maxToSwap / Math.pow(10, 6);
  return maxToSwapForHuman;
}
