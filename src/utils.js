import { lcd } from './lcdConfigs.js';

export const oneMillion = Math.pow(10, 6);
export const oneQuintillion = Math.pow(10, 18);

export const toBase64 = (str) => Buffer.from(str).toString('base64');
export const fromBase64 = (str) => Buffer.from(str, 'base64');

export async function exchangeRateFromState(contractAddr) {
  return queryState(contractAddr)
    .then((s) => parseFloat(s.exchange_rate))
    .catch((e) => 1);
}

export async function queryState(contractAddr) {
  return queryContract(contractAddr, { state: {} });
}

export async function queryContract(contractAddr, queryMsg) {
  const queryB64Encoded = toBase64(JSON.stringify(queryMsg));
  const lcdUrl = lcd(contractAddr);
  const url = `${lcdUrl}/cosmwasm/wasm/v1/contract/${contractAddr}/smart/${queryB64Encoded}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data);
}

export function arbitrage(tokenInAmount, exchangeRateIn, tokenOutAmount, exchangeRateOut) {
  const offerAmount = tokenInAmount * exchangeRateIn;
  const returnAmount = tokenOutAmount * exchangeRateOut;
  const rate = returnAmount / offerAmount;
  return (rate - 1) * 100;
}

export function arbitrageDecimals(tokenInAmount, exchangeRateIn, decimalIn, tokenOutAmount, exchangeRateOut, decimalOut) {
  const offerAmount = (tokenInAmount / Math.pow(10, decimalIn)) * exchangeRateIn;
  const returnAmount = (tokenOutAmount / Math.pow(10, decimalOut)) * exchangeRateOut;
  const rate = returnAmount / offerAmount;
  return (rate - 1) * 100;
}

export function calculateApy(arb, periodInDays) {
  const period = 365 / periodInDays;
  const apy = (1 + arb / 100) ** period;
  return (apy - 1) * 100;
}

export function printMap(map) {
  map.forEach((value, key) => {
    if (typeof value === 'object') {
      console.log(`${key}: ${JSON.stringify(value)}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });
}
