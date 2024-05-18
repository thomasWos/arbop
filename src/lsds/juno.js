import { queryContract, exchangeRateFromState } from '../utils.js';

const wyJunoContract = 'juno1snv8z7j75jwfce4uhkjh5fedpxjnrx9v20ffflzws57atshr79yqnw032r';
const ampJunoConstract = 'juno17cya4sw72h4886zsm2lk3udxaw5m8ssgpsl6nd6xl6a4ukepdgkqeuv99x';

export async function junoRedemptionMap() {
  const wyJunoRate = await queryContract(wyJunoContract, { exchange_rate: {} }).then((d) => parseFloat(d.exchange_rate));
  return new Map([
    ['wyJUNO', wyJunoRate],
    ['ampJUNO', await exchangeRateFromState(ampJunoConstract)],
  ]);
}

const wyJuno = {
  name: 'JUNO → wyJUNO',
  dex: 'Wynd',
  redemptionKey: 'wyJUNO',
  unboundingPeriod: 28,
  offerNativeTokenDenom: 'ujuno',
  poolContract: 'juno1f9c60hyvzys5h7q0y4e995n8r9cchgpy8p3k4kw3sqsmut95ankq0chfv0',
  simuSwap: async (tokenInAmount) => simuSwapWynd(tokenInAmount, wyJuno),
};

const ampJuno = {
  name: 'JUNO → ampJUNO',
  dex: 'Wynd',
  redemptionKey: 'ampJUNO',
  unboundingPeriod: 32,
  offerNativeTokenDenom: 'ujuno',
  poolContract: 'juno1a7hvexlmhwwflnsr7uyf373q2etwmzm233lsj75rydrmra4rhvps582hu4',
  simuSwap: async (tokenInAmount) => simuSwapWynd(tokenInAmount, ampJuno),
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

export const junoLsds = [wyJuno, ampJuno];
