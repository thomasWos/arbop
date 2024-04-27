import { queryContract } from './utils.js';

const moarStakingContract = 'terra1dndhtdr2v7ca8rrn67chlqw3cl3xhm3m2uxls62vghcg3fsh5tpss5xmcu';
const ampRoarStackingContract = 'terra1vklefn7n6cchn0u962w3gaszr4vf52wjvd4y95t2sydwpmpdtszsqvk9wy';

export const queryMoarRate = async () => {
  const moarState = await queryContract(moarStakingContract, { state: {} });
  const moarRate = moarState.exchange_rate;

  const ampRoarState = await queryContract(ampRoarStackingContract, { state: {} });
  const ampRoarRate = ampRoarState.exchange_rate;

  return moarRate * ampRoarRate;
};
