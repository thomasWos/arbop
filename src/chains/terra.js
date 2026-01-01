import { exchangeRateFromState, queryState, queryContract } from '../utils.js';

const lunaXContract = 'terra179e90rqspswfzmhdl25tg22he0fcefwndgzc957ncx9dleduu7ms3evpuk';
const bLunaContract = 'terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea';
const ampLunaContract = 'terra10788fkzah89xrdm27zkj5yvhj9x3494lxawzm5qq3vvxcqz2yzaqyd3enk';
const ampRoarStackingContract = 'terra1vklefn7n6cchn0u962w3gaszr4vf52wjvd4y95t2sydwpmpdtszsqvk9wy';
const cLunaContract = 'terra188mmw2vsp0yahen3vh2clup543qrttvdzkxl0h9myfuwjj56nausztpegt';
const arbLunaContract = 'terra1r9gls56glvuc4jedsvc3uwh6vj95mqm9efc7hnweqxa2nlme5cyqxygy5m';
const credaContract = 'terra1y6hfmr3lxxj6srduhlfz96x7sga2984pr757a0nrfuqxa9rqxapqcjv4zz';

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

  const ampRoarRate = await exchangeRateFromState(ampRoarStackingContract);

  const ampRoarRedemption = {
    redemptionRate: ampRoarRate,
    unboundingPeriod: 7 + 1,
  };

  const arbLunaRedemption = {
    redemptionRate: await exchangeRateFromState(arbLunaContract),
    unboundingPeriod: 25,
  };

  return [
    ['LunaX', lunaXredemption],
    ['bLUNA', bLunaRedemption],
    ['ampLUNA', ampLunaRedemption],
    ['cLUNAt', cLunaRedemption],
    ['ampROAR', ampRoarRedemption],
    ['arbLUNA', arbLunaRedemption],
  ];
}

export async function terraLendingSupply() {
  return queryContract(credaContract, {
    metric: {
      asset_info: {
        native: 'uluna',
      },
    },
  })
    .then((r) => parseFloat(r.asset.supply_apy) * 100)
    .then((apy) => ({
      name: 'LUNA Creda',
      arb: apy,
      dex: 'Creda',
      apy: apy,
      dexUrl: 'https://exclusive.creda.finance?ref=thomas',
    }));
}

const lunaXAstro = {
  name: 'LUNA → LunaX',
  dex: 'Astroport Terra',
  redemptionKey: 'LunaX',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1mpj7j25fw5a0q5vfasvsvdp6xytaqxh006lh6f5zpwxvadem9hwsy6m508',
};

const lunaXTerraSwap = {
  name: 'LUNA → LunaX',
  dex: 'Terra Swap',
  redemptionKey: 'LunaX',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1h3wqh8fdsd8rr6rlz3yfp9sm8849wrec8vqsmkwksx0ndkqaxkjqellq28',
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
  redemptionKey: 'cLUNAt',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1pxm9qtnrchzy90d99clpa0rkx8fyztlc67wt5t999pc8yvsrx90snpfe4v',
  dexUrl: 'https://app.astroport.fi/swap?chain=terra&to=terra13eekqp0zgj55arjuacpxqxzgqy2uydf5wzzqns9ddgpepj377afqflunf3',
};

const cLunaInv = {
  name: 'cLUNA → LUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'cLUNAtinv',
  offerTokenAddr: 'terra13eekqp0zgj55arjuacpxqxzgqy2uydf5wzzqns9ddgpepj377afqflunf3',
  poolContract: 'terra1pxm9qtnrchzy90d99clpa0rkx8fyztlc67wt5t999pc8yvsrx90snpfe4v',
};

const blunaSkeletonSwap = {
  name: 'LUNA → bLUNA',
  dex: 'Skeleton Swap Terra',
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

const ampLunaSkeletonSwap = {
  name: 'LUNA → ampLUNA',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'ampLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1tsx0dmasjvd45k6tdywzv77d5t9k3lpzyuleavuah77pg3lwm9cq4469pm',
};

const ampLunaSkeletonSwapInv = {
  name: 'ampLUNA → LUNA',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'ampLUNAinv',
  offerTokenAddr: 'terra1ecgazyd0waaj3g7l9cmy5gulhxkps2gmxu9ghducvuypjq68mq2s5lvsct',
  poolContract: 'terra1tsx0dmasjvd45k6tdywzv77d5t9k3lpzyuleavuah77pg3lwm9cq4469pm',
};

const ampLunaPcl = {
  name: 'LUNA → ampLUNA pcl',
  dex: 'Astroport Terra',
  redemptionKey: 'ampLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1cupwgntu082ypw2ztgtxfzcenexcu6ggp5zzunn3yzfwgrvdcclqgjrjqg',
};

const lunaToAmpLunaPcl = {
  name: 'ampLUNA  → LUNA pcl',
  dex: 'Astroport Terra',
  redemptionKey: 'ampLUNAinv',
  offerTokenAddr: 'terra1ecgazyd0waaj3g7l9cmy5gulhxkps2gmxu9ghducvuypjq68mq2s5lvsct',
  poolContract: 'terra1cupwgntu082ypw2ztgtxfzcenexcu6ggp5zzunn3yzfwgrvdcclqgjrjqg',
};

const ampLunaTs = {
  name: 'LUNA → ampLUNA',
  dex: 'Terra Swap',
  redemptionKey: 'ampLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1ccxwgew8aup6fysd7eafjzjz6hw89n40h273sgu3pl4lxrajnk5st2hvfh',
};

const ampLunaToLunaTs = {
  name: 'ampLUNA → LUNA',
  dex: 'Terra Swap',
  redemptionKey: 'ampLUNAinv',
  offerTokenAddr: 'terra1ecgazyd0waaj3g7l9cmy5gulhxkps2gmxu9ghducvuypjq68mq2s5lvsct',
  poolContract: 'terra1ccxwgew8aup6fysd7eafjzjz6hw89n40h273sgu3pl4lxrajnk5st2hvfh',
};

const stLuna = {
  name: 'LUNA → stLUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'strideTerra',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1re0yj0j6e9v2szg7kp02ut6u8jjea586t6pnpq6628wl36fphtpqwt6l7p',
};

const stLunaSkeletonSwap = {
  name: 'LUNA → stLUNA',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'strideTerra',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra12exvyhctk6ggqvzj2tlhsv769llctntf5zdj9erz6q2uq4h8hn8q5k5xpg',
};

// ROAR
const ampRoar = {
  name: 'ROAR → ampROAR',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'ampROAR',
  offerTokenAddr: 'terra1lxx40s29qvkrcj8fsa3yzyehy7w50umdvvnls2r830rys6lu2zns63eelv',
  poolContract: 'terra1d8ap3zyd6tfnruuuwvs0t927lr4zwptruhulfwnxjpqzudvyn8usfgl8ze',
};

const ampRoarInv = {
  name: 'ampROAR → ROAR',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'ampROARinv',
  offerNativeTokenDenom: 'factory/terra1vklefn7n6cchn0u962w3gaszr4vf52wjvd4y95t2sydwpmpdtszsqvk9wy/ampROAR',
  poolContract: 'terra1d8ap3zyd6tfnruuuwvs0t927lr4zwptruhulfwnxjpqzudvyn8usfgl8ze',
};

const ampRoarAstro = {
  name: 'ROAR → ampROAR',
  dex: 'Astroport Terra',
  redemptionKey: 'ampROAR',
  offerTokenAddr: 'terra1lxx40s29qvkrcj8fsa3yzyehy7w50umdvvnls2r830rys6lu2zns63eelv',
  poolContract: 'terra1tkj3j48d0xrh932szzsap3w8htfv3gmj2zld06an2kp90xzq5kzqvtjwfl',
};

const ampRoarAstroInv = {
  name: 'ampROAR → ROAR',
  dex: 'Astroport Terra',
  redemptionKey: 'ampROARinv',
  offerNativeTokenDenom: 'factory/terra1vklefn7n6cchn0u962w3gaszr4vf52wjvd4y95t2sydwpmpdtszsqvk9wy/ampROAR',
  poolContract: 'terra1tkj3j48d0xrh932szzsap3w8htfv3gmj2zld06an2kp90xzq5kzqvtjwfl',
};

const wETHwstETH = {
  name: 'wETH → wstETH',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'wstETH',
  offerTokenAddr: 'terra15hhqg8gyz04zapynqtk7uvlsp7lzay7etrt9ann0276v94yae63sxygeat',
  poolContract: 'terra12252e02w0k5yv9mryctth4j3y2sdas0xremw0jznzwal5v3xeqjst7q537',
  decimalIn: 8,
  decimalOut: 18,
};

const wETHwstETHInv = {
  name: 'wstETH → wETH',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'wstETHinv',
  offerNativeTokenDenom: 'ibc/A356EC90DC3AE43D485514DA7260EDC7ABB5CFAA0654CE2524C739392975AD3C',
  poolContract: 'terra12252e02w0k5yv9mryctth4j3y2sdas0xremw0jznzwal5v3xeqjst7q537',
  decimalIn: 18,
  decimalOut: 8,
};

const axlWEthTowstEth = {
  name: 'axlWETH → wstETH',
  dex: 'Astroport Terra',
  redemptionKey: 'wstETH',
  offerNativeTokenDenom: 'ibc/BC8A77AFBD872FDC32A348D3FB10CC09277C266CFE52081DE341C7EC6752E674',
  poolContract: 'terra1yga5eepqnpg77gaj59uqfkm2qtllvpq642cmx5gj5lzjf5v88wzs2srzp7',
  decimal: 18,
};

const wstEthToAxlWEth = {
  name: 'wstETH → axlWETH',
  dex: 'Astroport Terra',
  redemptionKey: 'wstETHinv',
  offerNativeTokenDenom: 'ibc/A356EC90DC3AE43D485514DA7260EDC7ABB5CFAA0654CE2524C739392975AD3C',
  poolContract: 'terra1yga5eepqnpg77gaj59uqfkm2qtllvpq642cmx5gj5lzjf5v88wzs2srzp7',
  decimal: 18,
};

// ATOM
const atomDatomSkeletonSwap = {
  name: 'ATOM → dATOM',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'dATOM',
  offerNativeTokenDenom: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  poolContract: 'terra1aa8nurhuk7rwedhjyzptggypuxd3y66qp4nsx6ph240g37esdm7qyheqkd',
};

const atomDatomSkeletonSwapInv = {
  name: 'dATOM → ATOM',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'dATOMinv',
  offerNativeTokenDenom: 'ibc/223FF539430381ADAB3A66AC4822E253C3F845E9841F17FEEC207B3AA9F8D915',
  poolContract: 'terra1aa8nurhuk7rwedhjyzptggypuxd3y66qp4nsx6ph240g37esdm7qyheqkd',
};

const atomDatomAstro = {
  name: 'ATOM → dATOM',
  dex: 'Astroport Terra',
  redemptionKey: 'dATOM',
  offerNativeTokenDenom: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  poolContract: 'terra1a0h6vrzkztjystg8sd949qyrc6mw9gzxk2870cr2mukg53uzgvqs46qul9',
};

const atomDatomAstroinv = {
  name: 'dATOM → ATOM',
  dex: 'Astroport Terra',
  redemptionKey: 'dATOMinv',
  offerNativeTokenDenom: 'ibc/223FF539430381ADAB3A66AC4822E253C3F845E9841F17FEEC207B3AA9F8D915',
  poolContract: 'terra1a0h6vrzkztjystg8sd949qyrc6mw9gzxk2870cr2mukg53uzgvqs46qul9',
};

const stAtomAstro = {
  name: 'ATOM → stATOM',
  dex: 'Astroport Terra',
  redemptionKey: 'strideCosmos',
  offerNativeTokenDenom: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  poolContract: 'terra1f9vmtntpjmkyhkxtlc49jcq6cv8rfz0kr06zv6efdtdgae4m9y9qlzm36t',
};

const stAtomAstroInv = {
  name: 'stATOM → ATOM',
  dex: 'Astroport Terra',
  redemptionKey: 'strideCosmosinv',
  offerNativeTokenDenom: 'ibc/FD9DBF0DB4D301313195159303811FD2FD72185C4B11A51659EFCD49D7FF1228',
  poolContract: 'terra1f9vmtntpjmkyhkxtlc49jcq6cv8rfz0kr06zv6efdtdgae4m9y9qlzm36t',
};

// ArbLUNA
const arbLunaAstro = {
  name: 'LUNA → arbLUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'arbLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra16nfwldn9j5xhry2y78gvm3x4vte8vu77zr3ctlan79w5f5aheawqnz7a4f',
};

const arbLunaAstroInv = {
  name: 'arbLUNA → LUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'arbLUNAinv',
  offerTokenAddr: 'terra1se7rvuerys4kd2snt6vqswh9wugu49vhyzls8ymc02wl37g2p2ms5yz490',
  poolContract: 'terra16nfwldn9j5xhry2y78gvm3x4vte8vu77zr3ctlan79w5f5aheawqnz7a4f',
};

const arbLunaSkeletonSwap = {
  name: 'LUNA → arbLUNA',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'arbLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1wttdzwa6pdegtrdjdw49y0pd3dd8qd3cqn89j6t9v978lx05rr8sew5jyq',
};

const arbLunaSkeletonSwapInv = {
  name: 'arbLUNA → LUNA',
  dex: 'Skeleton Swap Terra',
  redemptionKey: 'arbLUNAinv',
  offerTokenAddr: 'terra1se7rvuerys4kd2snt6vqswh9wugu49vhyzls8ymc02wl37g2p2ms5yz490',
  poolContract: 'terra1wttdzwa6pdegtrdjdw49y0pd3dd8qd3cqn89j6t9v978lx05rr8sew5jyq',
};

// Solid
const solidUsdc = {
  name: 'SOLID → USDC',
  dex: 'Astroport Terra',
  dexUrl:
    'https://app.astroport.fi/swap?chain=terra&from=terra10aa3zdkrc7jwuf8ekl3zq7e7m42vmzqehcmu74e4egc7xkm5kr2s0muyst&to=ibc/2C962DAB9F57FE0921435426AE75196009FAA1981BF86991203C8411F8980FDB',
  redemptionKey: 'identity',
  offerTokenAddr: 'terra10aa3zdkrc7jwuf8ekl3zq7e7m42vmzqehcmu74e4egc7xkm5kr2s0muyst',
  poolContract: 'terra1fwjxdjpl98shj20l4swlen9hyu4lhvekrvqkqn393lzzghmsn2wqjdnvpu',
};

const usdcSolid = {
  name: 'USDC → SOLID',
  dex: 'Astroport Terra',
  dexUrl:
    'https://app.astroport.fi/swap?chain=terra&from=ibc/2C962DAB9F57FE0921435426AE75196009FAA1981BF86991203C8411F8980FDB&to=terra10aa3zdkrc7jwuf8ekl3zq7e7m42vmzqehcmu74e4egc7xkm5kr2s0muyst',
  redemptionKey: 'identity',
  offerNativeTokenDenom: 'ibc/2C962DAB9F57FE0921435426AE75196009FAA1981BF86991203C8411F8980FDB',
  poolContract: 'terra1fwjxdjpl98shj20l4swlen9hyu4lhvekrvqkqn393lzzghmsn2wqjdnvpu',
};

export const terraLsds = [
  // LunaX
  lunaXAstro,
  lunaXTerraSwap,
  // cLuna
  cLuna,
  cLunaInv,
  // bLUNA
  blunaAstro,
  blunaSkeletonSwap,
  ampLunaAstro,
  ampLunaSkeletonSwap,
  ampLunaSkeletonSwapInv,
  ampLunaPcl,
  lunaToAmpLunaPcl,
  ampLunaTs,
  ampLunaToLunaTs,
  stLuna,
  stLunaSkeletonSwap,
  // ROAR
  ampRoar,
  ampRoarInv,
  ampRoarAstro,
  ampRoarAstroInv,
  // ETH
  wETHwstETH,
  wETHwstETHInv,
  axlWEthTowstEth,
  wstEthToAxlWEth,
  // ATOM
  atomDatomSkeletonSwap,
  atomDatomSkeletonSwapInv,
  atomDatomAstro,
  atomDatomAstroinv,
  stAtomAstro,
  stAtomAstroInv,
  // arbLUNA
  arbLunaAstro,
  arbLunaAstroInv,
  arbLunaSkeletonSwap,
  arbLunaSkeletonSwapInv,
  // SOLID,
  solidUsdc,
  usdcSolid,
];
