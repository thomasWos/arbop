import { queryContract } from '../utils.js';

async function queryxAstroRate() {
  const contract = 'neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn';
  const totalDeposit = await queryContract(contract, { total_deposit: {} });
  const totalShares = await queryContract(contract, { total_shares: {} });
  return totalDeposit / totalShares;
}

export async function neutronRedemptionMap() {
  const xAstroRate = await queryxAstroRate();
  return new Map([
    ['xASTRO', xAstroRate],
    ['ASTRO', 1 / xAstroRate],
  ]);
}
