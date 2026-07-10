import { Wifi, Search } from 'lucide-react';

export default function Header({ state }) {
  return (
    <header className="topbar">
      <div>
        <h1>Overview</h1>
        <p>
          {state.systemName} · {state.status} · uptime {state.uptime}
        </p>
      </div>

      <div className="topbarRight">
        <div className="searchBox">
          <Search size={16} />
          <input placeholder="Search events, bins, alerts..." />
        </div>

        <div className="wifiPill">
          <Wifi size={16} />
          <span>{state.wifiSignal} dBm</span>
        </div>
      </div>
    </header>
  );
}
