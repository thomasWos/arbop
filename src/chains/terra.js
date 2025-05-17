import { exchangeRateFromState, queryState } from '../utils.js';

const lunaXContract = 'terra179e90rqspswfzmhdl25tg22he0fcefwndgzc957ncx9dleduu7ms3evpuk';
const bLunaContract = 'terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea';
const ampLunaContract = 'terra10788fkzah89xrdm27zkj5yvhj9x3494lxawzm5qq3vvxcqz2yzaqyd3enk';
const ampRoarStackingContract = 'terra1vklefn7n6cchn0u962w3gaszr4vf52wjvd4y95t2sydwpmpdtszsqvk9wy';
const cLunaContract = 'terra188mmw2vsp0yahen3vh2clup543qrttvdzkxl0h9myfuwjj56nausztpegt';
const arbLunaContract = 'terra1r9gls56glvuc4jedsvc3uwh6vj95mqm9efc7hnweqxa2nlme5cyqxygy5m';

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
};

const cLunaInv = {
  name: 'cLUNA → LUNA',
  dex: 'Astroport Terra',
  redemptionKey: 'cLUNAtinv',
  offerTokenAddr: 'terra13eekqp0zgj55arjuacpxqxzgqy2uydf5wzzqns9ddgpepj377afqflunf3',
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

const ampLunaToLunaWw = {
  name: 'ampLUNA → LUNA',
  dex: 'White Whale Terra',
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

const stLunaWW = {
  name: 'LUNA → stLUNA',
  dex: 'White Whale Terra',
  redemptionKey: 'strideTerra',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra12exvyhctk6ggqvzj2tlhsv769llctntf5zdj9erz6q2uq4h8hn8q5k5xpg',
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

// bWHALE

const bWhaleWW = {
  name: 'WHALE → bWHALE',
  dex: 'White Whale Terra',
  redemptionKey: 'bWHALE',
  offerNativeTokenDenom: 'ibc/36A02FFC4E74DF4F64305130C3DFA1B06BEAC775648927AA44467C76A77AB8DB',
  poolContract: 'terra1j9jmsplecj9ay2py27953p84nfmv7f6ce75ms5fleyhd0aecpc7q0hgmsa',
};

const bWhaleWWInv = {
  name: 'bWHALE → WHALE',
  dex: 'White Whale Terra',
  redemptionKey: 'bWHALEinv',
  offerNativeTokenDenom: 'ibc/517E13F14A1245D4DE8CF467ADD4DA0058974CDCC880FA6AE536DBCA1D16D84E',
  poolContract: 'terra1j9jmsplecj9ay2py27953p84nfmv7f6ce75ms5fleyhd0aecpc7q0hgmsa',
};

const bWhaleAstro = {
  name: 'WHALE → bWHALE',
  dex: 'Astroport Terra',
  redemptionKey: 'bWHALE',
  offerNativeTokenDenom: 'ibc/36A02FFC4E74DF4F64305130C3DFA1B06BEAC775648927AA44467C76A77AB8DB',
  poolContract: 'terra18hhsyrjac6hud4tc9q05s8em35utm6jndswhw5v56lh5ld37ml6secl2rd',
};

const bWhaleAstroInv = {
  name: 'bWHALE → WHALE',
  dex: 'Astroport Terra',
  redemptionKey: 'bWHALEinv',
  offerNativeTokenDenom: 'ibc/517E13F14A1245D4DE8CF467ADD4DA0058974CDCC880FA6AE536DBCA1D16D84E',
  poolContract: 'terra18hhsyrjac6hud4tc9q05s8em35utm6jndswhw5v56lh5ld37ml6secl2rd',
};

// ampWHALE

const ampWhaleWW = {
  name: 'WHALE → ampWHALE',
  dex: 'White Whale Terra',
  redemptionKey: 'ampWHALE',
  offerNativeTokenDenom: 'ibc/36A02FFC4E74DF4F64305130C3DFA1B06BEAC775648927AA44467C76A77AB8DB',
  poolContract: 'terra1ntx595elf3ukxcd0wy76h24rzztcv2p6n3wmfd358ks95prv42fs9mn63n',
};

const ampWhaleWWInv = {
  name: 'ampWHALE → WHALE',
  dex: 'White Whale Terra',
  redemptionKey: 'ampWHALEinv',
  offerNativeTokenDenom: 'ibc/B3F639855EE7478750CC8F82072307ED6E131A8EFF20345E1D136B50C4E5EC36',
  poolContract: 'terra1ntx595elf3ukxcd0wy76h24rzztcv2p6n3wmfd358ks95prv42fs9mn63n',
};

const ampWhaleAstro = {
  name: 'WHALE → ampWHALE',
  dex: 'Astroport Terra',
  redemptionKey: 'ampWHALE',
  offerNativeTokenDenom: 'ibc/36A02FFC4E74DF4F64305130C3DFA1B06BEAC775648927AA44467C76A77AB8DB',
  poolContract: 'terra129hvq9mgqtye4kg0cfmv9z6sq5f7sgpmrspr72968xx20gx4t2rqvpue0z',
};

const ampWhaleAstroInv = {
  name: 'ampWHALE → WHALE',
  dex: 'Astroport Terra',
  redemptionKey: 'ampWHALEinv',
  offerNativeTokenDenom: 'ibc/B3F639855EE7478750CC8F82072307ED6E131A8EFF20345E1D136B50C4E5EC36',
  poolContract: 'terra129hvq9mgqtye4kg0cfmv9z6sq5f7sgpmrspr72968xx20gx4t2rqvpue0z',
};

const wETHwstETH = {
  name: 'wETH → wstETH',
  dex: 'White Whale Terra',
  redemptionKey: 'wstETH',
  offerTokenAddr: 'terra15hhqg8gyz04zapynqtk7uvlsp7lzay7etrt9ann0276v94yae63sxygeat',
  poolContract: 'terra12252e02w0k5yv9mryctth4j3y2sdas0xremw0jznzwal5v3xeqjst7q537',
  decimalIn: 8,
  decimalOut: 18,
};

const wETHwstETHInv = {
  name: 'wstETH → wETH',
  dex: 'White Whale Terra',
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
const atomDatomWW = {
  name: 'ATOM → dATOM',
  dex: 'White Whale Terra',
  redemptionKey: 'dATOM',
  offerNativeTokenDenom: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
  poolContract: 'terra1aa8nurhuk7rwedhjyzptggypuxd3y66qp4nsx6ph240g37esdm7qyheqkd',
};

const atomDatomWWinv = {
  name: 'dATOM → ATOM',
  dex: 'White Whale Terra',
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

const arbLunaWW = {
  name: 'LUNA → arbLUNA',
  dex: 'White Whale Terra',
  redemptionKey: 'arbLUNA',
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1wttdzwa6pdegtrdjdw49y0pd3dd8qd3cqn89j6t9v978lx05rr8sew5jyq',
};

const arbLunaWWInv = {
  name: 'arbLUNA → LUNA',
  dex: 'White Whale Terra',
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
  blunaWw,
  ampLunaAstro,
  ampLunaWw,
  ampLunaToLunaWw,
  ampLunaPcl,
  lunaToAmpLunaPcl,
  ampLunaTs,
  ampLunaToLunaTs,
  stLuna,
  stLunaWW,
  // ROAR
  ampRoar,
  ampRoarInv,
  // bWHALE
  bWhaleWW,
  bWhaleWWInv,
  bWhaleAstro,
  bWhaleAstroInv,
  // ampWHALE
  ampWhaleWW,
  ampWhaleWWInv,
  ampWhaleAstro,
  ampWhaleAstroInv,
  // ETH
  wETHwstETH,
  wETHwstETHInv,
  axlWEthTowstEth,
  wstEthToAxlWEth,
  // ATOM
  atomDatomWW,
  atomDatomWWinv,
  atomDatomAstro,
  atomDatomAstroinv,
  stAtomAstro,
  stAtomAstroInv,
  // arbLUNA
  arbLunaAstro,
  arbLunaAstroInv,
  arbLunaWW,
  arbLunaWWInv,
  // SOLID,
  solidUsdc,
  usdcSolid,
];
