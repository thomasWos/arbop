const ampOsmoWW = {
  name: 'OSMO → ampOSMO',
  dex: 'White Whale Osmosis',
  stakingContract: {
    contract: 'osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9',
    exchangeRate: (data) => data.exchange_rate,
  },
  unboundingPeriod: 14 + 2,
  offerNativeTokenDenom: 'uosmo',
  poolContract: 'osmo1692tluwzzmnx56tm5v7r0n8v5fg32nrd9nuukp9jz458ap7wmcls9cz20m',
};

const ampOsmoOsmosis = {
  name: 'OSMO → ampOSMO',
  dex: 'Osmosis',
  stakingContract: {
    contract: 'osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9',
    exchangeRate: (data) => data.exchange_rate,
  },
  unboundingPeriod: 14 + 2,
  osmosis: {
    tokenIn: 'uosmo',
    tokenOut: 'factory/osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9/ampOSMO',
  },
};

const bOsmoWW = {
  name: 'OSMO → bOSMO',
  dex: 'White Whale Osmosis',
  stakingContract: {
    contract: 'osmo1s3l0lcqc7tu0vpj6wdjz9wqpxv8nk6eraevje4fuwkyjnwuy82qsx3lduv',
    exchangeRate: (data) => data.exchange_rate,
  },
  unboundingPeriod: 14 + 3,
  offerNativeTokenDenom: 'uosmo',
  poolContract: 'osmo166yrd7anjg3h7epjsjghlf2uu403phjflk4gygmlelykwlustwysxvgv4c',
};

const stkOsmos = {
  name: 'OSMO → stkOSMO',
  dex: 'Osmosis',
  redemptionKey: 'stkOSMO',
  osmosis: {
    tokenIn: 'uosmo',
    tokenOut: 'ibc/ECBE78BF7677320A93E7BA1761D144BCBF0CBC247C290C049655E106FE5DC68E',
  },
};

const stAtom = {
  name: 'ATOM → stATOM',
  dex: 'Osmosis',
  redemptionKey: 'strideCosmos',
  osmosis: {
    tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
    tokenOut: 'ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901',
  },
};

const rAtom = {
  name: 'ATOM → rATOM',
  dex: 'Osmosis',
  redemptionKey: 'rATOM',
  unboundingPeriod: 22,
  osmosis: {
    tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
    tokenOut: 'ibc/B66CE615C600ED0A8B5AF425ECFE0D57BE2377587F66C45934A76886F34DC9B7',
  },
};

const stOsmo = {
  name: 'OSMO → stOsmo',
  dex: 'Osmosis',
  redemptionKey: 'strideOsmo',
  osmosis: {
    tokenIn: 'uosmo',
    tokenOut: 'ibc/D176154B0C63D1F9C6DCFB4F70349EBF2E2B5A87A05902F57A6AE92B863E9AEC',
  },
};

const stJuno = {
  name: 'JUNO → stJUNO',
  dex: 'Osmosis',
  redemptionKey: 'strideJuno',
  osmosis: {
    tokenIn: 'ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED',
    tokenOut: 'ibc/84502A75BCA4A5F68D464C00B3F610CE2585847D59B52E5FFB7C3C9D2DDCD3FE',
  },
};

const stStars = {
  name: 'STARS → stSTARS',
  dex: 'Osmosis',
  redemptionKey: 'strideStars',
  osmosis: {
    tokenIn: 'ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4',
    tokenOut: 'ibc/5DD1F95ED336014D00CE2520977EC71566D282F9749170ADC83A392E0EA7426A',
  },
};

const stkAtom = {
  name: 'ATOM → stkATOM',
  dex: 'Osmosis',
  redemptionKey: 'stkATOM',
  osmosis: {
    tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
    tokenOut: 'ibc/CAA179E40F0266B0B29FB5EAA288FB9212E628822265D4141EBD1C47C3CBFCBC',
  },
};

export const osmoLsds = [stAtom, rAtom, stOsmo, stkOsmos, stJuno, stStars, ampOsmoWW, ampOsmoOsmosis, bOsmoWW, stkAtom];
