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
  const decimalIn = pair.decimalIn || pair.decimal || 6;
  const decimalOut = pair.decimalOut || pair.decimal || 6;
  return computeMaxSwap(asset0Name, pairOfferName, asset0Amount, asset1Amount, exchangeRate, decimalIn, decimalOut);
}

export function computeMaxSwap(asset0Name, pairOfferName, asset0Amount, asset1Amount, exchangeRate, decimalIn = 6, decimalOut = 6) {
  let maxToSwap;
  if (asset0Name === pairOfferName) {
    const asset0Human = asset0Amount / Math.pow(10, decimalIn);
    const asset1Human = asset1Amount / Math.pow(10, decimalOut);
    const asset1AmountWithRedemption = asset1Human * exchangeRate;
    maxToSwap = (asset1AmountWithRedemption - asset0Human) / 2;
  } else {
    const asset0Human = asset0Amount / Math.pow(10, decimalOut);
    const asset1Human = asset1Amount / Math.pow(10, decimalIn);
    const asset0AmountWithRedemption = asset0Human * exchangeRate;
    maxToSwap = (asset0AmountWithRedemption - asset1Human) / 2;
  }
  return maxToSwap;
}
