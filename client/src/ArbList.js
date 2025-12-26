import './ArbList.css';

const formatAPY = (apy) => {
  if (!apy) return '';

  const formatted = abbreviateNumber(apy);
  return `≈\u00A0${formatted}%`;
};

const abbreviateNumber = (val) => {
  if (val === undefined || val === null) return '';

  const absVal = Math.abs(val);

  if (absVal >= 1000000) {
    return `${(val / 1000000).toFixed(1)}M`;
  } else if (absVal >= 100000) {
    return `${(val / 1000).toFixed(0)}K`;
  } else if (absVal >= 10000) {
    return `${(val / 1000).toFixed(1)}K`;
  } else if (absVal >= 1000) {
    return `${val.toFixed(0)}`;
  } else {
    return `${val.toFixed(1)}`;
  }
};

const ArbList = ({ arbs }) => {
  return (
    <div className="arb-list">
      {arbs.map((arb) => (
        <div key={arb.id} className={`arb-item ${arb.arb < 0.2 ? 'low-arb' : ''}`}>
          <div className="arb-name">
            {arb.dexUrl ? (
              <a href={arb.dexUrl} target="_blank">
                {arb.name}
              </a>
            ) : (
              arb.name
            )}
          </div>
          <div className="arb-percentage">{arb.arb && `${arb.arb.toFixed(3)}%`}</div>
          <div className="arb-dex">{arb.dex}</div>
          <div className="arb-apy">{formatAPY(arb.apy)}</div>
          <div className="arb-max">{abbreviateNumber(arb.maxSwapInPool)}</div>
        </div>
      ))}
    </div>
  );
};

export default ArbList;
