#ifndef CLOUD_H
#define CLOUD_H

#include "types.h"

void cloudBegin();
void cloudPublishEvent(const SensorFrame& frame, const ClassificationResult& result, const BinStatus& binStatus);

#endif
