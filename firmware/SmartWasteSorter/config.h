#ifndef CONFIG_H
#define CONFIG_H

// ======================================================
// IoT-Based Smart Waste Sorting System
// Firmware configuration file
// Board: ESP32 Dev Module
// Upload: Arduino IDE
// ======================================================

#define SYSTEM_NAME        "IoT Smart Waste Sorter"
#define DEVICE_ID          "waste_sorter_001"
#define FIRMWARE_VERSION   "0.1.0"

#define SERIAL_BAUD        115200

// Waste categories:
// 1. Plastic
// 2. Metal
// 3. Wet / Organic
// 4. Paper / Glass
// 5. Unknown

// No weight sensor.
// Bin monitoring uses ultrasonic fill-level detection.

// Classification thresholds
#define MOISTURE_THRESHOLD_PERCENT  60
#define CONDUCTIVE_WET_THRESHOLD    700

// Ultrasonic fill-level calibration in centimetres
#define BIN_EMPTY_DISTANCE_CM       30.0f
#define BIN_FULL_DISTANCE_CM        5.0f
#define BIN_WARNING_PERCENT         80
#define BIN_FULL_PERCENT            95

// Routing servo angles
#define SERVO_PLASTIC_ANGLE         20
#define SERVO_METAL_ANGLE           55
#define SERVO_ORGANIC_ANGLE         90
#define SERVO_PAPER_GLASS_ANGLE     125
#define SERVO_UNKNOWN_ANGLE         160
#define SERVO_HOME_ANGLE            90

// Timing
#define SENSOR_SETTLE_MS            200
#define SORT_HOLD_MS                700
#define LOOP_DELAY_MS               100

#endif
