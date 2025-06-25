import './ArbList.css';

const formatAPY = (apy) => {
  if (!apy) return '';

  const absAPY = Math.abs(apy);

  // For very large numbers, use scientific notation or abbreviated format
  if (absAPY >= 1000000) {
    return `≈ ${(apy / 1000000).toFixed(1)}M%`;
  } else if (absAPY >= 100000) {
    return `≈ ${(apy / 1000).toFixed(0)}K%`;
  } else if (absAPY >= 10000) {
    return `≈ ${(apy / 1000).toFixed(1)}K%`;
  } else if (absAPY >= 1000) {
    return `≈ ${apy.toFixed(0)}%`;
  } else {
    return `≈ ${apy.toFixed(1)}%`;
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
          <div className="arb-max">{arb.maxSwapInPool && `${arb.maxSwapInPool.toFixed(2)}`}</div>
        </div>
      ))}
    </div>
  );
};

export default ArbList;
