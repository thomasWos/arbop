import { queryContract } from '../utils.js';

export async function persistenceRedemptionMap() {
  return fetch('https://persistence-rest.publicnode.com/pstake/liquidstakeibc/v1beta1/host_chains')
    .then((resp) => resp.json())
    .then((data) =>
      data.host_chains.map((chain) => [
        buildName(chain.host_denom),
        {
          redemptionRate: 1 / parseFloat(chain.c_value),
          unboundingPeriod: parseInt(chain.unbonding_factor) * 6,
        },
      ])
    );
}

function buildName(host_denom) {
  return 'stk' + host_denom.slice(1).toUpperCase();
}

const stkAtom = {
  name: 'ATOM → stkATOM',
  dex: 'Persistence DEX',
  redemptionKey: 'stkATOM',
  poolContract: 'persistence1335rlmhujm0gj5e9gh7at9jpqvqckz0mpe4v284ar4lw5mlkryzszkpfrs',
  offerNativeTokenDenom: 'ibc/C8A74ABBE2AF892E15680D916A7C22130585CE5704F9B17A10F184A90D53BECA',
  askAssetNativeTokenDenom: 'stk/uatom',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stkAtom),
};

const stkHuahua = {
  name: 'HUAHUA → stkHUAHUA',
  dex: 'Persistence DEX',
  redemptionKey: 'stkHUAHUA',
  poolContract: 'persistence1ny5q57qzkt9cn64mf7grc58tjqx37czxe85nx8aujw8md3hlyruqrspvtc',
  offerNativeTokenDenom: 'ibc/B597D779FCDD9021263C98A48F1AFA9D2BCCCE980F397CDE5681CCEDE7DEE1A4',
  askAssetNativeTokenDenom: 'stk/uhuahua',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stkHuahua),
};

async function simuSwap(tokenInAmount, pairDef) {
  const { trade_params } = await queryContract(pairDef.poolContract, {
    on_swap: {
      swap_type: { give_in: {} },
      offer_asset: {
        native_token: {
          denom: pairDef.offerNativeTokenDenom,
        },
      },
      ask_asset: {
        native_token: {
          denom: pairDef.askAssetNativeTokenDenom,
        },
      },
      amount: `${tokenInAmount}`,
    },
  });
  return trade_params.amount_out;
}

export const persistencePairs = [stkAtom, stkHuahua];
