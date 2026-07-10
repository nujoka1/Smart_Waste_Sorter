#include "sensors.h"
#include "pins.h"
#include "config.h"

static int adcToPercent(int raw) {
  int percent = map(raw, 400, 3500, 0, 100);
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;
  return percent;
}

static unsigned long readColorPulse() {
  digitalWrite(PIN_COLOR_S2, LOW);
  digitalWrite(PIN_COLOR_S3, LOW);
  delayMicroseconds(200);

  unsigned long pulse = pulseIn(PIN_COLOR_OUT, LOW, 50000UL);

  if (pulse == 0) {
    return 50000UL;
  }

  return pulse;
}

void sensorsBegin() {
  pinMode(PIN_IR_SENSOR, INPUT);
  pinMode(PIN_METAL_SENSOR, INPUT);

  pinMode(PIN_COLOR_S0, OUTPUT);
  pinMode(PIN_COLOR_S1, OUTPUT);
  pinMode(PIN_COLOR_S2, OUTPUT);
  pinMode(PIN_COLOR_S3, OUTPUT);
  pinMode(PIN_COLOR_OUT, INPUT);

  digitalWrite(PIN_COLOR_S0, HIGH);
  digitalWrite(PIN_COLOR_S1, LOW);
}

SensorFrame readSensorFrame() {
  SensorFrame frame;

  frame.objectPresent = digitalRead(PIN_IR_SENSOR) == HIGH;
  frame.metalDetected = digitalRead(PIN_METAL_SENSOR) == LOW;

  frame.moistureRaw = analogRead(PIN_MOISTURE_ADC);
  frame.moisturePercent = adcToPercent(frame.moistureRaw);

  frame.conductiveRaw = analogRead(PIN_CONDUCTIVE_ADC);
  frame.colorPulse = readColorPulse();

  return frame;
}

const char* categoryName(WasteCategory category) {
  switch (category) {
    case WASTE_METAL:
      return "METAL";
    case WASTE_ORGANIC:
      return "ORGANIC";
    case WASTE_PLASTIC:
      return "PLASTIC";
    case WASTE_PAPER_GLASS:
      return "PAPER_GLASS";
    case WASTE_UNKNOWN:
    default:
      return "UNKNOWN";
  }
}
