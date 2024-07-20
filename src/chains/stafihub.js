const restUrl = 'https://public-rest-rpc1.stafihub.io';

export async function stafiRedemptionMap() {
  return fetch(restUrl + '/stafihub/stafihub/ledger/exchange_rate_all')
    .then((r) => r.json())
    .then((d) => buildExchangeRateMap(d.exchangeRates));
}

function buildExchangeRateMap(exchangeRates) {
  const rates = exchangeRates.map((er) => [buildName(er.denom), parseFloat(er.value)]);
  const rateInv = rates.map((r) => [r[0] + 'inv', 1 / r[1]]);
  return new Map([...rates, ...rateInv]);
}

function buildName(denom) {
  return 'r' + denom.slice(2).toUpperCase();
}

const rHuahua = {
  name: 'HUAHUA → rHUAHUA',
  dex: 'rDEX',
  redemptionKey: 'rHUAHUA',
  unboundingPeriod: 22,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, 'urhuahua'),
};

const rAtom = {
  name: 'ATOM → rATOM',
  dex: 'rDEX',
  redemptionKey: 'rATOM',
  unboundingPeriod: 22,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, 'uratom'),
};

const rAtomInv = {
  name: 'rATOM → ATOM',
  dex: 'rDEX',
  redemptionKey: 'rATOMinv',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, 'uratom', true),
};

async function simuSwap(tokenInAmount, targetDenom, inv = false) {
  const pool = await fetch(restUrl + '/stafihub/stafihub/rdex/swap_pool_list')
    .then((r) => r.json())
    .then((d) => d.swapPoolList.find((p) => p.token.denom === targetDenom));

  const baseTokenAmount = parseInt(pool.baseToken.amount);
  const rtokenAmount = parseInt(pool.token.amount);

  // https://docs.stafi.io/rdexintro/#amm-clp-model
  // 𝑋: Balance of Token A in the input side of the pool before swap
  const X = !inv ? baseTokenAmount : rtokenAmount;
  // 𝑌: Balance of Token B in the input side of the pool before swap
  const Y = !inv ? rtokenAmount : baseTokenAmount;

  // y=xYX/(x+X)2
  const tokenOutAmount = (tokenInAmount * Y * X) / (tokenInAmount + X) ** 2;
  return tokenOutAmount;
}

export const stafiLsds = [rHuahua, rAtom, rAtomInv];
