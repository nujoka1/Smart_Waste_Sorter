# ESP32 to Firestore Data Contract
## IoT-Based Smart Waste Sorting System

This document defines the data format used between the ESP32 firmware, Firestore database, web dashboard, and Android APK.

## System ID

waste_sorter_001

## Main Firestore Paths

systems/waste_sorter_001
systems/waste_sorter_001/bins/plastic
systems/waste_sorter_001/bins/metal
systems/waste_sorter_001/bins/wet_organic
systems/waste_sorter_001/bins/paper_glass
systems/waste_sorter_001/bins/unknown
systems/waste_sorter_001/events/{eventId}
systems/waste_sorter_001/alerts/{alertId}
systems/waste_sorter_001/device_health/current
systems/waste_sorter_001/calibration/current
systems/waste_sorter_001/commands/{commandId}
systems/waste_sorter_001/admin_logs/{logId}

## Bin IDs

plastic
metal
wet_organic
paper_glass
unknown

## Waste Categories

Plastic
Metal
Organic
Paper/Glass
Unknown

## Bin Status Values

ok
warning
full
offline
error

## Command Status Values

pending
processing
completed
failed

## ESP32 Required Outputs

1. Heartbeat/device health
2. Classification event
3. Bin fill-level status
4. Alert events
5. Command status update

## Locked Design Decisions

- No weight sensor.
- No HX711.
- No load cell.
- Bin level is measured using ultrasonic sensors.
- Unknown waste fallback is mandatory.
- Dashboard and Android APK read from Firestore.
- The system processes one item at a time.
