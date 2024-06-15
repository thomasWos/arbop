import { promises } from 'fs';
import { AbiRegistry, BinaryCodec } from '@multiversx/sdk-core';
import { arbitrage, calculateApy } from '../utils.js';

const oneQuintillion = Math.pow(10, 18);
const gatewayUrl = 'https://gateway.multiversx.com';
const codec = new BinaryCodec();
const sEgldExchangeRate = { scAddress: 'erd1qqqqqqqqqqqqqpgq4gzfcw7kmkjy8zsf04ce6dl0auhtzjx078sslvrf4e', funcName: 'getExchangeRate' };
const ashswapPoolAbi = await promises
  .readFile('./src/abi/ashswapPoolAbi.json', { encoding: 'utf8' })
  .then((abiJson) => AbiRegistry.create(JSON.parse(abiJson)));

export async function multiversxRedemptionMap() {
  const sEgldRate = await fetchInt(sEgldExchangeRate).then((r) => r / oneQuintillion);
  return new Map([
    ['sEGLD', sEgldRate],
    ['JWLEGLD', 1],
  ]);
}

async function fetchInt(payload) {
  return fetch(gatewayUrl + '/vm-values/int', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => parseInt(data.data.data));
}

async function fetchQuery(payload) {
  return fetch(gatewayUrl + '/vm-values/query', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => data.data.data.returnData[0]);
}

const sEgld = {
  name: 'EGLD → sEGLD',
  redemptionKey: 'sEGLD',
  dex: 'AshSwap',
  poolAddr: 'erd1qqqqqqqqqqqqqpgqaf8fzwmas77xxr7qwnxd6j3qsctv55e74fvsmvq675',
  from: 'WEGLD-bd4d79',
  to: 'SEGLD-3ad2d0',
};

const jwlEgld = {
  name: 'EGLD → JWLEGLD',
  redemptionKey: 'JWLEGLD',
  dex: 'AshSwap',
  poolAddr: 'erd1qqqqqqqqqqqqqpgqa60cy30kdzzd8mygg20zhe4ppfhrp0tv4fvs9vd4hp',
  from: 'WEGLD-bd4d79',
  to: 'JWLEGLD-023462',
};

const jwlEgldTosEgld = {
  name: 'JWLEGLD → sEGLD',
  redemptionKey: 'sEGLD',
  dex: 'AshSwap',
  poolAddr: 'erd1qqqqqqqqqqqqqpgqlsgfr6xteusallzcspt3ehp8cewlp3s04fvsjm87cw',
  from: 'JWLEGLD-023462',
  to: 'SEGLD-3ad2d0',
};

async function computeArb(def, redemptionMap) {
  const redemptionRate = redemptionMap.get(def.redemptionKey);
  const tokenInAmount = oneQuintillion;
  const tokenOutAmount = await simulateAshSwap(tokenInAmount, def);
  const arb = arbitrage(redemptionRate, tokenInAmount, tokenOutAmount);
  return { name: def.name, arb: arb, dex: def.dex, apy: calculateApy(arb, 10) };
}

export async function multiversxArbs(redemptionMap) {
  return Promise.all([sEgld, jwlEgld, jwlEgldTosEgld].map((d) => computeArb(d, redemptionMap)));
}

async function jwlEgldDynamicFee() {
  const payload = { scAddress: 'erd1qqqqqqqqqqqqqpgqx6833qjac6uqztgsa8jhlztexucke0hrdfys6wd7qt', funcName: 'getDynamicFee' };
  return fetchInt(payload);
}
console.log(`jwlEgld dynamic fee ${await jwlEgldDynamicFee()}`);

async function simulateAshSwap(tokenInAmount, def) {
  const payload = {
    scAddress: def.poolAddr,
    funcName: 'estimateAmountOut',
    args: [toHex(def.from), toHex(def.to), 0 + `${tokenInAmount.toString(16)}`],
  };
  return fetchQuery(payload).then((r) => {
    const exchangeCustomType = ashswapPoolAbi.getCustomType('ExchangeResultType');
    const decoded = codec.decodeTopLevel(Buffer.from(r, 'base64'), exchangeCustomType);
    return decoded.valueOf().token_out.final_amount.toString();
  });
}

function toHex(s) {
  return Buffer.from(s, 'utf8').toString('hex');
}
