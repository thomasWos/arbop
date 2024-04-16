export const kujiraLcdConfig = {
  chainID: 'kaiyo-1',
  lcd: 'https://kujira-api.polkachu.com/',
  gasAdjustment: 1,
  gasPrices: {
    ukuji: 0.0034,
  },
  prefix: 'kujira',
};

export const ampKujiFin = {
  name: 'KUJI → ampKuji',
  dex: 'FIN',
  stakingContract: {
    contract: 'kujira1n3fr5f56r2ce0s37wdvwrk98yhhq3unnxgcqus8nzsfxvllk0yxquurqty',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'ukuji',
  poolContract: 'kujira1lse59wt7a5yksdd08mennt299katjkfzdhmh8hvck8ln08jktcmsxrnh8s',
};
