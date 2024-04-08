import { LCDClient } from '@terra-money/feather.js';
const lcd = LCDClient.fromDefaultConfig('mainnet');

const lunaX = {
  name: 'lunaX',
  stakingContract: 'terra179e90rqspswfzmhdl25tg22he0fcefwndgzc957ncx9dleduu7ms3evpuk',
  exchangeRate: (data) => data.state.exchange_rate,
  astroPair: 'terra1mpj7j25fw5a0q5vfasvsvdp6xytaqxh006lh6f5zpwxvadem9hwsy6m508',
  token: 'terra14xsm2wzvu7xaf567r693vgfkhmvfs08l68h4tjj5wjgyn5ky8e2qvzyanh',
};

const bluna = {
  name: 'bLuna',
  stakingContract: 'terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea',
  exchangeRate: (data) => data.exchange_rate,
  astroPair: 'terra1h32epkd72x7st0wk49z35qlpsxf26pw4ydacs8acq6uka7hgshmq7z7vl9',
  token: 'terra17aj4ty4sz4yhgm08na8drc0v03v2jwr3waxcqrwhajj729zhl7zqnpc0ml',
};

const ampLuna = {
  name: 'ampLuna',
  stakingContract: 'terra10788fkzah89xrdm27zkj5yvhj9x3494lxawzm5qq3vvxcqz2yzaqyd3enk',
  exchangeRate: (data) => data.exchange_rate,
  astroPair: 'terra1cr8dg06sh343hh4xzn3gxd3ayetsjtet7q5gp4kfrewul2kql8sqvhaey4',
  token: 'terra1ecgazyd0waaj3g7l9cmy5gulhxkps2gmxu9ghducvuypjq68mq2s5lvsct',
};

const lsds = [bluna, lunaX, ampLuna];

const arbs = await Promise.all(lsds.map((lsd) => computeArb(lsd)));
arbs.forEach((arb) => console.log(arb));

async function computeArb(lsd) {
  const data = await lcd.wasm.contractQuery(lsd.stakingContract, { state: {} });
  const exchangeRate = lsd.exchangeRate(data);

  const lunaAmount = 1000000;
  const { return_amount } = await lcd.wasm.contractQuery(lsd.astroPair, {
    simulation: {
      offer_asset: {
        info: {
          native_token: {
            denom: 'uluna',
          },
        },
        amount: `${lunaAmount}`,
      },
      ask_asset_info: {
        token: {
          contract_addr: lsd.token,
        },
      },
    },
  });

  const returnLuna = exchangeRate * return_amount;
  const rate = returnLuna / lunaAmount;
  const arb = (rate - 1) * 100;
  console.log(`${lsd.name}: ${arb.toPrecision(3)}%`);
  return { name: lsd.name, arb: arb };
}
