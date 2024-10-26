import { exchangeRateFromState } from '../utils.js';

const ampWhaleContract = 'migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4';
const bWhaleContract = 'migaloo1mf6ptkssddfmxvhdx0ech0k03ktp6kf9yk59renau2gvht3nq2gqdhts4u';
const ampWhaleTContract = 'terra1j35ta0llaxcf55auv2cjqau5a7aee6g8fz7md7my7005cvh23jfsaw83dy';
const bWhaleTContract = 'terra10j3zrymfrkta2pxe0gklc79gu06tqyuy8c3kh6tqdsrrprsjqkrqzfl4df';
const arbWhaleContract = 'migaloo1ey4sn2mkmhew4pdrzk90l9acluvas25qlhuvsfgssw42ugz8yjlqx92j9l';

export async function migalooRedemptionMap() {
  const ampWhaleRate = await exchangeRateFromState(ampWhaleContract);
  const ampWhaleRedemption = {
    redemptionRate: ampWhaleRate,
    unboundingPeriod: 21 + 3,
  };

  const bWhaleRate = await exchangeRateFromState(bWhaleContract);
  const bWhaleTRate = await exchangeRateFromState(bWhaleTContract);
  const ampWhaleTRate = await exchangeRateFromState(ampWhaleTContract);
  const arbWhaleRate = await exchangeRateFromState(arbWhaleContract);

  return [
    ['ampWHALE', ampWhaleRedemption],
    ['bWHALE', bWhaleRate],
    ['ampWHALEt', ampWhaleTRate],
    ['bWHALEt', bWhaleTRate],
    ['arbWHALE', arbWhaleRate],
  ];
}

const ampWhaleMigaloo = {
  name: 'WHALE → ampWHALE',
  dex: 'White Whale Migaloo',
  redemptionKey: 'ampWHALE',
  offerNativeTokenDenom: 'uwhale',
  poolContract: 'migaloo1ull9s4el2pmkdevdgrjt6pwa4e5xhkda40w84kghftnlxg4h3knqpm5u3n',
};

const ampWhaleInvMigaloo = {
  name: 'ampWHALE → WHALE',
  dex: 'White Whale Migaloo',
  redemptionKey: 'ampWHALEinv',
  offerNativeTokenDenom: 'factory/migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4/ampWHALE',
  poolContract: 'migaloo1ull9s4el2pmkdevdgrjt6pwa4e5xhkda40w84kghftnlxg4h3knqpm5u3n',
};

const ampWhaleT = {
  name: 'ampWHALE → ampWHALEt',
  dex: 'White Whale Migaloo',
  redemptionKey: 'ampWHALEt',
  offerNativeTokenDenom: 'factory/migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4/ampWHALE',
  poolContract: 'migaloo1ugv3g8lckm70np3u50u5wetnv2dfda073gyazy2v50t5c3wza3xqj5drtk',
};

const ampWhaleTInvWhale = {
  name: 'ampWHALEt → ampWHALE',
  dex: 'White Whale Migaloo',
  redemptionKey: 'ampWHALEtinv',
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

const bWhaleInv = {
  name: 'bWHALE → WHALE',
  dex: 'White Whale Migaloo',
  redemptionKey: 'bWHALEinv',
  offerNativeTokenDenom: 'factory/migaloo1mf6ptkssddfmxvhdx0ech0k03ktp6kf9yk59renau2gvht3nq2gqdhts4u/boneWhale',
  poolContract: 'migaloo1dg5jrt89nddtymjx5pzrvdvdt0m4zl3l2l3ytunl6a0kqd7k8hss594wy6',
};

const bWhaleT = {
  name: 'bWHALE → bWHALEt',
  dex: 'White Whale Migaloo',
  redemptionKey: 'bWHALEt',
  offerNativeTokenDenom: 'factory/migaloo1mf6ptkssddfmxvhdx0ech0k03ktp6kf9yk59renau2gvht3nq2gqdhts4u/boneWhale',
  poolContract: 'migaloo1azqqmeg7zcj9vdtqpc65dmr2fkmkf3x6dcyhnau6d6er0w2r3arq470dzj',
};

const bWhaleTInv = {
  name: 'bWHALEt → bWHALE',
  dex: 'White Whale Migaloo',
  redemptionKey: 'bWHALEtinv',
  offerNativeTokenDenom: 'ibc/E54A0C1E4A2A79FD4F92765F68E38939867C3DA36E2EA6BBB2CE81C43F4C8ADC',
  poolContract: 'migaloo1azqqmeg7zcj9vdtqpc65dmr2fkmkf3x6dcyhnau6d6er0w2r3arq470dzj',
};

const ampWhaleToArbWhale = {
  name: 'ampWHALE → arbWHALE',
  dex: 'White Whale Migaloo',
  offerRedemptionKey: 'ampWHALE',
  redemptionKey: 'arbWHALE',
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'factory/migaloo1436kxs0w2es6xlqpp9rd35e3d0cjnw4sv8j3a7483sgks29jqwgshqdky4/ampWHALE',
  poolContract: 'migaloo12z46dq46hprpyv8j4k7xtqk8gdx7leqzgan2pjpdaktx4ukj53lqar6tsf',
};

export const whaleLsds = [
  ampWhaleMigaloo,
  ampWhaleInvMigaloo,
  ampWhaleT,
  ampWhaleTInvWhale,
  bWhale,
  bWhaleInv,
  bWhaleT,
  bWhaleTInv,
  ampWhaleToArbWhale,
];
