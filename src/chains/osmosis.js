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

  return new Map([
    ['ampOSMO', ampOsmoRedemption],
    ['bOSMO', bOsmoRedemption],
  ]);
}

const ampOsmoWW = {
  name: 'OSMO → ampOSMO',
  dex: 'White Whale Osmosis',
  redemptionKey: 'ampOSMO',
  offerNativeTokenDenom: 'uosmo',
  poolContract: 'osmo1692tluwzzmnx56tm5v7r0n8v5fg32nrd9nuukp9jz458ap7wmcls9cz20m',
};

const bOsmoWW = {
  name: 'OSMO → bOSMO',
  dex: 'White Whale Osmosis',
  redemptionKey: 'bOSMO',
  offerNativeTokenDenom: 'uosmo',
  poolContract: 'osmo166yrd7anjg3h7epjsjghlf2uu403phjflk4gygmlelykwlustwysxvgv4c',
};

const ampOsmoOsmosis = {
  name: 'OSMO → ampOSMO',
  dex: 'Osmosis',
  redemptionKey: 'ampOSMO',
  tokenIn: 'uosmo',
  tokenOut: 'factory/osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9/ampOSMO',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, ampOsmoOsmosis),
};

const bOsmoOsmosis = {
  name: 'OSMO → bOSMO',
  dex: 'Osmosis',
  redemptionKey: 'bOSMO',
  tokenIn: 'uosmo',
  tokenOut: 'factory/osmo1s3l0lcqc7tu0vpj6wdjz9wqpxv8nk6eraevje4fuwkyjnwuy82qsx3lduv/boneOsmo',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, bOsmoOsmosis),
};

const stkOsmos = {
  name: 'OSMO → stkOSMO',
  dex: 'Osmosis',
  redemptionKey: 'stkOSMO',
  tokenIn: 'uosmo',
  tokenOut: 'ibc/ECBE78BF7677320A93E7BA1761D144BCBF0CBC247C290C049655E106FE5DC68E',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stkOsmos),
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

const rAtom = {
  name: 'ATOM → rATOM',
  dex: 'Osmosis',
  redemptionKey: 'rATOM',
  unboundingPeriod: 22,
  tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  tokenOut: 'ibc/B66CE615C600ED0A8B5AF425ECFE0D57BE2377587F66C45934A76886F34DC9B7',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, rAtom),
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

const stkAtom = {
  name: 'ATOM → stkATOM',
  dex: 'Osmosis',
  redemptionKey: 'stkATOM',
  tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  tokenOut: 'ibc/CAA179E40F0266B0B29FB5EAA288FB9212E628822265D4141EBD1C47C3CBFCBC',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stkAtom),
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

const qRegen = {
  name: 'REGEN → qREGEN',
  dex: 'Osmosis',
  redemptionKey: 'qREGEN',
  tokenIn: 'ibc/1DCC8A6CB5689018431323953344A9F6CC4D0BFB261E88C9F7777372C10CD076',
  tokenOut: 'ibc/79A676508A2ECA1021EDDC7BB9CF70CEEC9514C478DA526A5A8B3E78506C2206',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, qRegen),
};

const qStars = {
  name: 'STARS → qSTARS',
  dex: 'Osmosis',
  redemptionKey: 'qSTARS',
  tokenIn: 'ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4',
  tokenOut: 'ibc/46C83BB054E12E189882B5284542DB605D94C99827E367C9192CF0579CD5BC83',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, qStars),
};

const qSomm = {
  name: 'SOMM → qSOMM',
  dex: 'Osmosis',
  redemptionKey: 'qSOMM',
  tokenIn: 'ibc/9BBA9A1C257E971E38C1422780CE6F0B0686F0A3085E2D61118D904BFE0F5F5E',
  tokenOut: 'ibc/EAF76AD1EEF7B16D167D87711FB26ABE881AC7D9F7E6D0CF313D5FA530417208',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, qSomm),
};

const stSomm = {
  name: 'SOMM → stSOMM',
  dex: 'Osmosis',
  redemptionKey: 'strideSomm',
  tokenIn: 'ibc/9BBA9A1C257E971E38C1422780CE6F0B0686F0A3085E2D61118D904BFE0F5F5E',
  tokenOut: 'ibc/5A0060579D24FBE5268BEA74C3281E7FE533D361C41A99307B4998FEC611E46B',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stSomm),
};

async function simuSwap(tokenInAmount, pairDef) {
  const quote =
    'https://sqsprod.osmosis.zone/router/quote' +
    `?tokenIn=${tokenInAmount}${encodeURIComponent(pairDef.tokenIn)}` +
    `&tokenOutDenom=${encodeURIComponent(pairDef.tokenOut)}`;

  return fetch(quote)
    .then((response) => response.json())
    .then((data) => data.amount_out);
}

export const osmoLsds = [
  stAtom,
  rAtom,
  stOsmo,
  stkOsmos,
  qOsmos,
  stJuno,
  stStars,
  ampOsmoWW,
  ampOsmoOsmosis,
  bOsmoOsmosis,
  bOsmoWW,
  stkAtom,
  stEvmos,
  qAtom,
  qRegen,
  qStars,
  qSomm,
  stSomm,
];
