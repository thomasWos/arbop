const lcds = [
  ['osmo', 'https://osmosis-api.polkachu.com'],
  ['terra', 'https://terra-rest.publicnode.com'],
  ['kujira', 'https://kujira-api.polkachu.com'],
  ['neutron', 'https://rest-vertexa.neutron-1.neutron.org'],
  ['juno', 'https://juno-rest.publicnode.com'],
  ['migaloo', 'https://migaloo-api.polkachu.com'],
  ['chihuahua', 'https://chihuahua-rest.publicnode.com'],
  ['archway', 'https://api.mainnet.archway.io'],
  ['inj', 'https://injective-rest.publicnode.com'],
];
console.log(lcds);

export function lcd(contract) {
  return lcds.find(([key]) => contract.startsWith(key))?.[1];
}
