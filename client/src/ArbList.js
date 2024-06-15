import './ArbList.css';

const ArbList = ({ arbs }) => {
  return (
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
  );
};

export default ArbList;
