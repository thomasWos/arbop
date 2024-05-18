import { exchangeRateFromState } from '../utils.js';

const ampWhaleContract = 'migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4';
const bWhaleContract = 'migaloo1mf6ptkssddfmxvhdx0ech0k03ktp6kf9yk59renau2gvht3nq2gqdhts4u';
const ampWhaleTContract = 'terra1j35ta0llaxcf55auv2cjqau5a7aee6g8fz7md7my7005cvh23jfsaw83dy';
const bWhaleTContract = 'terra10j3zrymfrkta2pxe0gklc79gu06tqyuy8c3kh6tqdsrrprsjqkrqzfl4df';

export async function migalooRedemptionMap() {
  const ampWhaleRate = await exchangeRateFromState(ampWhaleContract);
  const bWhaleRate = await exchangeRateFromState(bWhaleContract);
  const bWhaleTRate = await exchangeRateFromState(bWhaleTContract);
  const ampWhaleTRate = await exchangeRateFromState(ampWhaleTContract);

  return new Map([
    ['ampWHALE', ampWhaleRate],
    ['ampWHALEtoWHALE', 1 / ampWhaleRate],
    ['bWHALE', bWhaleRate],
    ['bWHALEtoWHALE', 1 / bWhaleRate],
    ['ampWHALEt', ampWhaleTRate],
    ['ampWHALEtToAmpWHALE', 1 / ampWhaleTRate],
    ['bWHALEt', bWhaleTRate],
    ['bWHALEtTobWHALE', 1 / bWhaleTRate],
  ]);
}

const ampWhaleMigaloo = {
  name: 'WHALE → ampWHALE',
  dex: 'White Whale Migaloo',
  redemptionKey: 'ampWHALE',
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'uwhale',
  poolContract: 'migaloo1ull9s4el2pmkdevdgrjt6pwa4e5xhkda40w84kghftnlxg4h3knqpm5u3n',
};

const ampWhaleTerra = {
  name: 'WHALE → ampWHALE',
  dex: 'White Whale Terra',
  redemptionKey: 'ampWHALE',
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'ibc/36A02FFC4E74DF4F64305130C3DFA1B06BEAC775648927AA44467C76A77AB8DB',
  poolContract: 'terra1ntx595elf3ukxcd0wy76h24rzztcv2p6n3wmfd358ks95prv42fs9mn63n',
};

const ampWhaleToWhaleTerra = {
  name: 'ampWHALE → WHALE',
  dex: 'White Whale Terra',
  redemptionKey: 'ampWHALEtoWHALE',
  offerNativeTokenDenom: 'ibc/B3F639855EE7478750CC8F82072307ED6E131A8EFF20345E1D136B50C4E5EC36',
  poolContract: 'terra1ntx595elf3ukxcd0wy76h24rzztcv2p6n3wmfd358ks95prv42fs9mn63n',
};

const ampWhaleT = {
  name: 'ampWHALE → ampWHALEt',
  dex: 'White Whale Migaloo',
  redemptionKey: 'ampWHALEt',
  offerNativeTokenDenom: 'factory/migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4/ampWHALE',
  poolContract: 'migaloo1ugv3g8lckm70np3u50u5wetnv2dfda073gyazy2v50t5c3wza3xqj5drtk',
};

const ampWhaleTToAmpWhale = {
  name: 'ampWHALEt → ampWHALE',
  dex: 'White Whale Migaloo',
  redemptionKey: 'ampWHALEtToAmpWHALE',
  offerNativeTokenDenom: 'ibc/EA459CE57199098BA5FFDBD3194F498AA78439328A92C7D136F06A5220903DA6',
  poolContract: 'migaloo1ugv3g8lckm70np3u50u5wetnv2dfda073gyazy2v50t5c3wza3xqj5drtk',
};

const bWhale = {
  name: 'WHALE → bWHALE',
  dex: 'White Whale Migaloo',
  redemptionKey: 'bWHALE',
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'uwhale',
  poolContract: 'migaloo1dg5jrt89nddtymjx5pzrvdvdt0m4zl3l2l3ytunl6a0kqd7k8hss594wy6',
};

const bWhaleTerra = {
  name: 'WHALE → bWHALE',
  dex: 'White Whale Terra',
  redemptionKey: 'bWHALE',
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'ibc/36A02FFC4E74DF4F64305130C3DFA1B06BEAC775648927AA44467C76A77AB8DB',
  poolContract: 'terra1j9jmsplecj9ay2py27953p84nfmv7f6ce75ms5fleyhd0aecpc7q0hgmsa',
};

const bWhaleToWhaleTerra = {
  name: 'bWHALE → WHALE',
  dex: 'White Whale Terra',
  redemptionKey: 'bWHALEtoWHALE',
  offerNativeTokenDenom: 'ibc/517E13F14A1245D4DE8CF467ADD4DA0058974CDCC880FA6AE536DBCA1D16D84E',
  poolContract: 'terra1j9jmsplecj9ay2py27953p84nfmv7f6ce75ms5fleyhd0aecpc7q0hgmsa',
};

const bWhaleT = {
  name: 'bWHALE → bWHALEt',
  dex: 'White Whale Migaloo',
  redemptionKey: 'bWHALEt',
  offerNativeTokenDenom: 'factory/migaloo1mf6ptkssddfmxvhdx0ech0k03ktp6kf9yk59renau2gvht3nq2gqdhts4u/boneWhale',
  poolContract: 'migaloo1azqqmeg7zcj9vdtqpc65dmr2fkmkf3x6dcyhnau6d6er0w2r3arq470dzj',
};

const bWhaleTToWhale = {
  name: 'bWHALEt → bWHALE',
  dex: 'White Whale Migaloo',
  redemptionKey: 'bWHALEtTobWHALE',
  offerNativeTokenDenom: 'ibc/E54A0C1E4A2A79FD4F92765F68E38939867C3DA36E2EA6BBB2CE81C43F4C8ADC',
  poolContract: 'migaloo1azqqmeg7zcj9vdtqpc65dmr2fkmkf3x6dcyhnau6d6er0w2r3arq470dzj',
};

export const whaleLsds = [
  ampWhaleMigaloo,
  ampWhaleTerra,
  ampWhaleToWhaleTerra,
  ampWhaleT,
  ampWhaleTToAmpWhale,
  bWhale,
  bWhaleTerra,
  bWhaleToWhaleTerra,
  bWhaleT,
  bWhaleTToWhale,
];
