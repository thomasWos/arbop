import { queryContract } from '../utils.js';

const usdcAdd = 'ibc/2CBC2EA121AE42563B08028466F37B600F2D7D4282342DE938283CC3FB2BC00E';
const usdtAdd = 'peggy0xdAC17F958D2ee523a2206206994597C13D831ec7';
const atomAdd = 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9';

export async function injectiveRedemptionMap() {
  const markets = new Map(
    await queryContract('inj1nc7gjkf2mhp34a6gquhurg8qahnw5kxs5u3s4u', { get_all_markets: {} }).then((d) =>
      d.map((t) => [t[0].native_token.denom, t[1].lending_principal])
    )
  );

  const nUsdcSupply = await queryContract('inj1dafy7fv7qczzatd98dv8hekx6ssckrflswpjaz', { token_info: {} }).then((d) => parseInt(d.total_supply));
  const nUsdtSupply = await queryContract('inj1cy9hes20vww2yr6crvs75gxy5hpycya2hmjg9s', { token_info: {} }).then((d) => parseInt(d.total_supply));
  const nAtomSupply = await queryContract('inj16jf4qkcarp3lan4wl2qkrelf4kduvvujwg0780', { token_info: {} }).then((d) => parseInt(d.total_supply));

  const usdcLendingPrincipal = markets.get(usdcAdd);
  const usdtLendingPrincipal = markets.get(usdtAdd);
  const atomLendingPrincipal = markets.get(atomAdd);

  return [
    ['nUSDC', usdcLendingPrincipal / nUsdcSupply],
    ['nUSDT', usdtLendingPrincipal / nUsdtSupply],
    ['nATOM', atomLendingPrincipal / nAtomSupply],
  ];
}

const stInjAstro = {
  name: 'INJ → stINJ',
  dex: 'Astroport Injective',
  redemptionKey: 'strideInj',
  offerNativeTokenDenom: 'inj',
  decimal: 18,
  poolContract: 'inj10fd06xl4q6jp9qlhemvm6ymmm83ppj2g8rzquw',
};

const dAtomNAtomAstro = {
  name: 'dATOM → nATOM',
  dex: 'Astroport Injective',
  offerRedemptionKey: 'dATOM',
  offerNativeTokenDenom: 'ibc/9495CFCB73E9D060D7B8C974C22AD8D5F1D97F93B66A4E326A3052ABE6470BB6',
  redemptionKey: 'nATOM',
  poolContract: 'inj18ucwme9nyemev9cjhy6jtagtu4laxh7ztzeqqc',
  dexUrl:
    'https://app.astroport.fi/swap?chain=inj&from=ibc/9495CFCB73E9D060D7B8C974C22AD8D5F1D97F93B66A4E326A3052ABE6470BB6&to=inj16jf4qkcarp3lan4wl2qkrelf4kduvvujwg0780',
};

const nAtomDAtomAstro = {
  name: 'nATOM → dATOM',
  dex: 'Astroport Injective',
  offerRedemptionKey: 'nATOM',
  offerTokenAddr: 'inj16jf4qkcarp3lan4wl2qkrelf4kduvvujwg0780',
  redemptionKey: 'dATOM',
  poolContract: 'inj18ucwme9nyemev9cjhy6jtagtu4laxh7ztzeqqc',
  dexUrl:
    'https://app.astroport.fi/swap?chain=inj&from=inj16jf4qkcarp3lan4wl2qkrelf4kduvvujwg0780&to=ibc/9495CFCB73E9D060D7B8C974C22AD8D5F1D97F93B66A4E326A3052ABE6470BB6',
};

export const injectivePairs = [stInjAstro, dAtomNAtomAstro, nAtomDAtomAstro];
