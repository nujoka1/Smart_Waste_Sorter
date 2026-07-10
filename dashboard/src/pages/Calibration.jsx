import { useCalibration } from '../hooks/useCalibration.js';

export default function Calibration() {
  const { calibration } = useCalibration();

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Calibration</h1>
          <p>Sensor thresholds and routing angles used by the ESP32 firmware.</p>
        </div>
      </div>

      <section className="settingsGrid">
        <div className="card">
          <div className="cardHeader">
            <h3>Sensor thresholds</h3>
            <span>Read-only mock values</span>
          </div>

          <div className="calibrationList">
            {calibration.thresholds.map((item) => (
              <div className="calibrationItem" key={item.key}>
                <div>
                  <h4>{item.key}</h4>
                  <p>{item.description}</p>
                </div>

                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <h3>Servo routing angles</h3>
            <span>Bin alignment map</span>
          </div>

          <div className="calibrationList">
            {calibration.servoAngles.map((item) => (
              <div className="calibrationItem" key={item.bin}>
                <div>
                  <h4>{item.bin}</h4>
                  <p>Router angle for this bin</p>
                </div>

                <strong>{item.angle}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
