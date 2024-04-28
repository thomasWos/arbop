const ampKujiFin = {
  name: 'KUJI → ampKUJI',
  dex: 'FIN',
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
  stakingContract: {
    contract: 'kujira1m96ucsfpt2yy72w09z2rxjdj38y5qd8lqx5jtggnejmdua2ynpnsxyvjex',
    exchangeRate: (data) => data.rate,
  },
  offerNativeTokenDenom: 'ukuji',
  poolContract: 'kujira14wsrem89304kpkl6d0j58dl6479eekwt047ccs0qzv9f60w80wzs8rjq4j',
};

export const kujiLsds = [ampKujiFin, qcKUJIFin];
