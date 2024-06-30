// https://secret-4.api.trivium.network:1317/swagger/

import * as miscreant from 'miscreant';
import { generateKeyPair } from 'curve25519-js';

const lcdUrl = 'https://secretnetwork-api.highstakes.ch';
const codeHash = 'e88165353d5d7e7847f2c84134c3f7871b2eee684ffac9fcf8d99a4da39dc2f2';

const empty32Array = new Uint8Array(Buffer.alloc(32, 0));
const nonce = empty32Array;
const fakeKey = new Uint8Array([
  248, 24, 153, 160, 20, 71, 22, 226, 185, 239, 57, 17, 11, 65, 67, 231, 36, 199, 102, 223, 164, 45, 133, 137, 223, 33, 119, 169, 155, 169, 194, 224,
]);
const txEncryptionKey = new Uint8Array(fakeKey);
const cryptoProvider = new miscreant.PolyfillCryptoProvider();
const siv = await miscreant.SIV.importKey(txEncryptionKey, 'AES-SIV', cryptoProvider);

const toBase64 = (str) => Buffer.from(str).toString('base64');
const fromBase64 = (str) => Buffer.from(str, 'base64');

export async function querySecretContract(contractAddr, queryMsg) {
  const encrypted = await encrypt(codeHash, queryMsg);
  const encodedQuery = encodeURIComponent(toBase64(encrypted));
  const url = `${lcdUrl}/compute/v1beta1/query/${contractAddr}?query=${encodedQuery}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => decrypt(fromBase64(data.data)))
    .then((decrypted) => JSON.parse(fromUtf8(fromBase64(fromUtf8(decrypted)))))
    .catch((e) => console.log(e));
}

async function encrypt(contractCodeHash, msg) {
  const { pubkey } = generateNewKeyPairFromSeed(empty32Array);
  const plaintext = toUtf8(contractCodeHash + JSON.stringify(msg));
  const ciphertext = await siv.seal(plaintext, [new Uint8Array()]);
  // ciphertext = nonce(32) || wallet_pubkey(32) || ciphertext
  return Uint8Array.from([...nonce, ...pubkey, ...ciphertext]);
}

async function decrypt(ciphertext) {
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

const qAtom = {
  name: 'ATOM → qATOM',
  dex: 'Shade',
  redemptionKey: 'qATOM',
  poolContract: 'secret1f6kw62rzgn3fwc0jfp7nxjks0l45jv3r6tpc0x',
  offerContractAddr: 'secret19e75l25r6sa6nhdf4lggjmgpw0vmpfvsw5cnpe',
  tokenCodeHash: '638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e',
  simuSwap: async (tokenInAmount) => simuSwap(tokenInAmount, qAtom),
};

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
  return querySecretContract(pairDef.poolContract, msg).then((d) => d.swap_simulation.result.return_amount);
}

export const secretPairs = [qAtom];
