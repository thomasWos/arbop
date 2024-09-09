// https://secret-4.api.trivium.network:1317/swagger/
// https://docs.scrt.network/secret-network-documentation/development/resources-api-contract-addresses/secret-token-contracts

import { oneMillion, toBase64, fromBase64, oneQuintillion } from '../utils.js';
import * as miscreant from 'miscreant';
import { generateKeyPair } from 'curve25519-js';

// https://docs.scrt.network/secret-network-documentation/development/resources-api-contract-addresses/connecting-to-the-network/mainnet-secret-4#api-endpoints
const lcdUrl = 'https://rpc.ankr.com/http/scrt_cosmos';

const empty32Array = new Uint8Array(Buffer.alloc(32, 0));
const nonce = empty32Array;
const fakeKey = new Uint8Array([
  248, 24, 153, 160, 20, 71, 22, 226, 185, 239, 57, 17, 11, 65, 67, 231, 36, 199, 102, 223, 164, 45, 133, 137, 223, 33, 119, 169, 155, 169, 194, 224,
]);
const txEncryptionKey = new Uint8Array(fakeKey);

async function newSiv() {
  const cryptoProvider = new miscreant.PolyfillCryptoProvider();
  return miscreant.SIV.importKey(txEncryptionKey, 'AES-SIV', cryptoProvider);
}

function handleResponse(data) {
  return new Promise((resolve, reject) => {
    data.data && resolve(fromBase64(data.data));
    reject(fromBase64(data.message.split(':')[1].trim()));
  });
}

async function querySecretContract(contractAddr, contractCodeHash, queryMsg) {
  const siv = await newSiv();
  const encrypted = await encrypt(siv, contractCodeHash, queryMsg);
  const encodedQuery = encodeURIComponent(toBase64(encrypted));
  const url = `${lcdUrl}/compute/v1beta1/query/${contractAddr}?query=${encodedQuery}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => handleResponse(data))
    .then((data) => decrypt(siv, data))
    .then((decrypted) => {
      //  console.log(fromUtf8(decrypted));
      return JSON.parse(fromUtf8(fromBase64(fromUtf8(decrypted))));
    });
}

async function encrypt(siv, contractCodeHash, msg) {
  const { pubkey } = generateNewKeyPairFromSeed(empty32Array);
  const plaintext = toUtf8(contractCodeHash + JSON.stringify(msg));
  const ciphertext = await siv.seal(plaintext, [new Uint8Array()]);
  // ciphertext = nonce(32) || wallet_pubkey(32) || ciphertext
  return Uint8Array.from([...nonce, ...pubkey, ...ciphertext]);
}

function decrypt(siv, ciphertext) {
  return siv.open(ciphertext, [new Uint8Array()]);
}

function fromUtf8(data) {
  return new TextDecoder().decode(data);
}

function toUtf8(str) {
  return new TextEncoder().encode(str);
}

function generateNewKeyPairFromSeed(seed) {
  const { private: privkey, public: pubkey } = generateKeyPair(seed);
  return { privkey, pubkey };
}

const stkdScrtContract = 'secret1k6u0cy4feepm6pehnz804zmwakuwdapm69tuc4';
const stkdScrtHashCode = 'f6be719b3c6feb498d3554ca0398eb6b7e7db262acb33f84a8f12106da6bbb09';

export async function secretRedemptionMap() {
  const stkdScrtRedemption = {
    redemptionRate: await querySecretContract(stkdScrtContract, stkdScrtHashCode, {
      staking_info: {
        time: Math.round(new Date().getTime() / 1000),
      },
    })
      .then((d) => parseFloat(d.staking_info.price) / oneMillion)
      .catch((e) => 1),
    unboundingPeriod: 21 + 3,
  };
  return [['stkdSCRT', stkdScrtRedemption]];
}

const qAtom = {
  name: 'ATOM → qATOM',
  dex: 'Shade',
  redemptionKey: 'qATOM',
  poolContract: 'secret1f6kw62rzgn3fwc0jfp7nxjks0l45jv3r6tpc0x',
  offerContractAddr: 'secret19e75l25r6sa6nhdf4lggjmgpw0vmpfvsw5cnpe',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, qAtom),
};

const stkdSCRT = {
  name: 'sSCRT → stkdSCRT',
  dex: 'Shade',
  redemptionKey: 'stkdSCRT',
  poolContract: 'secret1y6w45fwg9ln9pxd6qys8ltjlntu9xa4f2de7sp',
  offerContractAddr: 'secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek',
  tokenCodeHash: 'af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stkdSCRT),
};

const stATOM = {
  name: 'ATOM → stATOM',
  dex: 'Shade',
  redemptionKey: 'strideCosmos',
  poolContract: 'secret1a65a9xgqrlsgdszqjtxhz069pgsh8h4a83hwt0',
  offerContractAddr: 'secret19e75l25r6sa6nhdf4lggjmgpw0vmpfvsw5cnpe',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stATOM),
};

const wstETHaxl = {
  name: 'axlWETH → wstETH.axl',
  dex: 'Shade',
  redemptionKey: 'wstETH',
  poolContract: 'secret1dpqfh2qkxj2s4qz5u9dduux0vcjezp5h7d48lh',
  offerContractAddr: 'secret139qfh3nmuzfgwsx2npnmnjl4hrvj3xq5rmq8a0',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, wstETHaxl),
};

const sINJ = {
  name: 'INJ → sINJ',
  dex: 'Shade',
  redemptionKey: 'strideInj',
  poolContract: 'secret1c26v64jmesejsauxx5uamaycfe4zt3rth3yg4e',
  offerContractAddr: 'secret14706vxakdzkz9a36872cs62vpl5qd84kpwvpew',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  tokenInAmount: oneQuintillion,
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, sINJ),
};

const stOsmo = {
  name: 'OSMO → stOSMO',
  dex: 'Shade',
  redemptionKey: 'strideOsmo',
  poolContract: 'secret1gxqsuht45uh2tpqdpru6z6tsw3uyll6md7mzka',
  offerContractAddr: 'secret150jec8mc2hzyyqak4umv6cfevelr0x9p0mjxgg',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stOsmo),
};

const ampKuji = {
  name: 'KUJI → ampKUJI',
  dex: 'Shade',
  redemptionKey: 'ampKUJI',
  poolContract: 'secret1gsl3rg9tg4qt5rapcvpg2thgfm4lzqy2qu4etc',
  offerContractAddr: 'secret13hvh0rn0rcf5zr486yxlrucvwpzwqu2dsz6zu8',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, ampKuji),
};

const stkAtom = {
  name: 'ATOM → stkATOM',
  dex: 'Shade',
  redemptionKey: 'stkATOM',
  poolContract: 'secret18537ttv4l4k2ea0xp6ay3sv4c243fyjtj2uqz7',
  offerContractAddr: 'secret19e75l25r6sa6nhdf4lggjmgpw0vmpfvsw5cnpe',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stkAtom),
};

const ampWhale = {
  name: 'WHALE → ampWHALE',
  dex: 'Shade',
  redemptionKey: 'ampWHALE',
  poolContract: 'secret1p92v2fmjt3h4jhwrhhxxetrl0kc3ld9mewrdgp',
  offerContractAddr: 'secret1pcftk3ny87zm6thuxyfrtrlm2t8yev5unuvx6c',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, ampWhale),
};

const stJUNO = {
  name: 'JUNO → stJUNO',
  dex: 'Shade',
  redemptionKey: 'strideJuno',
  poolContract: 'secret12wxpcquw2jx6an6da5nxyz6l7qd955u23ljcjn',
  offerContractAddr: 'secret1z6e4skg5g9w65u5sqznrmagu05xq8u6zjcdg4a',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, stJUNO),
};

export const secretPairs = [stkdSCRT, qAtom, stATOM, wstETHaxl, sINJ, stOsmo, ampKuji, stkAtom, ampWhale, stJUNO];

async function simuSwap(tokenInAmount, pairDef) {
  const msg = {
    swap_simulation: {
      offer: {
        token: {
          custom_token: {
            contract_addr: pairDef.offerContractAddr,
            token_code_hash: pairDef.tokenCodeHash,
          },
        },
        amount: `${tokenInAmount}`,
      },
    },
  };
  return querySecretContract(pairDef.poolContract, 'e88165353d5d7e7847f2c84134c3f7871b2eee684ffac9fcf8d99a4da39dc2f2', msg)
    .then((d) => d.swap_simulation.result.return_amount)
    .catch(async (e) => {
      console.log(e);
      if (e instanceof Uint8Array) {
        decrypt(await newSiv(), e).then((decrypted) => console.log(fromUtf8(decrypted)));
      }
      return 0;
    });
}
