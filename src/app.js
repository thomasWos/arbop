import { LCDClient } from '@terra-money/feather.js';
import { strideRedemptionMap } from './strideRedemptionMap.js';
import { queryxAstroRate } from './xAstroRate.js';
import { queryMoarRate } from './moarRate.js';

const lcd = new LCDClient({
  'phoenix-1': {
    chainID: 'phoenix-1',
    lcd: 'https://terra2.tdrsys.com',
    gasAdjustment: 1,
    gasPrices: {
      uluna: 0.015,
    },
    prefix: 'terra',
  },
  'chihuahua-1': {
    chainID: 'chihuahua-1',
    lcd: 'https://chihuahua-api.polkachu.com',
    gasAdjustment: 1,
    gasPrices: {
      uhuahua: 500,
    },
    prefix: 'chihuahua',
  },
});

const lunaX = {
  name: 'lunaX Astro',
  stakingContract: 'terra179e90rqspswfzmhdl25tg22he0fcefwndgzc957ncx9dleduu7ms3evpuk',
  exchangeRate: (data) => data.state.exchange_rate,
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1mpj7j25fw5a0q5vfasvsvdp6xytaqxh006lh6f5zpwxvadem9hwsy6m508',
};

const blunaAstro = {
  name: 'bLuna Astro',
  stakingContract: 'terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1h32epkd72x7st0wk49z35qlpsxf26pw4ydacs8acq6uka7hgshmq7z7vl9',
};

const blunaWw = {
  name: 'bLuna WW',
  stakingContract: 'terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1j5znhs9jeyty9u9jcagl3vefkvzwqp6u9tq9a3e5qrz4gmj2udyqp0z0xc',
};

const ampLunaAstro = {
  name: 'ampLuna Astro',
  stakingContract: 'terra10788fkzah89xrdm27zkj5yvhj9x3494lxawzm5qq3vvxcqz2yzaqyd3enk',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1cr8dg06sh343hh4xzn3gxd3ayetsjtet7q5gp4kfrewul2kql8sqvhaey4',
};

const ampLunaWw = {
  name: 'ampLuna Astro',
  stakingContract: 'terra10788fkzah89xrdm27zkj5yvhj9x3494lxawzm5qq3vvxcqz2yzaqyd3enk',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1tsx0dmasjvd45k6tdywzv77d5t9k3lpzyuleavuah77pg3lwm9cq4469pm',
};

const strideMap = await strideRedemptionMap();
const stLuna = {
  name: 'stLuna Astro',
  redemptionRate: strideMap.get('terra'),
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1re0yj0j6e9v2szg7kp02ut6u8jjea586t6pnpq6628wl36fphtpqwt6l7p',
};

const xAstroRate = await queryxAstroRate(lcd);
const xAstro = {
  name: 'xAstro',
  redemptionRate: xAstroRate,
  tokenAddr: 'terra1nsuqsk6kh58ulczatwev87ttq2z6r3pusulg9r24mfj2fvtzd4uq3exn26',
  poolContract: 'terra1muhks8yr47lwe370wf65xg5dmyykrawqpkljfm39xhkwhf4r7jps0gwl4l',
};
const astro = {
  name: 'astro',
  redemptionRate: 1 / xAstroRate,
  tokenAddr: 'terra1x62mjnme4y0rdnag3r8rfgjuutsqlkkyuh4ndgex0wl3wue25uksau39q8',
  poolContract: 'terra1muhks8yr47lwe370wf65xg5dmyykrawqpkljfm39xhkwhf4r7jps0gwl4l',
};

const moar = {
  name: 'moar',
  redemptionRate: await queryMoarRate(lcd),
  tokenAddr: 'terra1lxx40s29qvkrcj8fsa3yzyehy7w50umdvvnls2r830rys6lu2zns63eelv',
  poolContract: 'terra1j0ackj0wru4ndj74e3mhhq6rffe63y8xd0e56spqcjygv2r0cfsqxr36k6',
};

const ampHuahua = {
  name: 'ampHuahua WW',
  stakingContract: 'chihuahua1nktfhalzvtx82kyn4dh6l8htcl0prfpnu380a39zj52nzu3j467qqg23ry',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1a6xwgvyvrmzgue6hectem3fwdzquny44a4y20a9wvlrtalhlsk9sryz5t9',
};

const bHuahua = {
  name: 'bHuahua WW',
  stakingContract: 'chihuahua1psf89r2g9vdlttrjphspcpzzfx87r2r4nl5fg703ky42mp2706wsw5330f',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1py86y6946ed07g8v24thess2havjjgpg3uvjdu4v805czmge37hsvlt6qz',
};

const stAtom = {
  name: 'stAtom',
  redemptionRate: strideMap.get('cosmos'),
  osmosis: {
    tokenIn: 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2',
    tokenOut: 'ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901',
  },
};

const stOsmo = {
  name: 'stOsmo',
  redemptionRate: strideMap.get('osmo'),
  osmosis: {
    tokenIn: 'uosmo',
    tokenOut: 'ibc/D176154B0C63D1F9C6DCFB4F70349EBF2E2B5A87A05902F57A6AE92B863E9AEC',
  },
};

const lsds = [blunaAstro, blunaWw, lunaX, ampLunaAstro, ampLunaWw, stLuna, ampHuahua, bHuahua, xAstro, astro, moar, stAtom, stOsmo];

async function computeArb(lsd) {
  let exchangeRate;
  if (lsd.stakingContract) {
    const data = await lcd.wasm.contractQuery(lsd.stakingContract, { state: {} });
    exchangeRate = lsd.exchangeRate(data);
  } else {
    exchangeRate = lsd.redemptionRate;
  }

  let infoOfferAsset;
  if (lsd.tokenAddr) {
    // Token
    infoOfferAsset = {
      token: {
        contract_addr: lsd.tokenAddr,
      },
    };
  } else {
    // Native token
    infoOfferAsset = {
      native_token: {
        denom: lsd.nativeTokenDenom,
      },
    };
  }

  const amount = 1000000;
  let tokenOutAmount;

  if (lsd.osmosis) {
    const quote =
      'https://sqsprod.osmosis.zone/router/quote' +
      '?tokenIn=1000000' +
      `${encodeURIComponent(lsd.osmosis.tokenIn)}` +
      `&tokenOutDenom=${encodeURIComponent(lsd.osmosis.tokenOut)}`;

    await fetch(quote)
      .then((response) => response.json())
      .then((data) => {
        tokenOutAmount = data.amount_out;
      });
  } else {
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
  return { id: lsd.name, arb: arb };
}

const arbs = await Promise.all(lsds.map((lsd) => computeArb(lsd)));
arbs.sort((a, b) => b.arb - a.arb).forEach((arb) => console.log(arb));
