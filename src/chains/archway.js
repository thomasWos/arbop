import { queryContract, exchangeRateFromState } from '../utils.js';

const sArchContract = 'archway1p3wrpsrxldc6laecc8r3ck52cmg3chu06mmm3thqvt6exy36f79q575rsq';
const ampArchContract = 'archway1yg4eq68xyll74tdrrcxkr4qpam4j9grknunmp74zzc6km988dadqy0utmj';

export async function archwayRedemptionMap() {
  const sArchRedemption = {
    redemptionRate: await queryContract(sArchContract, { status_info: {} }).then((data) => parseFloat(data.ratio)),
    unboundingPeriod: 25,
  };

  const ampArchRedemption = {
    redemptionRate: await exchangeRateFromState(ampArchContract),
    unboundingPeriod: 21 + 3,
  };

  return [
    ['sARCH', sArchRedemption],
    ['ampARCH', ampArchRedemption],
  ];
}

const sArch = {
  name: 'xARCH → sARCH',
  dex: 'Astrovault',
  redemptionKey: 'sARCH',
  poolContract: 'archway1352tn8gyl6df9azwznldg5ths0xst720xgc82q2as3c5kz0tx64qm0dq3j',
  swapFromAssetIndex: 0,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, sArch),
};

const ampArch = {
  name: 'xARCH → ampARCH',
  dex: 'Astrovault',
  redemptionKey: 'ampARCH',
  poolContract: 'archway188c99g248n72xxgy9eexd735pzk6qvp93aq3wgavkuj83w8azteqw4ahn5',
  swapFromAssetIndex: 0,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, ampArch),
};

async function simuSwap(tokenInAmount, pairDef) {
  const { to_amount_minus_fee } = await queryContract(pairDef.poolContract, {
    swap_simulation: {
      amount: `${tokenInAmount}`,
      swap_from_asset_index: pairDef.swapFromAssetIndex,
    },
  });
  return to_amount_minus_fee;
}

export const archwayPairs = [sArch, ampArch];
