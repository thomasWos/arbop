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

const mevEthAbi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256',
      },
    ],
    name: 'convertToAssets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'assets',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const getDyAbi = [
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

const getDyAbi2 = [
  {
    stateMutability: 'view',
    type: 'function',
    name: 'get_dy',
    inputs: [
      {
        name: 'i',
        type: 'uint256',
      },
      {
        name: 'j',
        type: 'uint256',
      },
      {
        name: 'dx',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
];

const wstEthContract = new web3.eth.Contract(wstEthAbi, '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0');
const mevEthContract = new web3.eth.Contract(mevEthAbi, '0x24Ae2dA0f361AA4BE46b48EB19C91e02c5e4f27E');

export async function ethereumRedemptionMap() {
  const wstEthRate = await wstEthContract.methods
    .stEthPerToken()
    .call()
    .then((r) => parseInt(r) / oneQuintillion);

  const mevEth = await mevEthContract.methods
    .convertToAssets(oneQuintillion)
    .call()
    .then((r) => parseInt(r) / oneQuintillion);

  return [
    ['stETH', { redemptionRate: 1, unboundingPeriod: 7 }],
    ['wstETH', { redemptionRate: wstEthRate, unboundingPeriod: 7 }],
    ['mevETH', { redemptionRate: mevEth, unboundingPeriod: 15 }],
  ];
}

const stEth = {
  name: 'ETH → stETH',
  dex: 'Curve',
  redemptionKey: 'stETH',
  poolContact: new web3.eth.Contract(getDyAbi, '0xdc24316b9ae028f1497c275eb9192a3ea0f67022'),
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwapCurve(tokenInAmount, stEth),
};

const stEthNg = {
  name: 'ETH → stETH ng',
  dex: 'Curve',
  redemptionKey: 'stETH',
  poolContact: new web3.eth.Contract(getDyAbi, '0x21e27a5e5513d6e65c4f830167390997aa84843a'),
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwapCurve(tokenInAmount, stEthNg),
};

const frxETHtoMevETH = {
  name: 'frxETH → mevETH',
  dex: 'Curve',
  redemptionKey: 'mevETH',
  poolContact: new web3.eth.Contract(getDyAbi2, '0xf1b0382a141040601bd4c98ee1a05b44a7392a80'),
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwapCurve(tokenInAmount, frxETHtoMevETH),
};

const mevETHtofrxETH = {
  name: 'mevETH → frxETH',
  dex: 'Curve',
  redemptionKey: 'mevETHinv',
  poolContact: new web3.eth.Contract(getDyAbi2, '0xf1b0382a141040601bd4c98ee1a05b44a7392a80'),
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwapCurveInv(tokenInAmount, mevETHtofrxETH),
};

async function simuSwapCurve(tokenInAmount, pairDef) {
  return pairDef.poolContact.methods
    .get_dy(0, 1, tokenInAmount)
    .call()
    .then((dy) => parseInt(dy));
}

async function simuSwapCurveInv(tokenInAmount, pairDef) {
  return pairDef.poolContact.methods
    .get_dy(1, 0, tokenInAmount)
    .call()
    .then((dy) => parseInt(dy));
}

export const ethPairs = [stEth, stEthNg, frxETHtoMevETH, mevETHtofrxETH];
