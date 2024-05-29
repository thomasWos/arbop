import { queryContract } from '../utils.js';

export async function persistenceRedemptionMap() {
  return fetch('https://persistence-rest.publicnode.com/pstake/liquidstakeibc/v1beta1/host_chains')
    .then((resp) => resp.json())
    .then(
      (data) =>
        new Map(
          data.host_chains.map((chain) => [
            buildName(chain.host_denom),
            {
              redemptionRate: 1 / parseFloat(chain.c_value),
              unboundingPeriod: parseInt(chain.unbonding_factor) * 6,
            },
          ])
        )
    );
}

function buildName(host_denom) {
  return 'stk' + host_denom.slice(1).toUpperCase();
}

const stkAtom = {
  name: 'ATOM → stkATOM',
  dex: 'Dexter',
  redemptionKey: 'stkATOM',
  poolContract: 'persistence1335rlmhujm0gj5e9gh7at9jpqvqckz0mpe4v284ar4lw5mlkryzszkpfrs',
  offerNativeTokenDenom: 'ibc/C8A74ABBE2AF892E15680D916A7C22130585CE5704F9B17A10F184A90D53BECA',
  askAssetNativeTokenDenom: 'stk/uatom',
  simuSwap: async (tokenInAmount) => simuSwapDexter(tokenInAmount, stkAtom),
};

async function simuSwapDexter(tokenInAmount, pairDef) {
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

export const persistencePairs = [stkAtom];
