# ESP32 IoT Sensor Wiring & Connection Guide — PackSense AI

## 1. Hardware Sensor Wiring Assumptions

| Sensor Module | Physical Pin | ESP32 GPIO Pin | Protocol / Type |
|---|---|---|---|
| **DHT22 / SHT31** | Data Pin | `GPIO 4` | OneWire Digital (10k Pullup) |
| **MH-Z19B CO2** | RX / TX | `GPIO 16 (RX2)` / `GPIO 17 (TX2)` | Hardware UART Serial |
| **Capacitive Moisture v1.2** | Signal Out | `GPIO 34` | Analog ADC1_CH6 |
| **Analog pH Probe** | Signal Out | `GPIO 35` | Analog ADC1_CH7 |
| **Power Supply** | VCC / GND | `5V Vin` & `GND` | Shared Ground |

---

## 2. Flashing ESP32 Firmware

1. Open `esp32_firmware/esp32_firmware.ino` in Arduino IDE or VS Code PlatformIO.
2. Install required Arduino libraries:
   - `DHT sensor library` by Adafruit
   - `ArduinoJson` by Benoit Blanchon
3. Update `WIFI_SSID`, `WIFI_PASSWORD`, and `BACKEND_INGEST_URL`:
   ```cpp
   const char* BACKEND_INGEST_URL = "http://<YOUR_LOCAL_IP>:8000/api/v1/sensors/ingest";
   ```
4. Select Board `ESP32 Dev Module` and click **Upload**.

---

## 3. Strict Compliance Protocol

When hardware is disconnected, PackSense AI displays:
- `"ESP32 NOT CONNECTED – CONNECT DEVICE TO START LIVE ANALYSIS"`
- `"SENSOR OFFLINE"`
- Zero dummy data is generated.
