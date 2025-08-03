import { exchangeRateFromState, oneQuintillion } from '../utils.js';

const ampOsmoContract = 'osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9';
const bOsmoContract = 'osmo1s3l0lcqc7tu0vpj6wdjz9wqpxv8nk6eraevje4fuwkyjnwuy82qsx3lduv';

export async function osmosisRedemptionMap() {
  const ampOsmoRedemption = {
    redemptionRate: await exchangeRateFromState(ampOsmoContract),
    unboundingPeriod: 14 + 2,
  };

  const bOsmoRedemption = {
    redemptionRate: await exchangeRateFromState(bOsmoContract),
    unboundingPeriod: 14 + 3,
  };

  return [
    ['ampOSMO', ampOsmoRedemption],
    ['bOSMO', bOsmoRedemption],
  ];
}

const ampOsmo = {
  name: 'OSMO → ampOSMO',
  dex: 'Osmosis',
  dexUrl: 'https://app.osmosis.zone/?from=OSMO&to=ampOSMO',
  redemptionKey: 'ampOSMO',
  tokenIn: 'uosmo',
  tokenOut: 'factory/osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9/ampOSMO',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, ampOsmo),
};

const bOsmo = {
  name: 'OSMO → bOSMO',
  dex: 'Osmosis',
  dexUrl: 'https://app.osmosis.zone/?from=OSMO&to=bOSMO',
  redemptionKey: 'bOSMO',
  tokenIn: 'uosmo',
  tokenOut: 'factory/osmo1s3l0lcqc7tu0vpj6wdjz9wqpxv8nk6eraevje4fuwkyjnwuy82qsx3lduv/boneOsmo',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, bOsmo),
};

const qOsmos = {
  name: 'OSMO → qOSMO',
  dex: 'Osmosis',
  redemptionKey: 'qOSMO',
  tokenIn: 'uosmo',
  tokenOut: 'ibc/42D24879D4569CE6477B7E88206ADBFE47C222C6CAD51A54083E4A72594269FC',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, qOsmos),
};

const stAtom = {
  name: 'ATOM → stATOM',
  dex: 'Osmosis',
  redemptionKey: 'strideCosmos',
  tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  tokenOut: 'ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stAtom),
};

const stOsmo = {
  name: 'OSMO → stOsmo',
  dex: 'Osmosis',
  redemptionKey: 'strideOsmo',
  tokenIn: 'uosmo',
  tokenOut: 'ibc/D176154B0C63D1F9C6DCFB4F70349EBF2E2B5A87A05902F57A6AE92B863E9AEC',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stOsmo),
};

const stJuno = {
  name: 'JUNO → stJUNO',
  dex: 'Osmosis',
  redemptionKey: 'strideJuno',
  tokenIn: 'ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED',
  tokenOut: 'ibc/84502A75BCA4A5F68D464C00B3F610CE2585847D59B52E5FFB7C3C9D2DDCD3FE',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stJuno),
};

const stStars = {
  name: 'STARS → stSTARS',
  dex: 'Osmosis',
  redemptionKey: 'strideStars',
  tokenIn: 'ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4',
  tokenOut: 'ibc/5DD1F95ED336014D00CE2520977EC71566D282F9749170ADC83A392E0EA7426A',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stStars),
};

const stEvmos = {
  name: 'EVMOS → stEVMOS',
  dex: 'Osmosis',
  redemptionKey: 'strideEvmos',
  tokenIn: 'ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A',
  tokenOut: 'ibc/C5579A9595790017C600DD726276D978B9BF314CF82406CE342720A9C7911A01',
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stEvmos),
};

const qAtom = {
  name: 'ATOM → qATOM',
  dex: 'Osmosis',
  redemptionKey: 'qATOM',
  tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  tokenOut: 'ibc/FA602364BEC305A696CBDF987058E99D8B479F0318E47314C49173E8838C5BAC',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, qAtom),
};

const ETHAxlTowstETH = {
  name: 'ETH.axl → wstETH',
  dex: 'Osmosis',
  redemptionKey: 'wstETH',
  tokenIn: 'ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5',
  tokenOut: 'ibc/2F21E6D4271DE3F561F20A02CD541DAF7405B1E9CB3B9B07E3C2AC7D8A4338A5',
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, ETHAxlTowstETH),
};

const wstETHtoETHAxl = {
  name: 'wstETH → ETH.axl',
  dex: 'Osmosis',
  redemptionKey: 'wstETHinv',
  tokenIn: 'ibc/2F21E6D4271DE3F561F20A02CD541DAF7405B1E9CB3B9B07E3C2AC7D8A4338A5',
  tokenOut: 'ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5',
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, wstETHtoETHAxl),
};

const ETHtowstETH = {
  name: 'ETH → wstETH',
  dex: 'Osmosis',
  redemptionKey: 'wstETH',
  tokenIn: 'factory/osmo1k6c8jln7ejuqwtqmay3yvzrg3kueaczl96pk067ldg8u835w0yhsw27twm/alloyed/allETH',
  tokenOut: 'ibc/2F21E6D4271DE3F561F20A02CD541DAF7405B1E9CB3B9B07E3C2AC7D8A4338A5',
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, ETHtowstETH),
};

const wstETHtoETH = {
  name: 'wstETH → ETH',
  dex: 'Osmosis',
  redemptionKey: 'wstETHinv',
  tokenIn: 'ibc/2F21E6D4271DE3F561F20A02CD541DAF7405B1E9CB3B9B07E3C2AC7D8A4338A5',
  tokenOut: 'factory/osmo1k6c8jln7ejuqwtqmay3yvzrg3kueaczl96pk067ldg8u835w0yhsw27twm/alloyed/allETH',
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, wstETHtoETH),
};

const atomTodAtom = {
  name: 'ATOM → dATOM',
  dex: 'Osmosis',
  redemptionKey: 'dATOM',
  tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  tokenOut: 'ibc/C1B4D4804EB8F95FFB75E6395A301F0AD6D7DDE5C3A45571B70E46A368DD353E',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, atomTodAtom),
};

async function simuSwap(tokenInAmount, pairDef) {
  const quote =
    'https://sqsprod.osmosis.zone/router/quote' +
    `?tokenIn=${tokenInAmount}${encodeURIComponent(pairDef.tokenIn)}` +
    `&tokenOutDenom=${encodeURIComponent(pairDef.tokenOut)}`;

  return fetch(quote)
    .then((response) => response.json())
    .then((data) => data.amount_out || 0)
    .catch((e) => {
      console.log(pairDef, 'error fetching osmosis router', e);
      return 0;
    });
}

export const osmoLsds = [
  // ATOM
  stAtom,
  qAtom,
  atomTodAtom,
  // OSMO
  stOsmo,
  qOsmos,
  ampOsmo,
  bOsmo,
  // ETH
  ETHAxlTowstETH,
  wstETHtoETHAxl,
  ETHtowstETH,
  wstETHtoETH,
  // Others
  stJuno,
  stStars,
  stEvmos,
];
