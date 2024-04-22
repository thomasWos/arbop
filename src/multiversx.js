const oneQuintillion = Math.pow(10, 18);

const url = 'https://gateway.multiversx.com/vm-values/query';
const data = { scAddress: 'erd1qqqqqqqqqqqqqpgq4gzfcw7kmkjy8zsf04ce6dl0auhtzjx078sslvrf4e', funcName: 'getExchangeRate' };

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

const redemptionRate = await fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    const buffer = Buffer.from(data.data.data.returnData[0], 'base64');
    const resultStr = bufToBigint(buffer);
    return resultStr / oneQuintillion;
  });

const amount = 1 * oneQuintillion;

const tokenOutAmount = await fetch('https://aggregator-internal.ashswap.io/aggregate?from=WEGLD-bd4d79&to=SEGLD-3ad2d0&amount=1000000000000000000')
  .then((resp) => resp.json())
  .then((data) => {
    return data.returnAmountWithDecimal;
  });

const returnAmount = redemptionRate * tokenOutAmount;
const rate = returnAmount / amount;
const arb = (rate - 1) * 100;

console.log(arb);

export const sEGLD = async () => {
  const redemptionRate = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      const buffer = Buffer.from(data.data.data.returnData[0], 'base64');
      const resultStr = bufToBigint(buffer);
      return resultStr / oneQuintillion;
    });

  return {
    redemptionRate: redemptionRate,
    dex: 'AshSwap',
  };
};
