#include <Arduino.h>
#include "display.h"

void displayBegin() {
  // OLED display will be added later.
  // This stub keeps the firmware modular and Arduino-compile-safe.
}

void displayStatusText(const char* line1, const char* line2) {
  Serial.print("[DISPLAY] ");
  Serial.print(line1);
  Serial.print(" | ");
  Serial.println(line2);
}
