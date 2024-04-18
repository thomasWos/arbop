import { kujiraLcdConfig, ampKujiFin, qcKUJIFin } from './kujira.js';

import { LCDClient } from '@terra-money/feather.js';
import { strideRedemptionMap } from './strideRedemptionMap.js';
import { queryOldxAstroRate, queryNewxAstroRate } from './xAstroRate.js';
import { queryMoarRate } from './moarRate.js';

const lcd = new LCDClient({
  'phoenix-1': {
    chainID: 'phoenix-1',
    lcd: 'https://rest.cosmos.directory/terra2',
    gasAdjustment: 1,
    gasPrices: {
      uluna: 0.015,
    },
    prefix: 'terra',
  },
  'neutron-1': {
    chainID: 'neutron-1',
    lcd: 'https://neutron-rest.publicnode.com',
    gasAdjustment: 1,
    gasPrices: {
      untrn: 0.015,
    },
    prefix: 'neutron',
  },
  [kujiraLcdConfig.chainID]: kujiraLcdConfig,
  'chihuahua-1': {
    chainID: 'chihuahua-1',
    lcd: 'https://chihua.api.m.stavr.tech',
    gasAdjustment: 1,
    gasPrices: {
      uhuahua: 500,
    },
    prefix: 'chihuahua',
  },
});

const lunaX = {
  name: 'LUNA → LunaX',
  dex: 'Astroport Terra',
  stakingContract: {
    contract: 'terra179e90rqspswfzmhdl25tg22he0fcefwndgzc957ncx9dleduu7ms3evpuk',
    exchangeRate: (data) => data.state.exchange_rate,
  },
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
  offerNativeTokenDenom: 'uluna',
  poolContract: 'terra1tsx0dmasjvd45k6tdywzv77d5t9k3lpzyuleavuah77pg3lwm9cq4469pm',
};

const ampHuahua = {
  name: 'HUAHUA → ampHUAHUA',
  dex: 'White Whale Chihuahua',
  stakingContract: {
    contract: 'chihuahua1nktfhalzvtx82kyn4dh6l8htcl0prfpnu380a39zj52nzu3j467qqg23ry',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1a6xwgvyvrmzgue6hectem3fwdzquny44a4y20a9wvlrtalhlsk9sryz5t9',
};

const bHuahua = {
  name: 'HUAHUA → bHUAHUA',
  dex: 'White Whale Chihuahua',
  stakingContract: {
    contract: 'chihuahua1psf89r2g9vdlttrjphspcpzzfx87r2r4nl5fg703ky42mp2706wsw5330f',
    exchangeRate: (data) => data.exchange_rate,
  },
  offerNativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1py86y6946ed07g8v24thess2havjjgpg3uvjdu4v805czmge37hsvlt6qz',
};

async function computeArbs() {
  const strideMap = await strideRedemptionMap();

  const stLuna = {
    name: 'LUNA → stLUNA',
    dex: 'Astroport Terra',
    redemptionRate: strideMap.get('terra'),
    offerNativeTokenDenom: 'uluna',
    poolContract: 'terra1re0yj0j6e9v2szg7kp02ut6u8jjea586t6pnpq6628wl36fphtpqwt6l7p',
  };

  const stAtom = {
    name: 'ATOM → stATOM',
    dex: 'Osmosis',
    redemptionRate: strideMap.get('cosmos'),
    osmosis: {
      tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
      tokenOut: 'ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901',
    },
  };

  const stOsmo = {
    name: 'OSMO → stOsmo',
    dex: 'Osmosis',
    redemptionRate: strideMap.get('osmo'),
    osmosis: {
      tokenIn: 'uosmo',
      tokenOut: 'ibc/D176154B0C63D1F9C6DCFB4F70349EBF2E2B5A87A05902F57A6AE92B863E9AEC',
    },
  };

  const stJuno = {
    name: 'JUNO → stJUNO',
    dex: 'Osmosis',
    redemptionRate: strideMap.get('juno'),
    osmosis: {
      tokenIn: 'ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED',
      tokenOut: 'ibc/84502A75BCA4A5F68D464C00B3F610CE2585847D59B52E5FFB7C3C9D2DDCD3FE',
    },
  };

  const stStars = {
    name: 'STARS → stSTARS',
    dex: 'Osmosis',
    redemptionRate: strideMap.get('stars'),
    osmosis: {
      tokenIn: 'ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4',
      tokenOut: 'ibc/5DD1F95ED336014D00CE2520977EC71566D282F9749170ADC83A392E0EA7426A',
    },
  };

  const oldxAstroRate = await queryOldxAstroRate(lcd);
  const xAstroTerra = {
    name: 'ASTRO.cw20 → xASTRO.cw20',
    dex: 'Astroport Terra',
    redemptionRate: oldxAstroRate,
    offerTokenAddr: 'terra1nsuqsk6kh58ulczatwev87ttq2z6r3pusulg9r24mfj2fvtzd4uq3exn26',
    poolContract: 'terra1muhks8yr47lwe370wf65xg5dmyykrawqpkljfm39xhkwhf4r7jps0gwl4l',
  };
  const astroTerra = {
    name: 'xASTRO.cw20 → ASTRO.cw20',
    dex: 'Astroport Terra',
    redemptionRate: 1 / oldxAstroRate,
    offerTokenAddr: 'terra1x62mjnme4y0rdnag3r8rfgjuutsqlkkyuh4ndgex0wl3wue25uksau39q8',
    poolContract: 'terra1muhks8yr47lwe370wf65xg5dmyykrawqpkljfm39xhkwhf4r7jps0gwl4l',
  };

  const newxAstroRate = await queryNewxAstroRate(lcd);
  const xAstroNeutron = {
    name: 'ASTRO → xASTRO',
    dex: 'Astroport Neutron',
    redemptionRate: newxAstroRate,
    offerNativeTokenDenom: 'factory/neutron1ffus553eet978k024lmssw0czsxwr97mggyv85lpcsdkft8v9ufsz3sa07/astro',
    poolContract: 'neutron1kmkukaad9v0vc60xacgygtz9saukyhjutr60zj7weyjlnuf8eymq3tdqny',
  };
  const astroNeutron = {
    name: 'xASTRO → ASTRO',
    dex: 'Astroport Neutron',
    redemptionRate: 1 / newxAstroRate,
    offerNativeTokenDenom: 'factory/neutron1zlf3hutsa4qnmue53lz2tfxrutp8y2e3rj4nkghg3rupgl4mqy8s5jgxsn/xASTRO',
    poolContract: 'neutron1kmkukaad9v0vc60xacgygtz9saukyhjutr60zj7weyjlnuf8eymq3tdqny',
  };

  const moar = {
    name: 'ROAR → MOAR',
    dex: 'White Whale Terra',
    redemptionRate: await queryMoarRate(lcd),
    offerTokenAddr: 'terra1lxx40s29qvkrcj8fsa3yzyehy7w50umdvvnls2r830rys6lu2zns63eelv',
    poolContract: 'terra1j0ackj0wru4ndj74e3mhhq6rffe63y8xd0e56spqcjygv2r0cfsqxr36k6',
  };

  const lsds = [
    blunaAstro,
    blunaWw,
    lunaX,
    ampLunaAstro,
    ampLunaWw,
    stLuna,
    ampHuahua,
    bHuahua,
    xAstroTerra,
    astroTerra,
    xAstroNeutron,
    astroNeutron,
    moar,
    stAtom,
    stOsmo,
    stJuno,
    stStars,
    ampKujiFin,
    qcKUJIFin,
  ];

  const arbs = await Promise.all(lsds.map((lsd, index) => computeArb(lsd, index)));
  console.log('Fetch arbs SUCCESS');
  return arbs.sort((a, b) => b.arb - a.arb);
}

async function computeArb(lsd, index) {
  let exchangeRate;
  if (lsd.stakingContract) {
    const data = await lcd.wasm.contractQuery(lsd.stakingContract.contract, { state: {} });
    exchangeRate = lsd.stakingContract.exchangeRate(data);
  } else {
    exchangeRate = lsd.redemptionRate;
  }

  const amount = 1000000;
  let tokenOutAmount;

  if (lsd.osmosis) {
    const quote =
      'https://sqsprod.osmosis.zone/router/quote' +
      `?tokenIn=${amount}` +
      `${encodeURIComponent(lsd.osmosis.tokenIn)}` +
      `&tokenOutDenom=${encodeURIComponent(lsd.osmosis.tokenOut)}`;

    await fetch(quote)
      .then((response) => response.json())
      .then((data) => {
        tokenOutAmount = data.amount_out;
      });
  } else {
    // DEX smart contract
    let infoOfferAsset;
    if (lsd.offerTokenAddr) {
      // Token
      infoOfferAsset = {
        token: {
          contract_addr: lsd.offerTokenAddr,
        },
      };
    } else {
      // Native token
      infoOfferAsset = {
        native_token: {
          denom: lsd.offerNativeTokenDenom,
        },
      };
    }

    const { return_amount } = await lcd.wasm.contractQuery(lsd.poolContract, {
      simulation: {
        offer_asset: {
          info: infoOfferAsset,
          amount: `${amount}`,
        },
      },
    });
    tokenOutAmount = return_amount;
  }

  const returnAmount = exchangeRate * tokenOutAmount;
  const rate = returnAmount / amount;
  const arb = (rate - 1) * 100;
  return { id: index, name: lsd.name, arb: arb, dex: lsd.dex };
}

export async function tryComputeArbs() {
  try {
    return await computeArbs();
  } catch (error) {
    console.error(`Error computing arbs`, error);
  }
}
