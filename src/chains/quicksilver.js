export async function quicksilverRedemptionMap() {
  return fetch('https://quicksilver-rest.publicnode.com/quicksilver/interchainstaking/v1/zones')
    .then((resp) => resp.json())
    .then((data) =>
      data.zones.map((z) => [
        buildqQuicksilverName(z.base_denom),
        {
          redemptionRate: parseFloat(z.redemption_rate),
          unboundingPeriod: parseInt(z.unbonding_period) / 86400000000000,
        },
      ])
    );
}

function buildqQuicksilverName(base_denom) {
  return 'q' + base_denom.slice(1).toUpperCase();
}
