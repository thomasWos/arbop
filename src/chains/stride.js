export async function strideRedemptionMap() {
  return fetch('https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone')
    .then((resp) => resp.json())
    .then((data) =>
      data.host_zone.map((obj) => [
        buildStrideName(obj.bech32prefix),
        {
          redemptionRate: parseFloat(obj.redemption_rate),
          unboundingPeriod: parseInt(obj.unbonding_period) + parseInt(obj.unbonding_period) / 7,
        },
      ])
    );
}

function buildStrideName(bech32prefix) {
  return 'stride' + bech32prefix.charAt(0).toUpperCase() + bech32prefix.slice(1);
}
