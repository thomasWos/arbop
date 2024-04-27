import { lunaX, blunaAstro, blunaWw, ampLunaAstro, ampLunaWw } from './terra.js';
import { ampKujiFin, qcKUJIFin } from './kujira.js';
import { strideRedemptionMap } from './strideRedemptionMap.js';
import { queryOldxAstroRate, queryNewxAstroRate } from './xAstroRate.js';
import { queryMoarRate } from './moarRate.js';
import { sEgldArb } from './multiversx.js';
import { queryContract, arbitrage } from './utils.js';

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

  const oldxAstroRate = await queryOldxAstroRate();
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

  const newxAstroRate = await queryNewxAstroRate();
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
    redemptionRate: await queryMoarRate(),
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

  const sEgld = await sEgldArb();
  sEgld.id = lsds.length;
  arbs.push(sEgld);

  console.log('Fetch arbs SUCCESS');
  return arbs.sort((a, b) => b.arb - a.arb);
}

async function computeArb(lsd, index) {
  let exchangeRate;
  if (lsd.stakingContract) {
    const data = await queryContract(lsd.stakingContract.contract, { state: {} });
    exchangeRate = lsd.stakingContract.exchangeRate(data);
  } else {
    exchangeRate = lsd.redemptionRate;
  }

  const tokenInAmount = 1000000;
  let tokenOutAmount;

  if (lsd.osmosis) {
    const quote =
      'https://sqsprod.osmosis.zone/router/quote' +
      `?tokenIn=${tokenInAmount}` +
      `${encodeURIComponent(lsd.osmosis.tokenIn)}` +
      `&tokenOutDenom=${encodeURIComponent(lsd.osmosis.tokenOut)}`;

    await fetch(quote)
      .then((response) => response.json())
      .then((data) => (tokenOutAmount = data.amount_out));
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

    const { return_amount } = await queryContract(lsd.poolContract, {
      simulation: {
        offer_asset: {
          info: infoOfferAsset,
          amount: `${tokenInAmount}`,
        },
      },
    });
    tokenOutAmount = return_amount;
  }

  const arb = arbitrage(exchangeRate, tokenInAmount, tokenOutAmount);
  return { id: index, name: lsd.name, arb: arb, dex: lsd.dex };
}

export async function tryComputeArbs() {
  try {
    return await computeArbs();
  } catch (error) {
    console.error(`Error computing arbs`, error);
  }
}
