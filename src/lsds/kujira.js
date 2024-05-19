const ampKujiFin = {
  name: 'KUJI → ampKUJI',
  dex: 'FIN',
  unboundingPeriod: 16,
  stakingContract: {
    contract: 'kujira1n3fr5f56r2ce0s37wdvwrk98yhhq3unnxgcqus8nzsfxvllk0yxquurqty',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'ukuji',
  poolContract: 'kujira1lse59wt7a5yksdd08mennt299katjkfzdhmh8hvck8ln08jktcmsxrnh8s',
};

const qcKUJIFin = {
  name: 'KUJI → qcKUJI',
  dex: 'FIN',
  unboundingPeriod: 14,
  stakingContract: {
    contract: 'kujira1m96ucsfpt2yy72w09z2rxjdj38y5qd8lqx5jtggnejmdua2ynpnsxyvjex',
    exchangeRate: (data) => data.rate,
  },
  offerNativeTokenDenom: 'ukuji',
  poolContract: 'kujira14wsrem89304kpkl6d0j58dl6479eekwt047ccs0qzv9f60w80wzs8rjq4j',
};

const stOsmoKujira = {
  name: 'OSMO → stOsmo',
  dex: 'FIN',
  redemptionKey: 'strideOsmo',
  unboundingPeriod: 17,
  offerNativeTokenDenom: 'ibc/47BD209179859CDE4A2806763D7189B6E6FE13A17880FE2B42DE1E6C1E329E23',
  poolContract: 'kujira14rrh06m6rm699psw4dly88n7whqjsustqzcj23rwvmy5egu4vd8qm99rcx',
};

export const kujiLsds = [ampKujiFin, qcKUJIFin, stOsmoKujira];
