import BinStatusCard from '../components/BinStatusCard.jsx';
import { useBinLevels } from '../hooks/useBinLevels.js';

export default function Containers() {
  const { bins } = useBinLevels();

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Containers</h1>
          <p>Dedicated monitoring page for all five waste compartments.</p>
        </div>
      </div>

      <section className="containerGrid">
        {bins.map((bin) => (
          <div className="containerPanel" key={bin.type}>
            <BinStatusCard bin={bin} />

            <div className="containerDetails">
              <div>
                <span>Last emptied</span>
                <strong>{bin.lastEmptied}</strong>
              </div>

              <div>
                <span>Estimated full time</span>
                <strong>{bin.estimatedFullTime}</strong>
              </div>

              <div>
                <span>Recommended action</span>
                <strong>{bin.recommendedAction}</strong>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
