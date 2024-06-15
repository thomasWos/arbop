import React, { useState, useEffect } from 'react';
import ArbList from './ArbList';

const ArbLists = () => {
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

  const roarArbs = arbs.filter((a) => a.name.includes('ROAR'));
  const huahuaArbs = arbs.filter((a) => a.name.includes('HUAHUA'));
  const junoArbs = arbs.filter((a) => a.name.includes('JUNO'));
  const whaleArbs = arbs.filter((a) => a.name.includes('WHALE'));
  const egldArbs = arbs.filter((a) => a.name.includes('EGLD'));
  const lunaArbs = arbs.filter((a) => a.name.includes('LUNA'));
  const osmoArbs = arbs.filter((a) => a.name.includes('OSMO'));
  const atomArbs = arbs.filter((a) => a.name.includes('ATOM'));

  const combinedList = [...roarArbs, ...huahuaArbs, ...junoArbs, ...whaleArbs, ...egldArbs, ...lunaArbs, ...osmoArbs, ...atomArbs];
  const exclusionSet = new Set(combinedList.map((a) => a.id));
  const remainingArbs = arbs.filter((a) => !exclusionSet.has(a.id));

  return (
    <div>
      <ArbList arbs={roarArbs} />
      <ArbList arbs={huahuaArbs} />
      <ArbList arbs={junoArbs} />
      <ArbList arbs={whaleArbs} />
      <ArbList arbs={egldArbs} />
      <ArbList arbs={lunaArbs} />
      <ArbList arbs={osmoArbs} />
      <ArbList arbs={atomArbs} />

      <ArbList arbs={remainingArbs} />
      {timestamp && <p>{new Date(timestamp).toLocaleString()}</p>}
    </div>
  );
};

export default ArbLists;
