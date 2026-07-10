import WeeklyTrendChart from '../components/WeeklyTrendChart.jsx';
import WasteDonutChart from '../components/WasteDonutChart.jsx';
import { useTodayStats } from '../hooks/useTodayStats.js';

export default function Analytics() {
  const { stats } = useTodayStats();

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Analytics</h1>
          <p>Historical waste sorting performance and category distribution.</p>
        </div>
      </div>

      <section className="analyticsSummaryGrid">
        <div className="analyticsSummaryCard">
          <p>Total items</p>
          <h3>{stats.totalItems}</h3>
          <span>Today</span>
        </div>

        <div className="analyticsSummaryCard">
          <p>Accuracy</p>
          <h3>{stats.sortingAccuracy}%</h3>
          <span>Based on non-unknown sorting</span>
        </div>

        <div className="analyticsSummaryCard">
          <p>Average confidence</p>
          <h3>{stats.averageConfidence}%</h3>
          <span>Sensor fusion score</span>
        </div>

        <div className="analyticsSummaryCard">
          <p>Unknown events</p>
          <h3>{stats.unknownItems}</h3>
          <span>Requires manual review</span>
        </div>
      </section>

      <section className="contentGrid">
        <WasteDonutChart data={stats.categoryBreakdown} />
        <WeeklyTrendChart data={stats.weeklyTrend} />
      </section>
    </>
  );
}
