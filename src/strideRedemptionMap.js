const url = 'https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone';

export const strideRedemptionMap = async () => {
  let redemptionMap;
  await fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      redemptionMap = new Map(data.host_zone.map((obj) => [obj.bech32prefix, obj.redemption_rate]));
    });
  return redemptionMap;
};
