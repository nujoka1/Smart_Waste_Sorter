# PROJECT MEMORY — IoT-Based Smart Waste Sorting System

## Locked Project Direction

Project title:
IoT-Based Smart Waste Sorting System

Controller:
ESP32 WROOM-32

Upload method:
Arduino IDE

Main Arduino sketch:
firmware/SmartWasteSorter/SmartWasteSorter.ino

Important Arduino rule:
The folder name must be SmartWasteSorter and the main sketch must be SmartWasteSorter.ino.

## Final Bin Categories

1. Plastic
2. Metal
3. Wet / Organic
4. Paper / Glass
5. Unknown / Mixed Waste

## Important Design Decisions

- No weight sensor.
- No HX711.
- No load cell.
- Bin fill monitoring will use ultrasonic sensors.
- Unknown bin is mandatory.
- System must process waste one item at a time.
- Mixed or unclear waste must go to Unknown.
- Dashboard style should follow WasteBank-style UI:
  - sidebar navigation
  - metric cards
  - donut chart
  - bin status cards
  - recent events
  - alerts
  - dark/light mode support

## Main Hardware Blocks

- ESP32
- IR object detection sensor
- Inductive metal sensor
- Capacitive moisture sensor
- Conductive wetness plate
- Color sensor or optional ESP32-CAM
- HC-SR04 ultrasonic sensors for bin fill level
- Servo or stepper routing mechanism
- Buzzer
- LEDs
- OLED display
- 5V regulated power rail
- Common ground

## Main Software Blocks

- ESP32 firmware
- Sensor fusion classifier
- Actuator routing logic
- Bin fill monitoring
- Local alerts
- Firebase backend
- React web dashboard
- React Native mobile app
- Firestore database schema
- Cloud functions
- Project report documentation

## Build Strategy

Phase 1:
Create folder structure and empty files.

Phase 2:
Write ESP32 firmware skeleton.

Phase 3:
Bring up sensors one by one.

Phase 4:
Add classification logic.

Phase 5:
Add servo or stepper routing.

Phase 6:
Add ultrasonic bin monitoring.

Phase 7:
Add Firebase cloud sync.

Phase 8:
Build WasteBank-style dashboard.

Phase 9:
Build mobile app.

Phase 10:
Prepare final report, diagrams, testing, and results.


## Firebase Deployment

Firebase project used:
aion-fc6de

Firebase display name to use:
Smart Waste Sorter / IoT Smart Waste Sorting System

Hosting URL:
https://aion-fc6de.web.app

Dashboard local dev URL:
http://localhost:5188

Dashboard production build folder:
dashboard/dist

Deploy command:
firebase deploy --only hosting

Current deployment status:
Hosting deployment successful.

## Firebase Deployment

Firebase project used:
aion-fc6de

Firebase display name to use:
Smart Waste Sorter / IoT Smart Waste Sorting System

Hosting URL:
https://aion-fc6de.web.app

Dashboard local dev URL:
http://localhost:5188

Dashboard production build folder:
dashboard/dist

Deploy command:
firebase deploy --only hosting

Current deployment status:
Hosting deployment successful.

## APK UI Fix Completed

The Android APK UI was updated from top-tab navigation to a proper mobile drawer/sidebar design.

Final APK navigation behavior:
- Top-left hamburger menu opens sidebar.
- Sidebar slides in from the left.
- Dark overlay appears behind sidebar.
- Close button inside sidebar closes it.
- Clicking a nav item closes sidebar.
- Login/profile section is pinned at the bottom of the sidebar.
- Desktop keeps collapsible sidebar behavior.
- TopTabs component is no longer rendered in App.jsx.

Final debug APK output:
dashboard/android/app/build/outputs/apk/debug/app-debug.apk

Copied final test APK:
~/Desktop/SmartWasteSorter_APK/SmartWasteSorter-final-debug.apk
