const ampOsmoWW = {
  name: 'OSMO → ampOSMO',
  dex: 'White Whale Osmosis',
  stakingContract: {
    contract: 'osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9',
    exchangeRate: (data) => data.exchange_rate,
  },
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
  osmosis: {
    tokenIn: 'uosmo',
    tokenOut: 'factory/osmo1dv8wz09tckslr2wy5z86r46dxvegylhpt97r9yd6qc3kyc6tv42qa89dr9/ampOSMO',
  },
};

export const osmoLsds = [ampOsmoWW, ampOsmoOsmosis];
