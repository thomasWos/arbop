const restUrl = 'https://public-rest-rpc1.stafihub.io';

export async function stafiRedemptionMap() {
  return fetch(restUrl + '/stafihub/stafihub/ledger/exchange_rate_all')
    .then((r) => r.json())
    .then((d) => new Map(d.exchangeRates.map((er) => [er.denom, er.value])));
}

const rHuahua = {
  name: 'HUAHUA → rHUAHUA',
  dex: 'rDEX',
  redemptionKey: 'rHUAHUA',
  unboundingPeriod: 22,
  simuSwap: async (tokenInAmount) => simuSwaprHuahua(tokenInAmount),
};

async function simuSwaprHuahua(tokenInAmount) {
  const rhuahuaPool = await fetch(restUrl + '/stafihub/stafihub/rdex/swap_pool_list')
    .then((r) => r.json())
    .then((d) => d.swapPoolList.find((p) => p.token.denom === 'urhuahua'));

  // https://docs.stafi.io/rdexintro/#amm-clp-model
  // 𝑋: Balance of Token A in the input side of the pool before swap
  const X = parseInt(rhuahuaPool.baseToken.amount);
  // 𝑌: Balance of Token B in the input side of the pool before swap
  const Y = parseInt(rhuahuaPool.token.amount);

  // y=xYX/(x+X)2
  const tokenOutAmount = (tokenInAmount * Y * X) / (tokenInAmount + X) ** 2;
  return tokenOutAmount;
}

export const stafiLsds = [rHuahua];
