#include <Arduino.h>
#include "cloud.h"
#include "sensors.h"

void cloudBegin() {
  // Firebase/MQTT will be added after hardware bring-up.
}

void cloudPublishEvent(const SensorFrame& frame, const ClassificationResult& result, const BinStatus& binStatus) {
  Serial.print("[CLOUD-STUB] category=");
  Serial.print(categoryName(result.category));
  Serial.print(", confidence=");
  Serial.print(result.confidence, 2);
  Serial.print(", fill=");
  Serial.println(binStatus.fillPercent);
}
