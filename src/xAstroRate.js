import { queryContract } from './utils.js';

export const queryNewxAstroRate = async () => {
  return queryxAstroRate('neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn');
};

export const queryOldxAstroRate = async () => {
  return queryxAstroRate('terra1nyu6sk9rvtvsltm7tjjrp6rlavnm3e4sq03kltde6kesam260f8szar8ze');
};

async function queryxAstroRate(contract) {
  const totalDeposit = await queryContract(contract, { total_deposit: {} });
  const totalShares = await queryContract(contract, { total_shares: {} });
  return totalDeposit / totalShares;
}
