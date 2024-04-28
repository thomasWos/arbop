const lcds = [
  ['terra', 'https://terra-rest.publicnode.com'],
  ['kujira', 'https://kujira-api.polkachu.com'],
  ['neutron', 'https://neutron-rest.publicnode.com'],
  ['migaloo', 'https://migaloo-api.polkachu.com'],
  ['chihuahua', 'https://chihua.api.m.stavr.tech'],
];
console.log(lcds);

export function lcd(contract) {
  return lcds.find(([key]) => contract.startsWith(key))?.[1];
}
