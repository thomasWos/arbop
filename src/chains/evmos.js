import { oneQuintillion } from '../utils.js';

const stEvmos = {
  name: 'EVMOS → stEVMOS',
  dex: 'Forge',
  redemptionKey: 'strideEvmos',
  tokenInAddress: '0xD4949664cD82660AaE99bEdc034a0deA8A0bd517',
  tokenInAmount: oneQuintillion,
  tokenOutAddress: '0x2C68D1d6aB986Ff4640b51e1F14C716a076E44C4',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stEvmos),
};

async function simuSwap(tokenInAmount, pairDef) {
  const quote =
    'https://a2skdrejs8.execute-api.eu-north-1.amazonaws.com/prod/quote?protocols=v3' +
    `&tokenInAddress=${pairDef.tokenInAddress}` +
    '&tokenInChainId=9001' +
    `&tokenOutAddress=${pairDef.tokenOutAddress}` +
    '&tokenOutChainId=9001' +
    `&amount=${tokenInAmount}` +
    `&type=exactIn`;

  return fetch(quote)
    .then((response) => response.json())
    .then((data) => data.quote);
}

export const evmosPair = [stEvmos];
