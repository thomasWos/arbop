const moarStakingContract = 'terra1dndhtdr2v7ca8rrn67chlqw3cl3xhm3m2uxls62vghcg3fsh5tpss5xmcu';
const ampRoarStackingContract = 'terra1vklefn7n6cchn0u962w3gaszr4vf52wjvd4y95t2sydwpmpdtszsqvk9wy';

export const queryMoarRate = async (lcd) => {
  const moarState = await lcd.wasm.contractQuery(moarStakingContract, { state: {} });
  const moarRate = moarState.exchange_rate;

  const ampRoarState = await lcd.wasm.contractQuery(ampRoarStackingContract, { state: {} });
  const ampRoarRate = ampRoarState.exchange_rate;

  return moarRate * ampRoarRate;
};
