import Header from '../components/Header.jsx';
import MetricCard from '../components/MetricCard.jsx';
import BinStatusCard from '../components/BinStatusCard.jsx';
import WasteDonutChart from '../components/WasteDonutChart.jsx';
import WeeklyTrendChart from '../components/WeeklyTrendChart.jsx';
import RecentEvents from '../components/RecentEvents.jsx';
import AlertPanel from '../components/AlertPanel.jsx';

import { useSystemState } from '../hooks/useSystemState.js';
import { useBinLevels } from '../hooks/useBinLevels.js';
import { useTodayStats } from '../hooks/useTodayStats.js';
import { useRecentEvents } from '../hooks/useRecentEvents.js';
import { useAlerts } from '../hooks/useAlerts.js';

export default function Dashboard() {
  const { state } = useSystemState();
  const { bins } = useBinLevels();
  const { stats } = useTodayStats();
  const { events } = useRecentEvents();
  const { alerts } = useAlerts();

  return (
    <>
      <Header state={state} />

      <section className="metricsGrid">
        <MetricCard label="Total sorted today" value={stats.totalItems} helper="All accepted waste items" />
        <MetricCard label="Recyclable waste" value={stats.recyclableItems} helper="Plastic, metal, paper/glass" />
        <MetricCard label="Organic waste" value={stats.organicItems} helper="Wet / biodegradable category" />
        <MetricCard label="Unknown / mixed" value={stats.unknownItems} helper="Routed for manual review" />
      </section>

      <section className="contentGrid">
        <div className="leftStack">
          <WasteDonutChart data={stats.categoryBreakdown} />
          <WeeklyTrendChart data={stats.weeklyTrend} />
        </div>

        <div className="rightStack">
          <div className="operationCard">
            <p>Emptying Detection</p>
            <h2>1 bin needs attention</h2>
            <span>Organic bin is above warning threshold.</span>
          </div>

          <RecentEvents events={events} />
          <AlertPanel alerts={alerts} />
        </div>
      </section>

      <section className="card">
        <div className="cardHeader">
          <h3>Container fill levels</h3>
          <span>Live ultrasonic monitoring</span>
        </div>

        <div className="binGrid">
          {bins.map((bin) => (
            <BinStatusCard key={bin.type} bin={bin} />
          ))}
        </div>
      </section>
    </>
  );
}
