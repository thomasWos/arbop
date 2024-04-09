import { LCDClient } from '@terra-money/feather.js';
import strideRedemptionMap from './StrideRedemptionMap.js';

const redemptionMap = await strideRedemptionMap();

const lcd = new LCDClient({
  'phoenix-1': {
    chainID: 'phoenix-1',
    lcd: 'https://phoenix-lcd.terra.dev',
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

// Astro rate
const astoStakingContract = 'terra1nyu6sk9rvtvsltm7tjjrp6rlavnm3e4sq03kltde6kesam260f8szar8ze';
const totalDeposit = await lcd.wasm.contractQuery(astoStakingContract, { total_deposit: {} });
const totalShares = await lcd.wasm.contractQuery(astoStakingContract, { total_shares: {} });
const astroRate = totalDeposit / totalShares;

const lunaX = {
  name: 'lunaX',
  stakingContract: 'terra179e90rqspswfzmhdl25tg22he0fcefwndgzc957ncx9dleduu7ms3evpuk',
  exchangeRate: (data) => data.state.exchange_rate,
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1mpj7j25fw5a0q5vfasvsvdp6xytaqxh006lh6f5zpwxvadem9hwsy6m508',
};

const bluna = {
  name: 'bLuna',
  stakingContract: 'terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1h32epkd72x7st0wk49z35qlpsxf26pw4ydacs8acq6uka7hgshmq7z7vl9',
};

const ampLuna = {
  name: 'ampLuna',
  stakingContract: 'terra10788fkzah89xrdm27zkj5yvhj9x3494lxawzm5qq3vvxcqz2yzaqyd3enk',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1cr8dg06sh343hh4xzn3gxd3ayetsjtet7q5gp4kfrewul2kql8sqvhaey4',
};

const stLuna = {
  name: 'stLuna',
  redemptionRate: redemptionMap.get('terra'),
  nativeTokenDenom: 'uluna',
  poolContract: 'terra1re0yj0j6e9v2szg7kp02ut6u8jjea586t6pnpq6628wl36fphtpqwt6l7p',
};

const xAstro = {
  name: 'xAstro',
  redemptionRate: astroRate,
  tokenAddr: 'terra1nsuqsk6kh58ulczatwev87ttq2z6r3pusulg9r24mfj2fvtzd4uq3exn26',
  poolContract: 'terra1muhks8yr47lwe370wf65xg5dmyykrawqpkljfm39xhkwhf4r7jps0gwl4l',
};

const astro = {
  name: 'astro',
  redemptionRate: 1 / astroRate,
  tokenAddr: 'terra1x62mjnme4y0rdnag3r8rfgjuutsqlkkyuh4ndgex0wl3wue25uksau39q8',
  poolContract: 'terra1muhks8yr47lwe370wf65xg5dmyykrawqpkljfm39xhkwhf4r7jps0gwl4l',
};

const ampHuahua = {
  name: 'ampHuahua',
  stakingContract: 'chihuahua1nktfhalzvtx82kyn4dh6l8htcl0prfpnu380a39zj52nzu3j467qqg23ry',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1a6xwgvyvrmzgue6hectem3fwdzquny44a4y20a9wvlrtalhlsk9sryz5t9',
};

const bHuahua = {
  name: 'bHuahua',
  stakingContract: 'chihuahua1psf89r2g9vdlttrjphspcpzzfx87r2r4nl5fg703ky42mp2706wsw5330f',
  exchangeRate: (data) => data.exchange_rate,
  nativeTokenDenom: 'uhuahua',
  poolContract: 'chihuahua1py86y6946ed07g8v24thess2havjjgpg3uvjdu4v805czmge37hsvlt6qz',
};

const lsds = [bluna, lunaX, ampLuna, stLuna, ampHuahua, bHuahua, xAstro, astro];

const arbs = await Promise.all(lsds.map((lsd) => computeArb(lsd)));
arbs.sort((a, b) => b.arb - a.arb).forEach((arb) => console.log(arb));

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
  const { return_amount } = await lcd.wasm.contractQuery(lsd.poolContract, {
    simulation: {
      offer_asset: {
        info: infoOfferAsset,
        amount: `${amount}`,
      },
    },
  });

  const returnAmount = exchangeRate * return_amount;
  const rate = returnAmount / amount;
  const arb = (rate - 1) * 100;
  return { name: lsd.name, arb: arb };
}
