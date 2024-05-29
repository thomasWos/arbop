const ampHuahua = {
  name: 'HUAHUA → ampHUAHUA',
  dex: 'White Whale Chihuahua',
  stakingContract: {
    contract: 'chihuahua1nktfhalzvtx82kyn4dh6l8htcl0prfpnu380a39zj52nzu3j467qqg23ry',
    exchangeRate: (data) => data.exchange_rate,
  },
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1a6xwgvyvrmzgue6hectem3fwdzquny44a4y20a9wvlrtalhlsk9sryz5t9',
};

const bHuahua = {
  name: 'HUAHUA → bHUAHUA',
  dex: 'White Whale Chihuahua',
  stakingContract: {
    contract: 'chihuahua1psf89r2g9vdlttrjphspcpzzfx87r2r4nl5fg703ky42mp2706wsw5330f',
    exchangeRate: (data) => data.exchange_rate,
  },
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1py86y6946ed07g8v24thess2havjjgpg3uvjdu4v805czmge37hsvlt6qz',
};

const rHuahua = {
  name: 'HUAHUA → rHUAHUA',
  dex: 'White Whale Chihuahua',
  redemptionKey: 'rHUAHUA',
  unboundingPeriod: 22,
  offerNativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua19du4llehge50k23pwwckj93lnvp9cyyer8ve9as663mz64nrhq9qn2gauk',
};

export const chihuahuaLsds = [ampHuahua, bHuahua, rHuahua];
