const lcds = [
  ['archway', 'https://api.mainnet.archway.io'],
  ['chihuahua', 'https://chihuahua-rest.publicnode.com'],
  ['inj', 'https://injective-rest.publicnode.com'],
  ['juno', 'https://juno-rest.publicnode.com'],
  ['kujira', 'https://kujira-api.polkachu.com'],
  ['neutron', 'https://rest-vertexa.neutron-1.neutron.org'],
  ['osmo', 'https://osmosis-api.polkachu.com'],
  ['terra', 'https://terra-rest.publicnode.com'],
];
console.log(lcds);

export function lcd(contract) {
  return lcds.find(([key]) => contract.startsWith(key))?.[1];
}
