import React, { useState, useEffect } from 'react';

const ArbList = () => {
  const [data, setData] = useState({ timestamp: null, arbs: [] });

  useEffect(() => {
    const fetchArbs = async () => {
      try {
        const response = await fetch('arbs');
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

      <ul>
        {arbs.map((arb) => (
          <li key={arb.id}>
            {arb.id}: {arb.arb.toFixed(3)}%
          </li>
        ))}
      </ul>

      {timestamp && <p>{new Date(timestamp).toLocaleString()}</p>}
    </div>
  );
};

export default ArbList;