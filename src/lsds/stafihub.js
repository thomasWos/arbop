const restUrl = 'https://public-rest-rpc1.stafihub.io';

export async function stafiRedemptionMap() {
  return fetch(restUrl + '/stafihub/stafihub/ledger/exchange_rate_all')
    .then((r) => r.json())
    .then((d) => new Map(d.exchangeRates.map((er) => [er.denom, parseFloat(er.value)])));
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

async function simuSwap(tokenInAmount, targetDenom) {
  const pool = await fetch(restUrl + '/stafihub/stafihub/rdex/swap_pool_list')
    .then((r) => r.json())
    .then((d) => d.swapPoolList.find((p) => p.token.denom === targetDenom));

  // https://docs.stafi.io/rdexintro/#amm-clp-model
  // 𝑋: Balance of Token A in the input side of the pool before swap
  const X = parseInt(pool.baseToken.amount);
  // 𝑌: Balance of Token B in the input side of the pool before swap
  const Y = parseInt(pool.token.amount);

  // y=xYX/(x+X)2
  const tokenOutAmount = (tokenInAmount * Y * X) / (tokenInAmount + X) ** 2;
  return tokenOutAmount;
}

export const stafiLsds = [rHuahua, rAtom];
