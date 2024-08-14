const lcds = [
  ['osmo', 'https://osmosis-api.polkachu.com'],
  ['terra', 'https://terra-rest.publicnode.com'],
  ['kujira', 'https://kujira-api.polkachu.com'],
  ['neutron', 'https://neutron-rest.publicnode.com'],
  ['juno', 'https://juno-rest.publicnode.com'],
  ['migaloo', 'https://migaloo-api.polkachu.com'],
  ['chihuahua', 'https://chihua.api.m.stavr.tech'],
  ['persistence', 'https://persistence-rest.publicnode.com'],
  ['archway', 'https://rest-archway.theamsolutions.info'],
  ['inj', 'https://injective-api.polkachu.com'],
];
console.log(lcds);

export function lcd(contract) {
  return lcds.find(([key]) => contract.startsWith(key))?.[1];
}
