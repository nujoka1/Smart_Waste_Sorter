export default function AlertPanel({ alerts }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <h3>Active alerts</h3>
        <span>{alerts.length} alerts</span>
      </div>

      <div className="alertList">
        {alerts.map((alert, index) => (
          <div key={index} className={`alertItem ${alert.severity}`}>
            <h4>{alert.title}</h4>
            <p>{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
