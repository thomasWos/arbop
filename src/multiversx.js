import { arbitrage, calculateApy } from './utils.js';

const oneQuintillion = Math.pow(10, 18);

const url = 'https://gateway.multiversx.com/vm-values/query';
const sEgldExchangeRate = { scAddress: 'erd1qqqqqqqqqqqqqpgq4gzfcw7kmkjy8zsf04ce6dl0auhtzjx078sslvrf4e', funcName: 'getExchangeRate' };

// https://github.com/juanelas/bigint-conversion/blob/master/src/ts/index.ts#L63
function bufToBigint(buffer) {
  buffer = new Uint8Array(buffer);
  let bits = 8n;
  let ret = 0n;
  for (const i of buffer.values()) {
    const bi = BigInt(i);
    ret = (ret << bits) + bi;
  }
  return ret.toString();
}

async function sEgldRedemptionRate() {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(sEgldExchangeRate),
  })
    .then((response) => response.json())
    .then((data) => {
      const buffer = Buffer.from(data.data.data.returnData[0], 'base64');
      const resultStr = bufToBigint(buffer);
      return resultStr / oneQuintillion;
    });
}

async function simulate(tokenInAmount) {
  return fetch('https://aggregator-internal.ashswap.io/aggregate' + '?from=WEGLD-bd4d79' + '&to=SEGLD-3ad2d0' + `&amount=${tokenInAmount}`)
    .then((resp) => resp.json())
    .then((data) => data.returnAmountWithDecimal);
}

export async function sEgldArb() {
  const redemptionRate = await sEgldRedemptionRate();

  const tokenInAmount = oneQuintillion;
  const tokenOutAmount = await simulate(tokenInAmount);
  const arb = arbitrage(redemptionRate, tokenInAmount, tokenOutAmount);

  return { name: 'EGLD  → sEGLD', arb: arb, dex: 'AshSwap', apy: calculateApy(arb, 10) };
}
