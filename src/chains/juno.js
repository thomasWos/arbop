import { computeMaxSwap } from '../pool.js';
import { exchangeRateFromState, queryContract } from '../utils.js';

const wyJunoContract = 'juno1snv8z7j75jwfce4uhkjh5fedpxjnrx9v20ffflzws57atshr79yqnw032r';
const ampJunoConstract = 'juno17cya4sw72h4886zsm2lk3udxaw5m8ssgpsl6nd6xl6a4ukepdgkqeuv99x';

export async function junoRedemptionMap() {
  const wyJunoRate = await queryContract(wyJunoContract, { exchange_rate: {} }).then((d) => parseFloat(d.exchange_rate));
  return [
    ['wyJUNO', wyJunoRate],
    ['ampJUNO', await exchangeRateFromState(ampJunoConstract)],
  ];
}

const wyJuno = {
  name: 'JUNO → wyJUNO',
  dex: 'Wynd',
  redemptionKey: 'wyJUNO',
  unboundingPeriod: 28,
  offerNativeTokenDenom: 'ujuno',
  poolContract: 'juno1f9c60hyvzys5h7q0y4e995n8r9cchgpy8p3k4kw3sqsmut95ankq0chfv0',
  simuSwap: async (tokenInAmount) => simuSwapWynd(tokenInAmount, wyJuno),
  maxSwap: async (exchangeRate) => maxSwap(wyJuno, exchangeRate),
};

const ampJuno = {
  name: 'JUNO → ampJUNO',
  dex: 'Wynd',
  redemptionKey: 'ampJUNO',
  unboundingPeriod: 32,
  offerNativeTokenDenom: 'ujuno',
  poolContract: 'juno1a7hvexlmhwwflnsr7uyf373q2etwmzm233lsj75rydrmra4rhvps582hu4',
  simuSwap: async (tokenInAmount) => simuSwapWynd(tokenInAmount, ampJuno),
  maxSwap: async (exchangeRate) => maxSwap(ampJuno, exchangeRate),
};

async function simuSwapWynd(tokenInAmount, pairDef) {
  const { return_amount } = await queryContract(pairDef.poolContract, {
    simulation: {
      offer_asset: {
        info: {
          native: pairDef.offerNativeTokenDenom,
        },
        amount: `${tokenInAmount}`,
      },
      referral: false,
    },
  });
  return return_amount;
}

async function maxSwap(pair, exchangeRate) {
  const r = await queryContract(pair.poolContract, { pool: {} });
  const asset0 = r.assets[0];
  const asset0Amount = parseInt(r.assets[0].amount);
  const asset1Amount = parseInt(r.assets[1].amount);
  const asset0Denom = asset0.info?.native && asset0.info.native;
  const asset0ContractAdd = asset0.info?.token && asset0.info.token;
  const asset0Name = asset0Denom || asset0ContractAdd;
  return computeMaxSwap(asset0Name, pair.offerNativeTokenDenom, asset0Amount, asset1Amount, exchangeRate);
}

export const junoLsds = [wyJuno, ampJuno];
