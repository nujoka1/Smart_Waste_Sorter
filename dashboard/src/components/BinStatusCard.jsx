export default function BinStatusCard({ bin }) {
  return (
    <div className="binCard">
      <div className="binHeader">
        <h4>{bin.type}</h4>
        <span className={`statusBadge ${bin.status}`}>{bin.status}</span>
      </div>

      <div className="progressTrack">
        <div className={`progressFill ${bin.status}`} style={{ width: `${bin.fill}%` }} />
      </div>

      <div className="binFooter">
        <span>{bin.fill}% full</span>
        <span>{bin.itemsToday} items today</span>
      </div>
    </div>
  );
}
