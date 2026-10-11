# Sudarshana Agri_Care Model — ESP32 Sensor Hardware Wiring & Setup Guide

## 1. Hardware Bill of Materials (BOM)
- **Microcontroller**: ESP32 WROOM-32D Development Board (Wi-Fi 802.11 b/g/n, BLE v4.2)
- **Soil Moisture**: Capacitive Soil Moisture Sensor v1.2 (Corrosion resistant, analog output)
- **Ambient Climate**: DHT22 (AM2302) Temperature and Humidity Sensor
- **Water Salinity / TDS**: Gravity Analog TDS Sensor Probe (Measures Total Dissolved Solids in ppm)
- **Actuation Relay**: 5V Single Channel Relay Module (Controls 12V DC Solenoid Drip Valve)
- **Power Supply**: 5V 2A Micro-USB or 18650 Lithium-Ion Battery Shield with 5W Solar Panel

---

## 2. Pin Connection Diagram

| Component | Sensor Pin | ESP32 GPIO Pin | Description |
|---|---|---|---|
| **Capacitive Soil Moisture** | VCC | 3.3V | Power (3.3V) |
| | GND | GND | Ground |
| | AOUT | **GPIO 34 (ADC1_CH6)** | Analog Voltage proportional to soil moisture |
| **DHT22 Climate Sensor** | VCC | 3.3V | Power |
| | GND | GND | Ground |
| | DATA | **GPIO 4** | 1-Wire Digital Signal (10kΩ pull-up to 3.3V) |
| **Analog TDS Water Probe** | VCC | 3.3V / 5V | Power |
| | GND | GND | Ground |
| | AOUT | **GPIO 35 (ADC1_CH7)** | Analog Voltage representing dissolved minerals (ppm) |
| **5V Relay (Drip Valve)** | VCC | 5V (VIN) | Relay Coil Power |
| | GND | GND | Ground |
| | IN | **GPIO 26** | Digital High/Low Actuator Trigger |
| **Status LED** | Positive | **GPIO 2** | Blue Onboard LED (Wi-Fi state) |

---

## 3. How to Flash Firmware

1. Install the [Arduino IDE](https://www.arduino.cc/en/software).
2. Go to **File -> Preferences** and add the ESP32 board manager URL:
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. In **Tools -> Board Manager**, install `esp32` by Espressif.
4. Install required libraries from **Sketch -> Include Library -> Manage Libraries**:
   - `ArduinoJson` (v6 or v7)
   - `DHT sensor library` by Adafruit
   - `Adafruit Unified Sensor`
5. Open `esp32_firmware/agri_care_esp32.ino`.
6. Update your Wi-Fi credentials:
   ```cpp
   const char* WIFI_SSID     = "YOUR_WIFI_SSID";
   const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";
   const char* SERVER_INGEST_URL = "http://<YOUR_LAPTOP_IP>:5173/api/telemetry";
   ```
7. Select **Board: ESP32 Dev Module**, choose your COM port, and click **Upload**.
8. Open the Serial Monitor at **115200 baud** to view real-time sensor streams!
