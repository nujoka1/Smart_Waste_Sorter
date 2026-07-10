import AlertPanel from '../components/AlertPanel.jsx';
import { useAlerts } from '../hooks/useAlerts.js';

export default function Alerts() {
  const { alerts } = useAlerts();

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Alerts</h1>
          <p>Operational warnings from bin levels, unknown waste, and device status.</p>
        </div>
      </div>

      <section className="card">
        <div className="cardHeader">
          <h3>Alert summary</h3>
          <span>{alerts.length} active alerts</span>
        </div>

        <div className="alertSummaryGrid">
          <div className="alertSummaryCard warning">
            <h3>Warnings</h3>
            <p>{alerts.filter((alert) => alert.severity === 'warning').length}</p>
          </div>

          <div className="alertSummaryCard info">
            <h3>Info</h3>
            <p>{alerts.filter((alert) => alert.severity === 'info').length}</p>
          </div>

          <div className="alertSummaryCard critical">
            <h3>Critical</h3>
            <p>{alerts.filter((alert) => alert.severity === 'critical').length}</p>
          </div>
        </div>
      </section>

      <AlertPanel alerts={alerts} />
    </>
  );
}
