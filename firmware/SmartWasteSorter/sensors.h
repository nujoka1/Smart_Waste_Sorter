#ifndef SENSORS_H
#define SENSORS_H

#include <Arduino.h>
#include "types.h"

void sensorsBegin();
SensorFrame readSensorFrame();
const char* categoryName(WasteCategory category);

#endif
