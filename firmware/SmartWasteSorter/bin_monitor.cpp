#include <Arduino.h>
#include "bin_monitor.h"
#include "pins.h"
#include "config.h"

void binMonitorBegin() {
  pinMode(PIN_ULTRASONIC_TRIG, OUTPUT);
  pinMode(PIN_ULTRASONIC_ECHO, INPUT);
  digitalWrite(PIN_ULTRASONIC_TRIG, LOW);
}

static float readDistanceCm() {
  digitalWrite(PIN_ULTRASONIC_TRIG, LOW);
  delayMicroseconds(3);

  digitalWrite(PIN_ULTRASONIC_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_ULTRASONIC_TRIG, LOW);

  unsigned long duration = pulseIn(PIN_ULTRASONIC_ECHO, HIGH, 30000UL);

  if (duration == 0) {
    return -1.0f;
  }

  return duration * 0.0343f / 2.0f;
}

static int distanceToFillPercent(float distanceCm) {
  if (distanceCm < 0) return -1;

  float fill = ((BIN_EMPTY_DISTANCE_CM - distanceCm) /
                (BIN_EMPTY_DISTANCE_CM - BIN_FULL_DISTANCE_CM)) * 100.0f;

  if (fill < 0) fill = 0;
  if (fill > 100) fill = 100;

  return (int)fill;
}

BinStatus readBinStatus() {
  BinStatus status;

  status.distanceCm = readDistanceCm();
  status.fillPercent = distanceToFillPercent(status.distanceCm);
  status.warning = status.fillPercent >= BIN_WARNING_PERCENT;
  status.full = status.fillPercent >= BIN_FULL_PERCENT;

  return status;
}
