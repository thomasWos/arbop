import { exchangeRateFromState } from '../utils.js';

const ampHuahuaContract = 'chihuahua1nktfhalzvtx82kyn4dh6l8htcl0prfpnu380a39zj52nzu3j467qqg23ry';
const bHuahuaContract = 'chihuahua1psf89r2g9vdlttrjphspcpzzfx87r2r4nl5fg703ky42mp2706wsw5330f';

export async function chihuahuaRedemptionMap() {
  const ampHuahuaRedemption = {
    redemptionRate: await exchangeRateFromState(ampHuahuaContract),
    unboundingPeriod: 21 + 3,
  };

  const bHuahuaRedemption = {
    redemptionRate: await exchangeRateFromState(bHuahuaContract),
    unboundingPeriod: 21 + 3,
  };

  return [
    ['ampHUAHUA', ampHuahuaRedemption],
    ['bHUAHUA', bHuahuaRedemption],
  ];
}

const ampHuahua = {
  name: 'HUAHUA → ampHUAHUA',
  dex: 'Skeleton Swap Chihuahua',
  redemptionKey: 'ampHUAHUA',
  offerNativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1a6xwgvyvrmzgue6hectem3fwdzquny44a4y20a9wvlrtalhlsk9sryz5t9',
};

const bHuahua = {
  name: 'HUAHUA → bHUAHUA',
  dex: 'Skeleton Swap Chihuahua',
  redemptionKey: 'bHUAHUA',
  offerNativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1py86y6946ed07g8v24thess2havjjgpg3uvjdu4v805czmge37hsvlt6qz',
};

export const chihuahuaLsds = [ampHuahua, bHuahua];
