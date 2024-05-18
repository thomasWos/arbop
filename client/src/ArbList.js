import React, { useState, useEffect } from 'react';

const ArbList = () => {
  const [data, setData] = useState({ timestamp: null, arbs: [] });

  useEffect(() => {
    const fetchArbs = async () => {
      try {
        const response = await fetch('/api/arbs');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching arbitrage opportunities:', error);
      }
    };

    const intervalId = setInterval(fetchArbs, 60000); // Fetch arbs every minute
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const { timestamp, arbs } = data;

  return (
    <div>
      <div className="arb-list">
        <div className="arb-header">
          <div className="arb-name">Name</div>
          <div className="arb-percentage">Arb</div>
          <div className="arb-dex">DEX</div>
          <div className="arb-apy">APY</div>
        </div>
        {arbs.map((arb) => (
          <div key={arb.id} className="arb-item">
            <div className="arb-name">{arb.name}</div>
            <div className="arb-percentage">{arb.arb.toFixed(3)}%</div>
            <div className="arb-dex">{arb.dex}</div>
            <div className="arb-apy">{arb.apy ? `≈ ${arb.apy.toFixed(1)}% APY` : ''}</div>
          </div>
        ))}
      </div>
      {timestamp && <p>Last update: {new Date(timestamp).toLocaleString()}</p>}
    </div>
  );
};

export default ArbList;
