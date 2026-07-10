#ifndef ACTUATOR_H
#define ACTUATOR_H

#include "types.h"

void actuatorBegin();
void routeWaste(WasteCategory category);
int categoryToAngle(WasteCategory category);

#endif
