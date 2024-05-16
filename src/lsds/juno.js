import { queryContract } from '../utils.js';

const wyJunoContract = 'juno1snv8z7j75jwfce4uhkjh5fedpxjnrx9v20ffflzws57atshr79yqnw032r';

export async function junoRedemptionMap() {
  const wyJunoRate = await queryContract(wyJunoContract, { exchange_rate: {} }).then((d) => parseFloat(d.exchange_rate));
  return new Map([['wyJUNO', wyJunoRate]]);
}
