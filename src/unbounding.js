import { queryContract } from './utils.js';
import { bech32 } from 'bech32';
import 'dotenv/config';

const anyCosmosAdd = process.env.COSMOS_ADDRESS;
if (!anyCosmosAdd) {
  throw new Error('Please provide a Cosmos address as an environment variable');
}
const decodedWords = bech32.decode(anyCosmosAdd).words;
const myTerraAdd = bech32.encode('terra', decodedWords);
const myHuahuaAdd = bech32.encode('chihuahua', decodedWords);
const myOsmoAdd = bech32.encode('osmo', decodedWords);

async function nextUnbound(lsdContract, myAdd, denom) {
  const unboundByUserMsgResult = await queryContract(lsdContract, {
    unbond_requests_by_user: {
      user: myAdd,
    },
  });
  const nextUnbound = unboundByUserMsgResult[0]?.id;
  if (nextUnbound !== undefined) {
    const previousBatchesMsg = {
      previous_batches: {
        start_after: parseInt(nextUnbound) - 1,
      },
    };

    const previousBatchesResult = await queryContract(lsdContract, previousBatchesMsg);
    const nextUnbondEndTime = previousBatchesResult[0]?.est_unbond_end_time;
    if (nextUnbondEndTime !== undefined) {
      return {
        denom,
        date: new Date(nextUnbondEndTime * 1000),
      };
    }
  }
  return null;
}

async function main() {
  const promises = [
    nextUnbound('terra1l2nd99yze5fszmhl5svyh5fky9wm4nz4etlgnztfu4e8809gd52q04n3ea', myTerraAdd, 'bLUNA'),
    nextUnbound('chihuahua1psf89r2g9vdlttrjphspcpzzfx87r2r4nl5fg703ky42mp2706wsw5330f', myHuahuaAdd, 'bHUAHA'),
    nextUnbound('osmo1s3l0lcqc7tu0vpj6wdjz9wqpxv8nk6eraevje4fuwkyjnwuy82qsx3lduv', myOsmoAdd, 'bOsmo'),
  ];

  const results = await Promise.all(promises);
  const filteredResults = results.filter((result) => result !== null);
  filteredResults.sort((a, b) => a.date - b.date);

  filteredResults.forEach((result) => {
    console.log(`${result.denom} ${result.date.toLocaleString()}`);
  });
}

main();
