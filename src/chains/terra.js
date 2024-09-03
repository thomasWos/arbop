import { exchangeRateFromState, queryState } from '../utils.js';

const lunaXContract = 'terra179e90rqspswfzmhdl25tg22he0fcefwndgzc957ncx9dleduu7ms3evpuk';
const bLunaContract = 'terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea';
const ampLunaContract = 'terra10788fkzah89xrdm27zkj5yvhj9x3494lxawzm5qq3vvxcqz2yzaqyd3enk';
const moarStakingContract = 'terra1dndhtdr2v7ca8rrn67chlqw3cl3xhm3m2uxls62vghcg3fsh5tpss5xmcu';
const ampRoarStackingContract = 'terra1vklefn7n6cchn0u962w3gaszr4vf52wjvd4y95t2sydwpmpdtszsqvk9wy';
const cLunaContract = 'terra188mmw2vsp0yahen3vh2clup543qrttvdzkxl0h9myfuwjj56nausztpegt';

export async function terraRedemptionMap() {
  const lunaXredemption = {
    redemptionRate: await queryState(lunaXContract).then((data) => parseFloat(data.state.exchange_rate)),
    unboundingPeriod: 21 + 3,
  };

  const bLunaRedemption = {
    redemptionRate: await exchangeRateFromState(bLunaContract),
    unboundingPeriod: 21 + 3,
  };

  const ampLunaRedemption = {
    redemptionRate: await exchangeRateFromState(ampLunaContract),
    unboundingPeriod: 21 + 3,
  };

  const cLunaRedemption = {
    redemptionRate: await exchangeRateFromState(cLunaContract),
    unboundingPeriod: 21 + 3,
  };

  const moarRate = await exchangeRateFromState(moarStakingContract);
  const ampRoarRate = await exchangeRateFromState(ampRoarStackingContract);
  const roarToMoar = moarRate * ampRoarRate;

  const ampRoarRedemption = {
    redemptionRate: ampRoarRate,
    unboundingPeriod: 7 + 1,
  };

  const roarToMoarRedemption = {
    redemptionRate: roarToMoar,
    unboundingPeriod: 21 + 3 + 7 + 1,
  };

  return [
    ['LunaX', lunaXredemption],
    ['bLUNA', bLunaRedemption],
    ['ampLUNA', ampLunaRedemption],
    ['cLUNA', cLunaRedemption],
    ['ampROAR', ampRoarRedemption],
    ['ROARtoMOAR', roarToMoarRedemption],
  ];
}

const lunaX = {
  name: 'LUNA → LunaX',
  dex: 'Astroport Terra',
  redemptionKey: 'LunaX',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1mpj7j25fw5a0q5vfasvsvdp6xytaqxh006lh6f5zpwxvadem9hwsy6m508',
};

const blunaAstro = {
  name: 'LUNA → bLUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'bLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1h32epkd72x7st0wk49z35qlpsxf26pw4ydacs8acq6uka7hgshmq7z7vl9',
};

const cLuna = {
  name: 'LUNA → cLUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'cLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1pxm9qtnrchzy90d99clpa0rkx8fyztlc67wt5t999pc8yvsrx90snpfe4v',
};

const blunaWw = {
  name: 'LUNA → bLUNA',
  dex: 'White Whale Terra',
  redemptionKey: 'bLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1j5znhs9jeyty9u9jcagl3vefkvzwqp6u9tq9a3e5qrz4gmj2udyqp0z0xc',
};

const ampLunaAstro = {
  name: 'LUNA → ampLUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'ampLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1cr8dg06sh343hh4xzn3gxd3ayetsjtet7q5gp4kfrewul2kql8sqvhaey4',
};

const ampLunaWw = {
  name: 'LUNA → ampLUNA',
  dex: 'White Whale Terra',
  redemptionKey: 'ampLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1tsx0dmasjvd45k6tdywzv77d5t9k3lpzyuleavuah77pg3lwm9cq4469pm',
};

const ampLunaPcl = {
  name: 'LUNA → ampLUNA pcl',
  dex: 'Astroport Terra',
  redemptionKey: 'ampLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1cupwgntu082ypw2ztgtxfzcenexcu6ggp5zzunn3yzfwgrvdcclqgjrjqg',
};

const stLuna = {
  name: 'LUNA → stLUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'strideTerra',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1re0yj0j6e9v2szg7kp02ut6u8jjea586t6pnpq6628wl36fphtpqwt6l7p',
};

const stLunaWW = {
  name: 'LUNA → stLUNA',
  dex: 'White Whale Terra',
  redemptionKey: 'strideTerra',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra12exvyhctk6ggqvzj2tlhsv769llctntf5zdj9erz6q2uq4h8hn8q5k5xpg',
};

const moar = {
  name: 'ROAR → MOAR',
  dex: 'White Whale Terra',
  redemptionKey: 'ROARtoMOAR',
  offerTokenAddr: 'terra1lxx40s29qvkrcj8fsa3yzyehy7w50umdvvnls2r830rys6lu2zns63eelv',
  poolContract: 'terra1j0ackj0wru4ndj74e3mhhq6rffe63y8xd0e56spqcjygv2r0cfsqxr36k6',
};

const moarToRoar = {
  name: 'MOAR → ROAR',
  dex: 'White Whale Terra',
  redemptionKey: 'ROARtoMOARinv',
  offerNativeTokenDenom: 'factory/terra1dndhtdr2v7ca8rrn67chlqw3cl3xhm3m2uxls62vghcg3fsh5tpss5xmcu/MOAR',
  poolContract: 'terra1j0ackj0wru4ndj74e3mhhq6rffe63y8xd0e56spqcjygv2r0cfsqxr36k6',
};

const ampRoar = {
  name: 'ROAR → ampROAR',
  dex: 'White Whale Terra',
  redemptionKey: 'ampROAR',
  offerTokenAddr: 'terra1lxx40s29qvkrcj8fsa3yzyehy7w50umdvvnls2r830rys6lu2zns63eelv',
  poolContract: 'terra1d8ap3zyd6tfnruuuwvs0t927lr4zwptruhulfwnxjpqzudvyn8usfgl8ze',
};

const ampRoarInv = {
  name: 'ampROAR → ROAR',
  dex: 'White Whale Terra',
  redemptionKey: 'ampROARinv',
  offerNativeTokenDenom: 'factory/terra1vklefn7n6cchn0u962w3gaszr4vf52wjvd4y95t2sydwpmpdtszsqvk9wy/ampROAR',
  poolContract: 'terra1d8ap3zyd6tfnruuuwvs0t927lr4zwptruhulfwnxjpqzudvyn8usfgl8ze',
};

export const terraLsds = [
  lunaX,
  cLuna,
  blunaAstro,
  blunaWw,
  ampLunaAstro,
  ampLunaWw,
  stLuna,
  stLunaWW,
  ampRoar,
  moar,
  moarToRoar,
  ampRoarInv,
  ampLunaPcl,
];
