import { Web3 } from 'web3';
import { oneQuintillion } from '../utils.js';

const web3 = new Web3('https://avalanche-c-chain-rpc.publicnode.com');
const YAK_MAX_STEPS = 3;
const WAVAX_ADDRESS = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';
const SAVAX_ADDRESS = '0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE';
const GGAVAX_ADDRESS = '0xA25EaF2906FA1a3a13EdAc9B9657108Af7B703e3';

const stAvaxAbi = [
  {
    inputs: [{ internalType: 'uint256', name: 'shareAmount', type: 'uint256' }],
    name: 'getPooledAvaxByShares',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const ggAvaxAbi = [
  {
    inputs: [{ internalType: 'uint256', name: 'shares', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const yakRouterAbi = [
  {
    inputs: [
      { internalType: 'uint256', name: '_amountIn', type: 'uint256' },
      { internalType: 'address', name: '_tokenIn', type: 'address' },
      { internalType: 'address', name: '_tokenOut', type: 'address' },
      { internalType: 'uint256', name: '_maxSteps', type: 'uint256' },
    ],
    name: 'findBestPath',
    outputs: [
      {
        components: [
          { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
          { internalType: 'address[]', name: 'adapters', type: 'address[]' },
          { internalType: 'address[]', name: 'path', type: 'address[]' },
        ],
        internalType: 'struct YakRouter.FormattedOffer',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const sAvaxContract = new web3.eth.Contract(stAvaxAbi, SAVAX_ADDRESS);
const ggAvaxContract = new web3.eth.Contract(ggAvaxAbi, GGAVAX_ADDRESS);
const yakRouterContract = new web3.eth.Contract(yakRouterAbi, '0xc4729e56b831d74bbc18797e0e17a295fa77488c');

export async function avalancheRedemptionMap() {
  const sAvaxRate = await sAvaxContract.methods
    .getPooledAvaxByShares(oneQuintillion)
    .call()
    .then((r) => parseInt(r) / oneQuintillion);

  const ggAvaxRate = await ggAvaxContract.methods
    .convertToAssets(oneQuintillion)
    .call()
    .then((r) => parseInt(r) / oneQuintillion);

  return [
    ['sAVAX', { redemptionRate: sAvaxRate, unboundingPeriod: 15 }],
    ['ggAVAX', ggAvaxRate],
  ];
}

const avaxToSAvax = {
  name: 'AVAX → sAVAX',
  dex: 'YakSwap',
  redemptionKey: 'sAVAX',
  tokenInAmount: oneQuintillion,
  addressTokenIn: WAVAX_ADDRESS,
  addressTokenOut: SAVAX_ADDRESS,
  simuSwap: async (tokenInAmount) => yakFindBestPath(tokenInAmount, avaxToSAvax),
};

const avaxToSAvaxInv = {
  name: 'sAVAX → AVAX',
  dex: 'YakSwap',
  redemptionKey: 'sAVAXinv',
  tokenInAmount: oneQuintillion,
  addressTokenIn: SAVAX_ADDRESS,
  addressTokenOut: WAVAX_ADDRESS,
  simuSwap: async (tokenInAmount) => yakFindBestPath(tokenInAmount, avaxToSAvaxInv),
};

const avaxToggAvax = {
  name: 'AVAX → ggAVAX',
  dex: 'YakSwap',
  redemptionKey: 'ggAVAX',
  tokenInAmount: oneQuintillion,
  addressTokenIn: WAVAX_ADDRESS,
  addressTokenOut: GGAVAX_ADDRESS,
  simuSwap: async (tokenInAmount) => yakFindBestPath(tokenInAmount, avaxToggAvax),
};

const avaxToggAvaxinv = {
  name: 'ggAVAX → AVAX',
  dex: 'YakSwap',
  redemptionKey: 'ggAVAXinv',
  tokenInAmount: oneQuintillion,
  addressTokenIn: GGAVAX_ADDRESS,
  addressTokenOut: WAVAX_ADDRESS,
  simuSwap: async (tokenInAmount) => yakFindBestPath(tokenInAmount, avaxToggAvaxinv),
};

async function yakFindBestPath(tokenInAmount, pairDef) {
  return yakRouterContract.methods
    .findBestPath(tokenInAmount, pairDef.addressTokenIn, pairDef.addressTokenOut, YAK_MAX_STEPS)
    .call()
    .then((fr) => parseInt(fr.amounts[fr.amounts.length - 1]));
}

export const avaxPairs = [avaxToSAvax, avaxToSAvaxInv, avaxToggAvax, avaxToggAvaxinv];
