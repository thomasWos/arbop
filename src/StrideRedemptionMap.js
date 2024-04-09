const strideRedemptionMap = async () => {
  let redemptionMap;
  await fetch('https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone')
    .then((response) => response.json())
    .then((data) => {
      redemptionMap = new Map(data.host_zone.map((obj) => [obj.bech32prefix, obj.redemption_rate]));
    });
  return redemptionMap;
};

export default strideRedemptionMap;
