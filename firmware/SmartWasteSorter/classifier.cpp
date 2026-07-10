#include "classifier.h"
#include "config.h"

ClassificationResult classifyWaste(const SensorFrame& frame) {
  ClassificationResult result;
  result.category = WASTE_UNKNOWN;
  result.confidence = 0.0f;

  if (frame.metalDetected) {
    result.category = WASTE_METAL;
    result.confidence = 0.99f;
    return result;
  }

  bool capacitiveWet = frame.moisturePercent >= MOISTURE_THRESHOLD_PERCENT;
  bool conductiveWet = frame.conductiveRaw >= CONDUCTIVE_WET_THRESHOLD;

  if (capacitiveWet && conductiveWet) {
    result.category = WASTE_ORGANIC;
    result.confidence = 0.95f;
    return result;
  }

  if (capacitiveWet || conductiveWet) {
    result.category = WASTE_ORGANIC;
    result.confidence = 0.70f;
    return result;
  }

  // Temporary TCS3200 rule for first hardware bring-up.
  // Lower pulse generally means stronger reflected frequency.
  if (frame.colorPulse < 12000UL) {
    result.category = WASTE_PLASTIC;
    result.confidence = 0.85f;
    return result;
  }

  if (frame.colorPulse < 35000UL) {
    result.category = WASTE_PAPER_GLASS;
    result.confidence = 0.80f;
    return result;
  }

  return result;
}
