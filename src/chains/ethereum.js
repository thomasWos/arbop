import { Web3 } from 'web3';
import { oneQuintillion } from '../utils.js';

const web3 = new Web3('https://ethereum-rpc.publicnode.com');
const wstEthAbi = [
  {
    inputs: [],
    name: 'stEthPerToken',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const stEthAbi = [
  {
    name: 'get_dy',
    outputs: [{ type: 'uint256', name: '' }],
    inputs: [
      { type: 'int128', name: 'i' },
      { type: 'int128', name: 'j' },
      { type: 'uint256', name: 'dx' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const wstEthContract = new web3.eth.Contract(wstEthAbi, '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0');

export async function ethereumRedemptionMap() {
  const wstEthRate = await wstEthContract.methods
    .stEthPerToken()
    .call()
    .then((r) => parseInt(r) / oneQuintillion);

  return [
    ['stETH', 1],
    ['wstEth', wstEthRate],
  ];
}

const stEth = {
  name: 'ETH → stETH',
  dex: 'Curve',
  redemptionKey: 'stETH',
  poolContact: new web3.eth.Contract(stEthAbi, '0xdc24316b9ae028f1497c275eb9192a3ea0f67022'),
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwapCurve(tokenInAmount, stEth).then((dy) => parseInt(dy)),
};

async function simuSwapCurve(tokenInAmount, pairDef) {
  return pairDef.poolContact.methods.get_dy(0, 1, tokenInAmount).call();
}

export const ethPairs = [stEth];
