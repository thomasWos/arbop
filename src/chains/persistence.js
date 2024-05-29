export async function persistenceRedemptionMap() {
  return fetch('https://persistence-rest.publicnode.com/pstake/liquidstakeibc/v1beta1/host_chains')
    .then((resp) => resp.json())
    .then(
      (data) =>
        new Map(
          data.host_chains.map((chain) => [
            buildName(chain.host_denom),
            {
              redemptionRate: 1 / parseFloat(chain.c_value),
              unboundingPeriod: parseInt(chain.unbonding_factor) * 6,
            },
          ])
        )
    );
}

function buildName(host_denom) {
  return 'stk' + host_denom.slice(1).toUpperCase();
}
