export default function Settings() {
  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Settings</h1>
          <p>Device configuration, thresholds, and dashboard preferences.</p>
        </div>
      </div>

      <section className="settingsGrid">
        <div className="card">
          <div className="cardHeader">
            <h3>Device</h3>
            <span>ESP32</span>
          </div>

          <div className="settingsList">
            <div>
              <label>Device ID</label>
              <input value="waste_sorter_001" readOnly />
            </div>

            <div>
              <label>Firmware version</label>
              <input value="0.1.0" readOnly />
            </div>

            <div>
              <label>Upload method</label>
              <input value="Arduino IDE" readOnly />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <h3>Classification thresholds</h3>
            <span>Mock mode</span>
          </div>

          <div className="settingsList">
            <div>
              <label>Moisture threshold (%)</label>
              <input value="60" readOnly />
            </div>

            <div>
              <label>Bin warning level (%)</label>
              <input value="80" readOnly />
            </div>

            <div>
              <label>Bin full level (%)</label>
              <input value="95" readOnly />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
