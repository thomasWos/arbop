import { queryContract, oneQuintillion } from '../utils.js';

const xAstroContract = 'neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn';
const dAtomContract = 'neutron16m3hjh7l04kap086jgwthduma0r5l0wh8kc6kaqk92ge9n5aqvys9q6lxr';

async function queryxAstroRate() {
  const totalDeposit = await queryContract(xAstroContract, { total_deposit: {} });
  const totalShares = await queryContract(xAstroContract, { total_shares: {} });
  return totalDeposit / totalShares;
}

export async function neutronRedemptionMap() {
  const xAstroRate = await queryxAstroRate();
  const dAtomRate = {
    redemptionRate: await queryContract(dAtomContract, { exchange_rate: {} }).then((d) => parseFloat(d)),
    unboundingPeriod: 21 + 3,
  };
  return [
    ['xASTRO', xAstroRate],
    ['dATOM', dAtomRate],
  ];
}

const xAstroNeutron = {
  name: 'ASTRO → xASTRO',
  dex: 'Astroport Neutron',
  redemptionKey: 'xASTRO',
  offerNativeTokenDenom: 'factory/neutron1ffus553eet978k024lmssw0czsxwr97mggyv85lpcsdkft8v9ufsz3sa07/astro',
  poolContract: 'neutron1kmkukaad9v0vc60xacgygtz9saukyhjutr60zj7weyjlnuf8eymq3tdqny',
};

const astroNeutron = {
  name: 'xASTRO → ASTRO',
  dex: 'Astroport Neutron',
  redemptionKey: 'xASTROinv',
  offerNativeTokenDenom: 'factory/neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn/xASTRO',
  poolContract: 'neutron1kmkukaad9v0vc60xacgygtz9saukyhjutr60zj7weyjlnuf8eymq3tdqny',
};

const stAtomNeutron = {
  name: 'ATOM → stATOM',
  dex: 'Astroport Neutron',
  redemptionKey: 'strideCosmos',
  offerNativeTokenDenom: 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9',
  poolContract: 'neutron1l7ny0rckx9rks2p2aq94wd74sehjczym6n9y4yax8lcy9s39uans4uga62',
};

const dAtom = {
  name: 'ATOM → dATOM',
  dex: 'Astroport Neutron',
  redemptionKey: 'dATOM',
  offerNativeTokenDenom: 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9',
  poolContract: 'neutron1yem82r0wf837lfkwvcu2zxlyds5qrzwkz8alvmg0apyrjthk64gqeq2e98',
};

const stkAtomNeutron = {
  name: 'ATOM → stkATOM',
  dex: 'Astroport Neutron',
  redemptionKey: 'stkATOM',
  offerNativeTokenDenom: 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9',
  poolContract: 'neutron1d73vc84e36d4mmm9dwqql4sty3fx4usjmupxewx36e4qudm5auqs0yryma',
};

const wstETH = {
  name: 'axlWETH → wstETH',
  dex: 'Astroport Neutron',
  redemptionKey: 'wstEth',
  offerNativeTokenDenom: 'ibc/A585C2D15DCD3B010849B453A2CFCB5E213208A5AB665691792684C26274304D',
  poolContract: 'neutron1yw0a7nxa8jdgzmdsme4gwxhj76n44z305qgwrzvlfavgna9epcys3k9m2f',
  tokenInAmount: oneQuintillion,
};

const wstEthToWstEthAxl = {
  name: 'wstETH → wstETH.axl',
  dex: 'Astroport Neutron',
  redemptionKey: 'identity',
  offerNativeTokenDenom: 'factory/neutron1ug740qrkquxzrk2hh29qrlx3sktkfml3je7juusc2te7xmvsscns0n2wry/wstETH',
  poolContract: 'neutron1ghhlz6zfc33r49u0y77u3shf5a88hcw2wrpwvuky7ucs24ye9ypqj3aypu',
  tokenInAmount: oneQuintillion,
};

const wstEthAxlTowstEth = {
  name: 'wstETH.axl  → wstETH',
  dex: 'Astroport Neutron',
  redemptionKey: 'identity',
  offerNativeTokenDenom: 'ibc/4D04085167777659C11784A356D6B0D13D5C7F0CE77F7DB1152FE03A2DE2CBF2',
  poolContract: 'neutron1ghhlz6zfc33r49u0y77u3shf5a88hcw2wrpwvuky7ucs24ye9ypqj3aypu',
  tokenInAmount: oneQuintillion,
};

export const neutronLsds = [xAstroNeutron, astroNeutron, stAtomNeutron, dAtom, stkAtomNeutron, wstETH, wstEthToWstEthAxl, wstEthAxlTowstEth];
