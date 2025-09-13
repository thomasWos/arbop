import { Web3 } from 'web3';
import { oneQuintillion } from '../utils.js';

const web3 = new Web3('https://avalanche-c-chain-rpc.publicnode.com');
const YAK_MAX_STEPS = 3;
const WAVAX_ADDRESS = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';
const SAVAX_ADDRESS = '0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE';
const GGAVAX_ADDRESS = '0xA25EaF2906FA1a3a13EdAc9B9657108Af7B703e3';
const RSAVAX_ADDRESS = '0xDf788AD40181894dA035B827cDF55C523bf52F67';
const STATAAVAWAVAX_ADDRESS = '0x6a02c7a974f1f13a67980c80f774ec1d2ed8f98d';
const TAVAX_ADDRESS = '0x14a84f1a61ccd7d1be596a6cc11fe33a36bc1646';

const stAvaxAbi = [
  {
    inputs: [{ internalType: 'uint256', name: 'shareAmount', type: 'uint256' }],
    name: 'getPooledAvaxByShares',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const convertToAssetsAbi = [
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

const balancerQueryAbi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'poolId',
            type: 'bytes32',
          },
          {
            internalType: 'enum IVault.SwapKind',
            name: 'kind',
            type: 'uint8',
          },
          {
            internalType: 'contract IAsset',
            name: 'assetIn',
            type: 'address',
          },
          {
            internalType: 'contract IAsset',
            name: 'assetOut',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'userData',
            type: 'bytes',
          },
        ],
        internalType: 'struct IVault.SingleSwap',
        name: 'singleSwap',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'fromInternalBalance',
            type: 'bool',
          },
          {
            internalType: 'address payable',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'toInternalBalance',
            type: 'bool',
          },
        ],
        internalType: 'struct IVault.FundManagement',
        name: 'funds',
        type: 'tuple',
      },
    ],
    name: 'querySwap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const sAvaxContract = new web3.eth.Contract(stAvaxAbi, SAVAX_ADDRESS);
const ggAvaxContract = new web3.eth.Contract(convertToAssetsAbi, GGAVAX_ADDRESS);
const stataAvaWAVAXContract = new web3.eth.Contract(convertToAssetsAbi, STATAAVAWAVAX_ADDRESS);
const tAvaxContract = new web3.eth.Contract(convertToAssetsAbi, TAVAX_ADDRESS);
const yakRouterContract = new web3.eth.Contract(yakRouterAbi, '0xc4729e56b831d74bbc18797e0e17a295fa77488c');
const balancerQueryContract = new web3.eth.Contract(balancerQueryAbi, '0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD');

export async function avalancheRedemptionMap() {
  const sAvaxRate = await sAvaxContract.methods
    .getPooledAvaxByShares(oneQuintillion)
    .call()
    .then((r) => parseInt(r) / oneQuintillion);

  const ggAvaxRate = await ggAvaxContract.methods
    .convertToAssets(oneQuintillion)
    .call()
    .then((r) => parseInt(r) / oneQuintillion);

  const stataAvaWAVAXRate = await stataAvaWAVAXContract.methods
    .convertToAssets(oneQuintillion)
    .call()
    .then((r) => parseInt(r) / oneQuintillion);

  const tAvaxRate = await tAvaxContract.methods
    .convertToAssets(oneQuintillion)
    .call()
    .then((r) => parseInt(r) / oneQuintillion);

  return [
    ['sAVAX', { redemptionRate: sAvaxRate, unboundingPeriod: 15 }],
    ['ggAVAX', ggAvaxRate],
    ['stataAvaWAVAX', stataAvaWAVAXRate],
    ['tAVAX', tAvaxRate],
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

const sAvaxToAvax = {
  name: 'sAVAX → AVAX',
  dex: 'YakSwap',
  redemptionKey: 'sAVAXinv',
  tokenInAmount: oneQuintillion,
  addressTokenIn: SAVAX_ADDRESS,
  addressTokenOut: WAVAX_ADDRESS,
  simuSwap: async (tokenInAmount) => yakFindBestPath(tokenInAmount, sAvaxToAvax),
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

const ggAvaxToAvax = {
  name: 'ggAVAX → AVAX',
  dex: 'YakSwap',
  redemptionKey: 'ggAVAXinv',
  tokenInAmount: oneQuintillion,
  addressTokenIn: GGAVAX_ADDRESS,
  addressTokenOut: WAVAX_ADDRESS,
  simuSwap: async (tokenInAmount) => yakFindBestPath(tokenInAmount, ggAvaxToAvax),
};

const avaxTorsAvax = {
  name: 'AVAX → rsAVAX',
  dex: 'YakSwap',
  redemptionKey: 'sAVAX',
  tokenInAmount: oneQuintillion,
  addressTokenIn: WAVAX_ADDRESS,
  addressTokenOut: RSAVAX_ADDRESS,
  simuSwap: async (tokenInAmount) => yakFindBestPath(tokenInAmount, avaxTorsAvax),
};

const rsAvaxToAvax = {
  name: 'rsAVAX → AVAX',
  dex: 'YakSwap',
  redemptionKey: 'sAVAXinv',
  tokenInAmount: oneQuintillion,
  addressTokenIn: RSAVAX_ADDRESS,
  addressTokenOut: WAVAX_ADDRESS,
  simuSwap: async (tokenInAmount) => yakFindBestPath(tokenInAmount, rsAvaxToAvax),
};

const sAvaxToStataAvaWavax = {
  name: 'sAVAX → static aWAVAX',
  dex: 'Balancer',
  offerRedemptionKey: 'sAVAX',
  redemptionKey: 'stataAvaWAVAX',
  tokenInAmount: oneQuintillion,
  addressTokenIn: SAVAX_ADDRESS,
  addressTokenOut: STATAAVAWAVAX_ADDRESS,
  poolId: '0x82c0f5fe6bd04f2dce371d4e3f0689d1cfad1f5c000200000000000000000052',
  simuSwap: async (tokenInAmount) => querySwapBalancer(tokenInAmount, sAvaxToStataAvaWavax),
};

const stataAvaWavaxToSavax = {
  name: 'static aWAVAX → sAVAX',
  dex: 'Balancer',
  offerRedemptionKey: 'stataAvaWAVAX',
  redemptionKey: 'sAVAX',
  tokenInAmount: oneQuintillion,
  addressTokenIn: STATAAVAWAVAX_ADDRESS,
  addressTokenOut: SAVAX_ADDRESS,
  poolId: '0x82c0f5fe6bd04f2dce371d4e3f0689d1cfad1f5c000200000000000000000052',
  simuSwap: async (tokenInAmount) => querySwapBalancer(tokenInAmount, stataAvaWavaxToSavax),
};

const stataAvaWavaxToGgAvax = {
  name: 'static aWAVAX → ggAVAX',
  dex: 'Balancer',
  offerRedemptionKey: 'stataAvaWAVAX',
  redemptionKey: 'ggAVAX',
  tokenInAmount: oneQuintillion,
  addressTokenIn: STATAAVAWAVAX_ADDRESS,
  addressTokenOut: GGAVAX_ADDRESS,
  poolId: '0x296df277579b38db06fe5bdf179252f983672d6d000200000000000000000056',
  simuSwap: async (tokenInAmount) => querySwapBalancer(tokenInAmount, stataAvaWavaxToGgAvax),
};

async function yakFindBestPath(tokenInAmount, pairDef) {
  return yakRouterContract.methods
    .findBestPath(tokenInAmount, pairDef.addressTokenIn, pairDef.addressTokenOut, YAK_MAX_STEPS)
    .call()
    .then((fr) => parseInt(fr.amounts[fr.amounts.length - 1]));
}

async function querySwapBalancer(tokenInAmount, pairDef) {
  return balancerQueryContract.methods
    .querySwap(
      {
        poolId: pairDef.poolId,
        kind: 0,
        assetIn: pairDef.addressTokenIn,
        assetOut: pairDef.addressTokenOut,
        amount: tokenInAmount,
        userData: '0x',
      },
      {
        sender: '0x0000000000000000000000000000000000000000',
        fromInternalBalance: false,
        recipient: '0x0000000000000000000000000000000000000000',
        toInternalBalance: false,
      }
    )
    .call()
    .then((r) => parseInt(r));
}

export const avaxPairs = [
  avaxToSAvax,
  sAvaxToAvax,
  avaxToggAvax,
  ggAvaxToAvax,
  avaxTorsAvax,
  rsAvaxToAvax,
  sAvaxToStataAvaWavax,
  stataAvaWavaxToSavax,
  stataAvaWavaxToGgAvax,
];
