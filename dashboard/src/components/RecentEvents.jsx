export default function RecentEvents({ events }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <h3>Recent events</h3>
        <span>Live feed</span>
      </div>

      <div className="eventList">
        {events.map((event, index) => (
          <div key={`${event.time}-${index}`} className="eventItem">
            <div className="eventIcon">{event.category[0]}</div>
            <div>
              <h4>{event.category}</h4>
              <p>{event.time} · {event.bin}</p>
            </div>
            <strong>{event.confidence}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
