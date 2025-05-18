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
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'cLUNA',
  unboundingPeriod: 21 + 3,
  tokenIn: 'ibc/B8AF5D92165F35AB31F3FC7C7B444B9D240760FA5D406C49D24862BD0284E395',
  tokenOut: 'c:uluna',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, lunaTocLuna),
};

const cLunaToLuna = {
  name: 'cLUNA → LUNA',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'cLUNAinv',
  tokenIn: 'c:uluna',
  tokenOut: 'ibc/B8AF5D92165F35AB31F3FC7C7B444B9D240760FA5D406C49D24862BD0284E395',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, cLunaToLuna),
};

const atomTocAtom = {
  name: 'ATOM → cATOM',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'cATOM',
  unboundingPeriod: 21 + 3,
  tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  tokenOut: 'c:uatom',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, atomTocAtom),
};

const cAtomToAtom = {
  name: 'cATOM → ATOM',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'cATOMinv',
  tokenIn: 'c:uatom',
  tokenOut: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, cAtomToAtom),
};

const atomTodAtom = {
  name: 'ATOM → dATOM',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'dATOM',
  tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  tokenOut: 'ibc/EA6E1E8BA2EB9F681C4BD12C8C81A46530A62934F2BD561B120A00F46946CE87',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, atomTodAtom),
};

const dAtomToAtom = {
  name: 'dATOM → ATOM',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'dATOMinv',
  tokenIn: 'ibc/EA6E1E8BA2EB9F681C4BD12C8C81A46530A62934F2BD561B120A00F46946CE87',
  tokenOut: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, dAtomToAtom),
};

const osmoTocOsmo = {
  name: 'OSMO → cOSMO',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'cOSMO',
  unboundingPeriod: 14 + 3,
  tokenIn: 'ibc/13B2C536BB057AC79D5616B8EA1B9540EC1F2170718CAFF6F0083C966FFFED0B',
  tokenOut: 'c:uosmo',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, osmoTocOsmo),
};

const cOsmoToOsmo = {
  name: 'cOSMO → OSMO',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'cOSMOinv',
  tokenIn: 'c:uosmo',
  tokenOut: 'ibc/13B2C536BB057AC79D5616B8EA1B9540EC1F2170718CAFF6F0083C966FFFED0B',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, cOsmoToOsmo),
};

const injTocInj = {
  name: 'INJ → cINJ',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
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
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'cINJinv',
  decimal: 18,
  tokenIn: 'c:inj',
  tokenOut: 'ibc/DE63D8AC34B752FB7D4CAA7594145EDE1C9FC256AC6D4043D0F12310EB8FC255',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, cInjToInj),
};

const usdcToNusdc = {
  name: 'USDC → nUSDC',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'nUSDC',
  tokenIn: 'ibc/BFAAB7870A9AAABF64A7366DAAA0B8E5065EAA1FCE762F45677DC24BE796EF65',
  tokenOut: 'ibc/9924F230D93D88A98D1469A24E523D7BF58935E6321C18CFAEFBFC068B54676F',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, usdcToNusdc),
};

const nUsdcToUsdc = {
  name: 'nUSDC → USDC',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'nUSDCinv',
  tokenIn: 'ibc/9924F230D93D88A98D1469A24E523D7BF58935E6321C18CFAEFBFC068B54676F',
  tokenOut: 'ibc/BFAAB7870A9AAABF64A7366DAAA0B8E5065EAA1FCE762F45677DC24BE796EF65',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, nUsdcToUsdc),
};

const usdtToNusdt = {
  name: 'USDT → nUSDT',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'nUSDT',
  tokenIn: 'ibc/D8A36AE90F20FE4843A8D249B1BCF0CCDDE35C4B605C8DED57BED20C639162D0',
  tokenOut: 'ibc/018AC5A86B24C7FCE5BAF37B50F47028A8BA791F64233773531EE10F97CBA225',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, usdtToNusdt),
};

const nUsdtToUsdt = {
  name: 'nUSDT → USDT',
  dex: 'Prysm',
  dexUrl: 'https://app.pryzm.zone/swap',
  redemptionKey: 'nUSDTinv',
  tokenIn: 'ibc/018AC5A86B24C7FCE5BAF37B50F47028A8BA791F64233773531EE10F97CBA225',
  tokenOut: 'ibc/D8A36AE90F20FE4843A8D249B1BCF0CCDDE35C4B605C8DED57BED20C639162D0',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, nUsdtToUsdt),
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
  atomTodAtom,
  dAtomToAtom,
  // OSMO
  osmoTocOsmo,
  cOsmoToOsmo,
  // INJ
  injTocInj,
  cInjToInj,
  // USDC
  usdcToNusdc,
  nUsdcToUsdc,
  // USDT
  usdtToNusdt,
  nUsdtToUsdt,
];
