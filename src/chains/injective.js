import { queryContract } from '../utils.js';

export async function injectiveRedemptionMap() {
  // const markets = await queryContract('inj1nc7gjkf2mhp34a6gquhurg8qahnw5kxs5u3s4u', { get_all_markets: {} }).then((d) => parseInt(d.total_supply));
  // const nUsdcSupply = await queryContract('inj1dafy7fv7qczzatd98dv8hekx6ssckrflswpjaz', { token_info: {} }).then((d) => parseInt(d.total_supply));
  return [];
}

const ampWhale = {
  name: 'WHALE → ampWHALE',
  dex: 'White Whale Injective',
  redemptionKey: 'ampWHALE',
  offerNativeTokenDenom: 'ibc/D6E6A20ABDD600742D22464340A7701558027759CE14D12590F8EA869CCCF445',
  poolContract: 'inj1gyxlm5j537d8pvl5eqfswya93delvh3nlhustk',
};

const ampWhaleInv = {
  name: 'ampWHALE → WHALE',
  dex: 'White Whale Injective',
  redemptionKey: 'ampWHALEinv',
  offerNativeTokenDenom: 'ibc/168C3904C45C6FE3539AE85A8892DF87371D00EA7942515AFC50AA43C4BB0A32',
  poolContract: 'inj1gyxlm5j537d8pvl5eqfswya93delvh3nlhustk',
};

const bWhale = {
  name: 'WHALE → bWHALE',
  dex: 'White Whale Injective',
  redemptionKey: 'bWHALE',
  offerNativeTokenDenom: 'ibc/D6E6A20ABDD600742D22464340A7701558027759CE14D12590F8EA869CCCF445',
  poolContract: 'inj17dez7atlgwrl7lxzszxjy7gzuj325n8re3f7mh',
};

const bWhaleInv = {
  name: 'bWHALE → WHALE',
  dex: 'White Whale Injective',
  redemptionKey: 'bWHALEinv',
  offerNativeTokenDenom: 'ibc/ECB0AA28D6001EF985047558C410B65581FC85BD92D4E3CFCCA0D3D964C67CC2',
  poolContract: 'inj17dez7atlgwrl7lxzszxjy7gzuj325n8re3f7mh',
};

const stInjAstro = {
  name: 'INJ → stINJ',
  dex: 'Astroport Injective',
  redemptionKey: 'strideInj',
  offerNativeTokenDenom: 'inj',
  decimal: 18,
  poolContract: 'inj10fd06xl4q6jp9qlhemvm6ymmm83ppj2g8rzquw',
};

export const injectivePairs = [ampWhale, ampWhaleInv, bWhale, bWhaleInv, stInjAstro];
