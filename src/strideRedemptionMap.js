export const strideRedemptionMap = async () => {
  return fetch('https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone')
    .then((resp) => resp.json())
    .then((data) => new Map(data.host_zone.map((obj) => [obj.bech32prefix, obj.redemption_rate])));
};
