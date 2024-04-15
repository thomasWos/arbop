export const queryNewxAstroRate = async (lcd) => {
  return queryxAstroRate(lcd, 'neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn');
};

export const queryOldxAstroRate = async (lcd) => {
  return queryxAstroRate(lcd, 'terra1nyu6sk9rvtvsltm7tjjrp6rlavnm3e4sq03kltde6kesam260f8szar8ze');
};

async function queryxAstroRate(lcd, contract) {
  const totalDeposit = await lcd.wasm.contractQuery(contract, { total_deposit: {} });
  const totalShares = await lcd.wasm.contractQuery(contract, { total_shares: {} });
  return totalDeposit / totalShares;
}
