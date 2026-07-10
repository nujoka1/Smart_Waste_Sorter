import { useRecentEvents } from '../hooks/useRecentEvents.js';

export default function Events() {
  const { events } = useRecentEvents();

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Events</h1>
          <p>Live audit trail of all sorting decisions and routing actions.</p>
        </div>
      </div>

      <section className="card">
        <div className="cardHeader">
          <h3>Sorting event log</h3>
          <span>Mock live stream</span>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Time</th>
                <th>Category</th>
                <th>Confidence</th>
                <th>Target bin</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event, index) => (
                <tr key={`${event.time}-${index}`}>
                  <td>{event.time}</td>
                  <td>{event.category}</td>
                  <td>{event.confidence}%</td>
                  <td>{event.bin}</td>
                  <td>
                    <span className={event.category === 'Unknown' ? 'tableBadge warning' : 'tableBadge ok'}>
                      {event.category === 'Unknown' ? 'Review' : 'Sorted'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
