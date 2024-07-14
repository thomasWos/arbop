import { promises } from 'fs';
import { AbiRegistry, BinaryCodec } from '@multiversx/sdk-core';
import { arbitrage, calculateApy, oneQuintillion, fromBase64 } from '../utils.js';

const gatewayUrl = 'https://gateway.multiversx.com';
const codec = new BinaryCodec();

const sEgldExchangeRate = { scAddress: 'erd1qqqqqqqqqqqqqpgq4gzfcw7kmkjy8zsf04ce6dl0auhtzjx078sslvrf4e', funcName: 'getExchangeRate' };
const lEgldExchangeRate = { scAddress: 'erd1qqqqqqqqqqqqqpgqaqxztq0y764dnet95jwtse5u5zkg92sfacts6h9su3', funcName: 'getTokenPrice' };

const ashswapPoolAbi = await promises
  .readFile('./src/abi/ashswapPoolAbi.json', { encoding: 'utf8' })
  .then((abiJson) => AbiRegistry.create(JSON.parse(abiJson)));

export async function multiversxRedemptionMap() {
  const sEgldRate = await fetchInt(sEgldExchangeRate).then((r) => r / oneQuintillion);
  const lEgldRate = await fetchInt(lEgldExchangeRate).then((r) => r / oneQuintillion);

  return new Map([
    ['sEGLD', sEgldRate],
    ['JWLEGLD', 1],
    ['sEGLDtoJWLEGLD', 1 / sEgldRate],
    ['LEGLD', lEgldRate],
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
  simuSwap: async () => simuSwapAshSwap(sEgld),
};

const jwlEgld = {
  name: 'EGLD → JWLEGLD',
  redemptionKey: 'JWLEGLD',
  dex: 'AshSwap',
  poolAddr: 'erd1qqqqqqqqqqqqqpgqa60cy30kdzzd8mygg20zhe4ppfhrp0tv4fvs9vd4hp',
  from: 'WEGLD-bd4d79',
  to: 'JWLEGLD-023462',
  simuSwap: async () => simuSwapAshSwap(jwlEgld),
};

const jwlEgldTosEgld = {
  name: 'JWLEGLD → sEGLD',
  redemptionKey: 'sEGLD',
  dex: 'AshSwap',
  poolAddr: 'erd1qqqqqqqqqqqqqpgqlsgfr6xteusallzcspt3ehp8cewlp3s04fvsjm87cw',
  from: 'JWLEGLD-023462',
  to: 'SEGLD-3ad2d0',
  simuSwap: async () => simuSwapAshSwap(jwlEgldTosEgld),
};

const sEgldtoJwlEgld = {
  name: 'sEGLD → JWLEGLD',
  redemptionKey: 'sEGLDtoJWLEGLD',
  dex: 'AshSwap',
  poolAddr: 'erd1qqqqqqqqqqqqqpgqlsgfr6xteusallzcspt3ehp8cewlp3s04fvsjm87cw',
  from: 'SEGLD-3ad2d0',
  to: 'JWLEGLD-023462',
  simuSwap: async () => simuSwapAshSwap(sEgldtoJwlEgld),
};

const lEgldToEgld = {
  name: 'EGLD → LEGLD',
  redemptionKey: 'LEGLD',
  dex: 'xEchange',
  poolAddr: 'erd1qqqqqqqqqqqqqpgq9nnx7n40snv899ejwcrtepc5qn6apxvm2jps88s0v7',
  from: 'WEGLD-bd4d79',
  simuSwap: async () => simuSwapXechange(lEgldToEgld),
};

async function computeArb(def, redemptionMap) {
  const redemptionRate = redemptionMap.get(def.redemptionKey);
  const tokenOutAmount = await def.simuSwap();
  const arb = arbitrage(oneQuintillion, 1, tokenOutAmount, redemptionRate);
  return { name: def.name, arb: arb, dex: def.dex, apy: calculateApy(arb, 10) };
}

export async function multiversxArbs(redemptionMap) {
  return Promise.all([sEgld, jwlEgld, jwlEgldTosEgld, sEgldtoJwlEgld, lEgldToEgld].map((d) => computeArb(d, redemptionMap)));
}

async function simuSwapAshSwap(def) {
  const payload = {
    scAddress: def.poolAddr,
    funcName: 'estimateAmountOut',
    args: [toHex(def.from), toHex(def.to), 0 + `${oneQuintillion.toString(16)}`],
  };
  return fetchQuery(payload).then((r) => {
    const exchangeCustomType = ashswapPoolAbi.getCustomType('ExchangeResultType');
    const decoded = codec.decodeTopLevel(fromBase64(r), exchangeCustomType);
    return decoded.valueOf().token_out.final_amount.toString();
  });
}

async function simuSwapXechange(def) {
  return fetchInt({
    scAddress: def.poolAddr,
    funcName: 'getAmountOut',
    args: [toHex(def.from), 0 + `${oneQuintillion.toString(16)}`],
  });
}

function toHex(s) {
  return Buffer.from(s, 'utf8').toString('hex');
}

// Other
async function jwlEgldDynamicFee() {
  const payload = { scAddress: 'erd1qqqqqqqqqqqqqpgqx6833qjac6uqztgsa8jhlztexucke0hrdfys6wd7qt', funcName: 'getDynamicFee' };
  return fetchInt(payload);
}
console.log(`jwlEgld dynamic fee ${await jwlEgldDynamicFee()}`);
