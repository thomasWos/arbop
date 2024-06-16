import React, { useState, useEffect } from 'react';
import ArbList from './ArbList';

const arbListSorting = (arbList1, arblist2) => {
  const maxArb1 = Math.max(...arbList1.map((a) => a.arb));
  const maxArb2 = Math.max(...arblist2.map((a) => a.arb));
  return maxArb2 - maxArb1;
};

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

  const combinedList = [roarArbs, huahuaArbs, junoArbs, whaleArbs, egldArbs, lunaArbs, osmoArbs, atomArbs];

  const exclusionSet = new Set(combinedList.flat(1).map((a) => a.id));
  const remainingArbs = arbs.filter((a) => !exclusionSet.has(a.id));

  return (
    <div>
      <div className="arb-header">
        <div className="arb-name">Name</div>
        <div className="arb-percentage">Arb</div>
        <div className="arb-dex">DEX</div>
        <div className="arb-apy">APY</div>
      </div>
      <div>
        {combinedList.sort(arbListSorting).map((arbList) => (
          <ArbList arbs={arbList} />
        ))}
        <ArbList arbs={remainingArbs} />
        {timestamp && <p>{new Date(timestamp).toLocaleString()}</p>}
      </div>
    </div>
  );
};

export default ArbLists;
