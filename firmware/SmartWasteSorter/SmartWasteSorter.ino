#include <Arduino.h>

#include "config.h"
#include "types.h"
#include "sensors.h"
#include "classifier.h"
#include "actuator.h"
#include "bin_monitor.h"
#include "alerts.h"
#include "display.h"
#include "cloud.h"
#include "storage.h"

static void printSensorFrame(
  const SensorFrame& frame,
  const ClassificationResult& result,
  const BinStatus& binStatus
) {
  Serial.println("--------------------------------------------------");

  Serial.print("Object: ");
  Serial.println(frame.objectPresent ? "YES" : "NO");

  Serial.print("Metal: ");
  Serial.println(frame.metalDetected ? "YES" : "NO");

  Serial.print("Moisture raw: ");
  Serial.print(frame.moistureRaw);
  Serial.print(" | Moisture %: ");
  Serial.println(frame.moisturePercent);

  Serial.print("Conductive raw: ");
  Serial.println(frame.conductiveRaw);

  Serial.print("Color pulse: ");
  Serial.println(frame.colorPulse);

  Serial.print("Classification: ");
  Serial.print(categoryName(result.category));
  Serial.print(" | Confidence: ");
  Serial.println(result.confidence, 2);

  Serial.print("Bin distance cm: ");
  Serial.print(binStatus.distanceCm);
  Serial.print(" | Fill %: ");
  Serial.println(binStatus.fillPercent);
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  delay(300);

  Serial.println();
  Serial.println("===============================================");
  Serial.println(SYSTEM_NAME);
  Serial.print("Firmware: ");
  Serial.println(FIRMWARE_VERSION);
  Serial.print("Device ID: ");
  Serial.println(DEVICE_ID);
  Serial.println("Mode: Modular Arduino firmware skeleton");
  Serial.println("===============================================");

  storageBegin();
  sensorsBegin();
  binMonitorBegin();
  actuatorBegin();
  alertsBegin();
  displayBegin();
  cloudBegin();

  displayStatusText("Smart Sorter", "System Ready");
  Serial.println("[SYSTEM] Ready.");
}

void loop() {
  SensorFrame frame = readSensorFrame();
  BinStatus binStatus = readBinStatus();

  if (!frame.objectPresent) {
    alertNormal();
    delay(LOOP_DELAY_MS);
    return;
  }

  delay(SENSOR_SETTLE_MS);

  frame = readSensorFrame();

  ClassificationResult result = classifyWaste(frame);

  if (result.category == WASTE_UNKNOWN) {
    alertUnknown();
  } else if (binStatus.full) {
    alertFull();
  } else if (binStatus.warning) {
    alertWarning();
  } else {
    alertNormal();
  }

  printSensorFrame(frame, result, binStatus);

  routeWaste(result);
  cloudPublishEvent(frame, result, binStatus);

  delay(400);
}
