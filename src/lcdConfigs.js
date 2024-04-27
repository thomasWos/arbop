const configMap = new Map();
configMap.set('terra', 'https://rest.cosmos.directory/terra2');
configMap.set('kujira', 'https://kujira-api.polkachu.com/');
configMap.set('neutron', 'https://neutron-rest.publicnode.com');
configMap.set('chihuahua', 'https://chihua.api.m.stavr.tech');
const configs = [...configMap];

export function lcd(contract) {
  return configs.find(([key]) => contract.startsWith(key))?.[1];
}
