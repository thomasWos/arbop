export async function atoneRedemptionMap() {
  const photonConversionRate = await fetch('https://atomone-rest.publicnode.com//atomone/photon/v1/conversion_rate')
    .then((resp) => resp.json())
    .then((data) => parseFloat(data.conversion_rate));

  return [['PHOTON', photonConversionRate]];
}
