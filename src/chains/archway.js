import { queryContract } from '../utils.js';

const stkOsmo = {
  name: 'xOSMO → stkOSMO',
  dex: 'Astrovault',
  redemptionKey: 'stkOSMO',
  poolContract: 'archway1l2mmr0vpndgv8vstwnj7qhn0px4fn80e0vxdnuenudfwa57n52fqfk9fe3',
  swapFromAssetIndex: 0,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stkOsmo),
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

export const archwayPairs = [stkOsmo];
