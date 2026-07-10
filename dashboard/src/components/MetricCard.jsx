export default function MetricCard({ label, value, helper, tone = 'default' }) {
  return (
    <div className={`metricCard ${tone}`}>
      <p className="metricLabel">{label}</p>
      <h3>{value}</h3>
      <span>{helper}</span>
    </div>
  );
}
