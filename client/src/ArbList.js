import './ArbList.css';

const ArbList = ({ arbs }) => {
  return (
    <div className="arb-list">
      {arbs.map((arb) => (
        <div key={arb.id} className={`arb-item ${arb.arb < 0.2 ? 'low-arb' : ''}`}>
          <div className="arb-name">{arb.name}</div>
          <div className="arb-percentage">{arb.arb && `${arb.arb.toFixed(3)}%`}</div>
          <div className="arb-dex">{arb.dex}</div>
          <div className="arb-apy">{arb.apy && `≈ ${arb.apy.toFixed(1)}%`}</div>
        </div>
      ))}
    </div>
  );
};

export default ArbList;
