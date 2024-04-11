const astroStakingContract = 'terra1nyu6sk9rvtvsltm7tjjrp6rlavnm3e4sq03kltde6kesam260f8szar8ze';

export const queryxAstroRate = async (lcd) => {
  const totalDeposit = await lcd.wasm.contractQuery(astroStakingContract, { total_deposit: {} });
  const totalShares = await lcd.wasm.contractQuery(astroStakingContract, { total_shares: {} });
  return totalDeposit / totalShares;
};
