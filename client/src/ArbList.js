import React, { useState, useEffect } from 'react';

const ArbList = () => {
  const [data, setData] = useState({ timestamp: null, arbs: [] });

  useEffect(() => {
    const fetchArbs = async () => {
      try {
        const data = await fetch('/api/arbs').then((r) => r.json());
        setData(data);
      } catch (error) {
        console.error('Error fetching arbitrage opportunities:', error);
      }
    };
    fetchArbs();

    const interval = setInterval(fetchArbs, 10000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
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
          <div key={arb.id} className={`arb-item ${arb.arb < 0.2 ? 'low-arb' : ''}`}>
            <div className="arb-name">{arb.name}</div>
            <div className="arb-percentage">{arb.arb.toFixed(3)}%</div>
            <div className="arb-dex">{arb.dex}</div>
            <div className="arb-apy">{arb.apy ? `≈ ${arb.apy.toFixed(1)}% APY` : ''}</div>
          </div>
        ))}
      </div>
      {timestamp && <p>{new Date(timestamp).toLocaleString()}</p>}
    </div>
  );
};

export default ArbList;
