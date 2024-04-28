export const ampWhaleMigaloo = {
  name: 'WHALE → ampWHALE',
  dex: 'White Whale Migaloo',
  stakingContract: {
    contract: 'migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'uwhale',
  poolContract: 'migaloo1ull9s4el2pmkdevdgrjt6pwa4e5xhkda40w84kghftnlxg4h3knqpm5u3n',
};

export const ampWhaleTerra = {
  name: 'WHALE → ampWHALE',
  dex: 'White Whale Terra',
  stakingContract: {
    contract: 'migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'ibc/36A02FFC4E74DF4F64305130C3DFA1B06BEAC775648927AA44467C76A77AB8DB',
  poolContract: 'terra1ntx595elf3ukxcd0wy76h24rzztcv2p6n3wmfd358ks95prv42fs9mn63n',
};
