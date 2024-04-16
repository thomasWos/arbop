import React, { useState, useEffect } from 'react';
import apiBaseUrl from './config';

const ArbList = () => {
  const [data, setData] = useState({ timestamp: null, arbs: [] });

  useEffect(() => {
    const fetchArbs = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/arbs`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching arbitrage opportunities:', error);
      }
    };
    fetchArbs();

    const interval = setInterval(fetchArbs, 60000); // Fetch arbs every minute
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const { timestamp, arbs } = data;

  return (
    <div>
      <h2>Arbitrage Opportunities</h2>
      {arbs.map((arb) => (
        <div key={arb.id}>
          {arb.name}: {arb.arb.toFixed(3)}% - {arb.dex}
        </div>
      ))}
      {timestamp && <p>{new Date(timestamp).toLocaleString()}</p>}
    </div>
  );
};

export default ArbList;
