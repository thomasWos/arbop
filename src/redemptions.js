import { archwayRedemptionMap } from './chains/archway.js';
import { atoneRedemptionMap } from './chains/atone.js';
import { avalancheRedemptionMap } from './chains/avalanche.js';
import { chihuahuaRedemptionMap } from './chains/chihuahua.js';
import { ethereumRedemptionMap } from './chains/ethereum.js';
import { injectiveRedemptionMap } from './chains/injective.js';
import { junoRedemptionMap } from './chains/juno.js';
import { kujiraRedemptionMap } from './chains/kujira.js';
import { multiversxRedemptionMap } from './chains/multiversx.js';
import { neutronRedemptionMap } from './chains/neutron.js';
import { osmosisRedemptionMap } from './chains/osmosis.js';
import { pryzmRedemptionMap } from './chains/pryzm.js';
import { quicksilverRedemptionMap } from './chains/quicksilver.js';
import { secretRedemptionMap } from './chains/secret.js';
import { strideRedemptionMap } from './chains/stride.js';
import { terraRedemptionMap } from './chains/terra.js';

import { printMap } from './utils.js';

export async function fetchRedemptionsMap() {
  const redemptionPromosises = [
    archwayRedemptionMap(),
    atoneRedemptionMap(),
    avalancheRedemptionMap(),
    chihuahuaRedemptionMap(),
    ethereumRedemptionMap(),
    injectiveRedemptionMap(),
    junoRedemptionMap(),
    kujiraRedemptionMap(),
    multiversxRedemptionMap(),
    neutronRedemptionMap(),
    osmosisRedemptionMap(),
    pryzmRedemptionMap(),
    quicksilverRedemptionMap(),
    secretRedemptionMap(),
    strideRedemptionMap(),
    terraRedemptionMap(),
  ];

  const redemptionsResult = await Promise.allSettled(redemptionPromosises);
  const validRedemptions = redemptionsResult.filter((result) => result.status === 'fulfilled').map((result) => result.value);
  const redemptionsList = [].concat(...validRedemptions);

  /* Compute inverse rates */
  const redemptionsInv = redemptionsList.map((r) => {
    const redemp = r[1] instanceof Object ? r[1].redemptionRate : r[1];
    return [r[0] + 'inv', 1 / redemp];
  });

  const allRedemptionsList = [['identity', 1], ...redemptionsList, ...redemptionsInv].sort((a, b) => a[0].localeCompare(b[0]));
  const redemptionMap = new Map(allRedemptionsList);
  printMap(redemptionMap);

  return redemptionMap;
}
