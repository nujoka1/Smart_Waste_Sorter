#ifndef PINS_H
#define PINS_H

// ======================================================
// ESP32 Pin Mapping
// IoT-Based Smart Waste Sorting System
// ======================================================

// Object detection
#define PIN_IR_SENSOR          34

// Classification sensors
#define PIN_METAL_SENSOR       35
#define PIN_MOISTURE_ADC       32
#define PIN_CONDUCTIVE_ADC     33

// TCS3200 color sensor
#define PIN_COLOR_S0           4
#define PIN_COLOR_S1           5
#define PIN_COLOR_S2           18
#define PIN_COLOR_S3           19
#define PIN_COLOR_OUT          16

// Ultrasonic bin fill monitoring
#define PIN_ULTRASONIC_TRIG    17
#define PIN_ULTRASONIC_ECHO    23

// Routing actuator
#define PIN_SERVO_ROUTER       25

// Alerts
#define PIN_BUZZER             2
#define PIN_LED_RED            15
#define PIN_LED_GREEN          13
#define PIN_LED_YELLOW         12

// I2C: OLED display / future expansion
#define PIN_I2C_SDA            21
#define PIN_I2C_SCL            22

#endif
