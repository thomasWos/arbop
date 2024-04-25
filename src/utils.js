export function arbitrage(exchangeRate, tokenInAmount, tokenOutAmount) {
  const returnAmount = exchangeRate * tokenOutAmount;
  const rate = returnAmount / tokenInAmount;
  return (rate - 1) * 100;
}
