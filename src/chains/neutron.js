import { queryContract } from '../utils.js';

async function queryxAstroRate() {
  const contract = 'neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn';
  const totalDeposit = await queryContract(contract, { total_deposit: {} });
  const totalShares = await queryContract(contract, { total_shares: {} });
  return totalDeposit / totalShares;
}

export async function neutronRedemptionMap() {
  const xAstroRate = await queryxAstroRate();
  return [['xASTRO', xAstroRate]];
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

const stkAtomNeutron = {
  name: 'ATOM → stkATOM',
  dex: 'Astroport Neutron',
  redemptionKey: 'stkATOM',
  offerNativeTokenDenom: 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9',
  poolContract: 'neutron1d73vc84e36d4mmm9dwqql4sty3fx4usjmupxewx36e4qudm5auqs0yryma',
};

export const neutronLsds = [xAstroNeutron, astroNeutron, stAtomNeutron, stkAtomNeutron];
