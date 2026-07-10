#ifndef TYPES_H
#define TYPES_H

#include <Arduino.h>

enum WasteCategory {
  WASTE_UNKNOWN = 0,
  WASTE_METAL,
  WASTE_ORGANIC,
  WASTE_PLASTIC,
  WASTE_PAPER_GLASS
};

struct SensorFrame {
  bool objectPresent;
  bool metalDetected;
  int moistureRaw;
  int moisturePercent;
  int conductiveRaw;
  unsigned long colorPulse;
};

struct ClassificationResult {
  WasteCategory category;
  float confidence;
};

struct BinStatus {
  float distanceCm;
  int fillPercent;
  bool warning;
  bool full;
};

#endif
