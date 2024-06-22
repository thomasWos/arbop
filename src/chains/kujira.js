import { exchangeRateFromState, queryState } from '../utils.js';

const ampKujiContract = 'kujira1n3fr5f56r2ce0s37wdvwrk98yhhq3unnxgcqus8nzsfxvllk0yxquurqty';
const qcKujiContract = 'kujira1m96ucsfpt2yy72w09z2rxjdj38y5qd8lqx5jtggnejmdua2ynpnsxyvjex';

export async function kujiraRedemptionMap() {
  const ampKujiRedemption = {
    redemptionRate: await exchangeRateFromState(ampKujiContract),
    unboundingPeriod: 14 + 2,
  };

  const qcKujiRedemption = {
    redemptionRate: await queryState(qcKujiContract).then((s) => parseFloat(s.rate)),
    unboundingPeriod: 14,
  };

  return new Map([
    ['ampKUJI', ampKujiRedemption],
    ['qcKUJI', qcKujiRedemption],
  ]);
}

const ampKujiFin = {
  name: 'KUJI → ampKUJI',
  dex: 'FIN',
  redemptionKey: 'ampKUJI',
  offerNativeTokenDenom: 'ukuji',
  poolContract: 'kujira1lse59wt7a5yksdd08mennt299katjkfzdhmh8hvck8ln08jktcmsxrnh8s',
};

const qcKUJIFin = {
  name: 'KUJI → qcKUJI',
  dex: 'FIN',
  redemptionKey: 'qcKUJI',
  offerNativeTokenDenom: 'ukuji',
  poolContract: 'kujira14wsrem89304kpkl6d0j58dl6479eekwt047ccs0qzv9f60w80wzs8rjq4j',
};

const stAtomKujira = {
  name: 'ATOM → stATOM',
  dex: 'FIN',
  redemptionKey: 'strideCosmos',
  offerNativeTokenDenom: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  poolContract: 'kujira158zzjcvkz7r3j5hueurcw22qrjerqw4dtrzlalztr7whjykjwvrsrahdnq',
};

const stOsmoKujira = {
  name: 'OSMO → stOsmo',
  dex: 'FIN',
  redemptionKey: 'strideOsmo',
  offerNativeTokenDenom: 'ibc/47BD209179859CDE4A2806763D7189B6E6FE13A17880FE2B42DE1E6C1E329E23',
  poolContract: 'kujira14rrh06m6rm699psw4dly88n7whqjsustqzcj23rwvmy5egu4vd8qm99rcx',
};

const rAtomKujira = {
  name: 'ATOM → rATOM',
  dex: 'FIN',
  redemptionKey: 'rATOM',
  unboundingPeriod: 22,
  offerNativeTokenDenom: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  poolContract: 'kujira1ryul6unmsnjccsugtempgdtly3gsdtu8af44yt5sqf4zpkgg7vjqkpxjjx',
};

const ampLuna = {
  name: 'LUNA → ampLUNA',
  dex: 'FIN',
  redemptionKey: 'ampLUNA',
  offerNativeTokenDenom: 'ibc/DA59C009A0B3B95E0549E6BF7B075C8239285989FF457A8EDDBB56F10B2A6986',
  poolContract: 'kujira172qjrk8g9l86w0shz4cc3e6rt5h9janaen4j4u6ze7xkjvjnaqfskwyyqm',
};

const ampWhale = {
  name: 'WHALE → ampWHALE',
  dex: 'FIN',
  redemptionKey: 'ampWHALE',
  offerNativeTokenDenom: 'ibc/21F041CFE99994E0D027D0C5F72A9EB6224CBCAF5A6AD5DDB75F67A781D46C68',
  poolContract: 'kujira10vkk8ulf3rvfuzlfpqflklr2zkq6586pl9amcsafp2s6t4j7qn7seemml3',
};

export const kujiLsds = [ampKujiFin, qcKUJIFin, stAtomKujira, stOsmoKujira, rAtomKujira, ampLuna, ampWhale];
