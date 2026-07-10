import { useDeviceHealth } from '../hooks/useDeviceHealth.js';

export default function DeviceHealth() {
  const { health } = useDeviceHealth();

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Device Health</h1>
          <p>ESP32 connectivity, memory, heartbeat, sensor and actuator status.</p>
        </div>
      </div>

      <section className="metricsGrid">
        <div className="metricCard">
          <p className="metricLabel">ESP32</p>
          <h3>{health.esp32}</h3>
          <span>Controller status</span>
        </div>

        <div className="metricCard">
          <p className="metricLabel">WiFi signal</p>
          <h3>{health.wifiSignal} dBm</h3>
          <span>Network strength</span>
        </div>

        <div className="metricCard">
          <p className="metricLabel">Free heap</p>
          <h3>{health.freeHeap}</h3>
          <span>Runtime memory</span>
        </div>

        <div className="metricCard">
          <p className="metricLabel">Heartbeat</p>
          <h3>{health.lastHeartbeat}</h3>
          <span>Last device contact</span>
        </div>
      </section>

      <section className="card">
        <div className="cardHeader">
          <h3>Subsystem status</h3>
          <span>Sensor and actuator checks</span>
        </div>

        <div className="healthGrid">
          {health.sensors.map((sensor) => (
            <div className="healthItem" key={sensor.name}>
              <div>
                <h4>{sensor.name}</h4>
                <p>{sensor.detail}</p>
              </div>

              <span className={`tableBadge ${sensor.status === 'ok' ? 'ok' : 'warning'}`}>
                {sensor.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
