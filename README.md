# ArbOp: Liquid Staking Derivatives (LSDs) Arbitrage Opportunity Calculator

ArbOp calculates the potential arbitrage opportunities across various Cosmos liquid staking derivatives (LSDs). It fetches data from various staking contracts and liquidity pools, computes the exchange rates, and identifies the LSDs with the most profitable arbitrage opportunities.

## Install the dependencies:

`npm install`

## Server mode

ArbOp provides a simple Express server that exposes the calculated arbitrage opportunities through an API endpoint. To run the server, execute the following command:

`npm start`

The server will start running on http://localhost:3000. You can access the arbitrage opportunities by sending a GET request to the /arbs endpoint.
