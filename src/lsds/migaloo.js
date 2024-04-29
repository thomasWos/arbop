const ampWhaleMigaloo = {
  name: 'WHALE → ampWHALE',
  dex: 'White Whale Migaloo',
  stakingContract: {
    contract: 'migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'uwhale',
  poolContract: 'migaloo1ull9s4el2pmkdevdgrjt6pwa4e5xhkda40w84kghftnlxg4h3knqpm5u3n',
};

const ampWhaleTerra = {
  name: 'WHALE → ampWHALE',
  dex: 'White Whale Terra',
  stakingContract: {
    contract: 'migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'ibc/36A02FFC4E74DF4F64305130C3DFA1B06BEAC775648927AA44467C76A77AB8DB',
  poolContract: 'terra1ntx595elf3ukxcd0wy76h24rzztcv2p6n3wmfd358ks95prv42fs9mn63n',
};

const ampWhaleT = {
  name: 'ampWHALE → ampWHALEt',
  dex: 'White Whale Migaloo',
  stakingContract: {
    contract: 'terra1j35ta0llaxcf55auv2cjqau5a7aee6g8fz7md7my7005cvh23jfsaw83dy',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'factory/migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4/ampWHALE',
  poolContract: 'migaloo1ugv3g8lckm70np3u50u5wetnv2dfda073gyazy2v50t5c3wza3xqj5drtk',
};

const bonewhaleT = {
  name: 'bWHALE → bWHALEt',
  dex: 'White Whale Migaloo',
  stakingContract: {
    contract: 'terra10j3zrymfrkta2pxe0gklc79gu06tqyuy8c3kh6tqdsrrprsjqkrqzfl4df',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'factory/migaloo1mf6ptkssddfmxvhdx0ech0k03ktp6kf9yk59renau2gvht3nq2gqdhts4u/boneWhale',
  poolContract: 'migaloo1azqqmeg7zcj9vdtqpc65dmr2fkmkf3x6dcyhnau6d6er0w2r3arq470dzj',
};

export const whaleLsds = [ampWhaleMigaloo, ampWhaleTerra, ampWhaleT, bonewhaleT];
