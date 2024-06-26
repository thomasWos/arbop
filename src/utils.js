import { lcd } from './lcdConfigs.js';

export const oneQuintillion = Math.pow(10, 18);

export async function exchangeRateFromState(contractAddr) {
  return queryState(contractAddr).then((s) => parseFloat(s.exchange_rate));
}

export async function queryState(contractAddr) {
  return queryContract(contractAddr, { state: {} });
}

export async function queryContract(contractAddr, queryMsg) {
  const queryB64Encoded = Buffer.from(JSON.stringify(queryMsg)).toString('base64');
  const lcdUrl = lcd(contractAddr);
  const url = `${lcdUrl}/cosmwasm/wasm/v1/contract/${contractAddr}/smart/${queryB64Encoded}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((e) => console.log(e));
}

export function arbitrage(tokenInAmount, exchangeRateIn, tokenOutAmount, exchangeRateOut) {
  const offerAmount = tokenInAmount * exchangeRateIn;
  const returnAmount = tokenOutAmount * exchangeRateOut;
  const rate = returnAmount / offerAmount;
  return (rate - 1) * 100;
}

export function calculateApy(arb, periodInDays) {
  const period = 365 / periodInDays;
  const apy = (1 + arb / 100) ** period;
  return (apy - 1) * 100;
}
