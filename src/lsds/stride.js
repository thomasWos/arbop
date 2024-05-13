export async function strideRedemptionMap() {
  return fetch('https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone')
    .then((resp) => resp.json())
    .then((data) => new Map(data.host_zone.map((obj) => [buildStrideName(obj.bech32prefix), parseFloat(obj.redemption_rate)])));
}

function buildStrideName(bech32prefix) {
  return 'stride' + bech32prefix.charAt(0).toUpperCase() + bech32prefix.slice(1);
}
