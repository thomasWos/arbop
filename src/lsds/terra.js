const lunaX = {
  name: 'LUNA → LunaX',
  dex: 'Astroport Terra',
  stakingContract: {
    contract: 'terra179e90rqspswfzmhdl25tg22he0fcefwndgzc957ncx9dleduu7ms3evpuk',
    exchangeRate: (data) => data.state.exchange_rate,
  },
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1mpj7j25fw5a0q5vfasvsvdp6xytaqxh006lh6f5zpwxvadem9hwsy6m508',
};

const blunaAstro = {
  name: 'LUNA → bLUNA',
  dex: 'Astroport Terra',
  stakingContract: {
    contract: 'terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea',
    exchangeRate: (data) => data.exchange_rate,
  },
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1h32epkd72x7st0wk49z35qlpsxf26pw4ydacs8acq6uka7hgshmq7z7vl9',
};

const blunaWw = {
  name: 'LUNA → bLUNA',
  dex: 'White Whale Terra',
  stakingContract: {
    contract: 'terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea',
    exchangeRate: (data) => data.exchange_rate,
  },
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1j5znhs9jeyty9u9jcagl3vefkvzwqp6u9tq9a3e5qrz4gmj2udyqp0z0xc',
};

const ampLunaAstro = {
  name: 'LUNA → ampLUNA',
  dex: 'Astroport Terra',
  stakingContract: {
    contract: 'terra10788fkzah89xrdm27zkj5yvhj9x3494lxawzm5qq3vvxcqz2yzaqyd3enk',
    exchangeRate: (data) => data.exchange_rate,
  },
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1cr8dg06sh343hh4xzn3gxd3ayetsjtet7q5gp4kfrewul2kql8sqvhaey4',
};

const ampLunaWw = {
  name: 'LUNA → ampLUNA',
  dex: 'White Whale Terra',
  stakingContract: {
    contract: 'terra10788fkzah89xrdm27zkj5yvhj9x3494lxawzm5qq3vvxcqz2yzaqyd3enk',
    exchangeRate: (data) => data.exchange_rate,
  },
  unboundingPeriod: 21 + 3,
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1tsx0dmasjvd45k6tdywzv77d5t9k3lpzyuleavuah77pg3lwm9cq4469pm',
};

const stLuna = {
  name: 'LUNA → stLUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'strideTerra',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1re0yj0j6e9v2szg7kp02ut6u8jjea586t6pnpq6628wl36fphtpqwt6l7p',
};

const moar = {
  name: 'ROAR → MOAR',
  dex: 'White Whale Terra',
  redemptionKey: 'MOAR',
  unboundingPeriod: 21 + 3 + 7 + 1,
  offerTokenAddr: 'terra1lxx40s29qvkrcj8fsa3yzyehy7w50umdvvnls2r830rys6lu2zns63eelv',
  poolContract: 'terra1j0ackj0wru4ndj74e3mhhq6rffe63y8xd0e56spqcjygv2r0cfsqxr36k6',
};

const moarToRoar = {
  name: 'MOAR → ROAR',
  dex: 'White Whale Terra',
  redemptionKey: 'MOARtoROAR',
  offerNativeTokenDenom: 'factory/terra1dndhtdr2v7ca8rrn67chlqw3cl3xhm3m2uxls62vghcg3fsh5tpss5xmcu/MOAR',
  poolContract: 'terra1j0ackj0wru4ndj74e3mhhq6rffe63y8xd0e56spqcjygv2r0cfsqxr36k6',
};

export const terraLsds = [lunaX, blunaAstro, blunaWw, ampLunaAstro, ampLunaWw, stLuna, moar, moarToRoar];
