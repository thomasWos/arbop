import { encodePath } from '../utils.js';

export async function pryzmRedemptionMap() {
  return fetch('https://api.pryzm.zone/pryzm/icstaking/v1/host_chain_state')
    .then((resp) => resp.json())
    .then((data) => data.host_chain_state.map((hostChain) => [buildTokenName(hostChain.host_chain_id), parseFloat(hostChain.exchange_rate)]));
}

function buildTokenName(host_chain_id) {
  const baseName = host_chain_id.startsWith('u') ? host_chain_id.slice(1) : host_chain_id;
  return 'c' + baseName.toUpperCase();
}

const lunaTocLuna = {
  name: 'LUNA → cLUNA',
  dex: 'Prysm',
  redemptionKey: 'cLUNA',
  unboundingPeriod: 21 + 3,
  tokenIn: 'ibc/B8AF5D92165F35AB31F3FC7C7B444B9D240760FA5D406C49D24862BD0284E395',
  tokenOut: 'c:uluna',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, lunaTocLuna),
};

const cLunaToLuna = {
  name: 'cLUNA → LUNA',
  dex: 'Prysm',
  redemptionKey: 'cLUNAinv',
  tokenIn: 'c:uluna',
  tokenOut: 'ibc/B8AF5D92165F35AB31F3FC7C7B444B9D240760FA5D406C49D24862BD0284E395',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, cLunaToLuna),
};

const atomTocAtom = {
  name: 'ATOM → cATOM',
  dex: 'Prysm',
  redemptionKey: 'cATOM',
  unboundingPeriod: 21 + 3,
  tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  tokenOut: 'c:uatom',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, atomTocAtom),
};

const cAtomToAtom = {
  name: 'cATOM → ATOM',
  dex: 'Prysm',
  redemptionKey: 'cATOMinv',
  tokenIn: 'c:uatom',
  tokenOut: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, cAtomToAtom),
};

const osmoTocOsmo = {
  name: 'OSMO → cOSMO',
  dex: 'Prysm',
  redemptionKey: 'cOSMO',
  unboundingPeriod: 14 + 3,
  tokenIn: 'ibc/13B2C536BB057AC79D5616B8EA1B9540EC1F2170718CAFF6F0083C966FFFED0B',
  tokenOut: 'c:uosmo',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, osmoTocOsmo),
};

const cOsmoToOsmo = {
  name: 'cOSMO → OSMO',
  dex: 'Prysm',
  redemptionKey: 'cOSMOinv',
  tokenIn: 'c:uosmo',
  tokenOut: 'ibc/13B2C536BB057AC79D5616B8EA1B9540EC1F2170718CAFF6F0083C966FFFED0B',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, cOsmoToOsmo),
};

const injTocInj = {
  name: 'INJ → cINJ',
  dex: 'Prysm',
  redemptionKey: 'cINJ',
  unboundingPeriod: 21 + 3,
  decimal: 18,
  tokenIn: 'ibc/DE63D8AC34B752FB7D4CAA7594145EDE1C9FC256AC6D4043D0F12310EB8FC255',
  tokenOut: 'c:inj',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, injTocInj),
};

const cInjToInj = {
  name: 'cINJ → INJ',
  dex: 'Prysm',
  redemptionKey: 'cINJinv',
  decimal: 18,
  tokenIn: 'c:inj',
  tokenOut: 'ibc/DE63D8AC34B752FB7D4CAA7594145EDE1C9FC256AC6D4043D0F12310EB8FC255',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, cInjToInj),
};

async function simuSwap(tokenInAmount, pairDef) {
  const quote =
    'https://pryzmatics.pryzm.zone/pryzmatics/trade/simulation?swap_type=0' +
    `&token_in=${encodePath(pairDef.tokenIn)}` +
    `&token_out=${encodePath(pairDef.tokenOut)}` +
    `&amount=${tokenInAmount}`;

  return fetch(quote)
    .then((response) => response.json())
    .then((data) => data?.amount_out?.amount || 0);
}

export const prysmPairs = [
  // LUNA
  lunaTocLuna,
  cLunaToLuna,
  // ATOM
  atomTocAtom,
  cAtomToAtom,
  // OSMO
  osmoTocOsmo,
  cOsmoToOsmo,
  // INJ
  injTocInj,
  cInjToInj,
];
