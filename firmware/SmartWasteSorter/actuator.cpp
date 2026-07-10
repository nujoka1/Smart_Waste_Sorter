#include <Arduino.h>
#include "actuator.h"
#include "pins.h"
#include "config.h"

int categoryToAngle(WasteCategory category) {
  switch (category) {
    case WASTE_PLASTIC:
      return SERVO_PLASTIC_ANGLE;
    case WASTE_METAL:
      return SERVO_METAL_ANGLE;
    case WASTE_ORGANIC:
      return SERVO_ORGANIC_ANGLE;
    case WASTE_PAPER_GLASS:
      return SERVO_PAPER_GLASS_ANGLE;
    case WASTE_UNKNOWN:
    default:
      return SERVO_UNKNOWN_ANGLE;
  }
}

static void servoPulseAngle(uint8_t pin, int angle) {
  if (angle < 0) angle = 0;
  if (angle > 180) angle = 180;

  int pulseWidthUs = map(angle, 0, 180, 500, 2500);

  digitalWrite(pin, HIGH);
  delayMicroseconds(pulseWidthUs);
  digitalWrite(pin, LOW);
  delayMicroseconds(20000 - pulseWidthUs);
}

static void holdServoAngle(uint8_t pin, int angle, unsigned long holdMs) {
  unsigned long start = millis();

  while (millis() - start < holdMs) {
    servoPulseAngle(pin, angle);
  }
}

void actuatorBegin() {
  pinMode(PIN_SERVO_ROUTER, OUTPUT);
  digitalWrite(PIN_SERVO_ROUTER, LOW);

  holdServoAngle(PIN_SERVO_ROUTER, SERVO_HOME_ANGLE, 800);
}

void routeWaste(WasteCategory category) {
  int angle = categoryToAngle(category);

  Serial.print("[ACTUATOR] Route ");
  Serial.print(category);
  Serial.print(" to angle ");
  Serial.println(angle);

  holdServoAngle(PIN_SERVO_ROUTER, angle, SORT_HOLD_MS);
  holdServoAngle(PIN_SERVO_ROUTER, SERVO_HOME_ANGLE, 350);
}
