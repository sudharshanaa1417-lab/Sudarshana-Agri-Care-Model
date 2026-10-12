/*
  =========================================================================================
  🌾 Sudharshana Agri_Care Model — ESP32 Real-Time Agricultural Sensor Firmware
  =========================================================================================

  HARDWARE CONNECTIONS (Exact User Specification):
  ------------------------------------------------
  1. DHT22 (Air Temperature & Humidity):
     - VCC  -> 3.3V (or 5V depending on breakout module)
     - DATA -> GPIO 4
     - GND  -> GND

  2. DS18B20 (Water Temperature / Probe):
     - VCC  -> 3.3V
     - DATA -> GPIO 27 (Requires 4.7kΩ pull-up resistor between DATA and 3.3V)
     - GND  -> GND

  3. TDS V1.0 (Total Dissolved Solids in Water):
     - VCC  -> 3.3V / 5V
     - Analog Output (AOUT) -> GPIO 34 (ADC1)
     - GND  -> GND

  4. Soil Moisture Sensor (Analog Capacitive / Resistive):
     - VCC  -> 3.3V
     - Analog Output (AOUT) -> GPIO 35 (ADC1)
     - GND  -> GND

  5. Status LED:
     - Built-in Blue LED -> GPIO 2

  REQUIRED ARDUINO IDE LIBRARIES:
  -------------------------------
  Install via Arduino IDE -> Sketch -> Include Library -> Manage Libraries:
  1. "DHT sensor library" by Adafruit (plus Adafruit Unified Sensor dependency)
  2. "OneWire" by Paul Stoffregen
  3. "DallasTemperature" by Miles Burton
  =========================================================================================
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// =========================================================================================
// 1. WI-FI & WEB SERVER CONFIGURATION
// =========================================================================================
// Replace with your 2.4GHz Wi-Fi router or Mobile Hotspot credentials:
const char* WIFI_SSID     = "Kisan-Farm-Network-5G";      // Enter your Wi-Fi SSID
const char* WIFI_PASSWORD = "kisan_secure_password";      // Enter your Wi-Fi Password

// Web Server Telemetry Endpoint:
// When running server.py on your PC, find your PC's IP using 'ipconfig' (e.g. 192.168.1.6 or 10.10.9.36)
// Port 5000 is the AgriCare Flask backend server:
const char* SERVER_URL    = "http://10.10.9.36:5000/api/telemetry";

// Telemetry dispatch interval (milliseconds)
const unsigned long TELEMETRY_INTERVAL_MS = 3000; // Send telemetry every 3 seconds

// Node Identifier
const char* DEVICE_ID     = "ESP32-SUDHARSHANA-NODE";

// =========================================================================================
// 2. PIN DEFINITIONS
// =========================================================================================
#define DHT_PIN       4       // DHT22 Data -> GPIO 4
#define DHT_TYPE      DHT22   // Sensor Model DHT22

#define DS18B20_PIN   27      // DS18B20 OneWire Data -> GPIO 27

#define TDS_PIN       34      // TDS Analog Out -> GPIO 34 (ADC1_CH6)

#define SOIL_PIN      35      // Soil Moisture Analog Out -> GPIO 35 (ADC1_CH7)

#define STATUS_LED    2       // Onboard LED -> GPIO 2

// =========================================================================================
// 3. CALIBRATION CONSTANTS
// =========================================================================================
#define ADC_RESOLUTION 4095.0
#define ADC_VOLTAGE    3.3

// Soil moisture calibration values
// Dry soil (in air)    -> High ADC value (~3200)
// Wet soil (in water)  -> Low ADC value  (~1200)
#define SOIL_DRY 3200
#define SOIL_WET 1200

// Number of analog samples for filtering noise
#define SAMPLE_COUNT 30

// =========================================================================================
// 4. OBJECT INSTANTIATIONS
// =========================================================================================
DHT dht(DHT_PIN, DHT_TYPE);
OneWire oneWire(DS18B20_PIN);
DallasTemperature waterTempSensor(&oneWire);

// =========================================================================================
// 5. GLOBAL SENSOR VARIABLES
// =========================================================================================
float airTemperature   = 25.0;
float humidity         = 60.0;
float waterTemperature = 25.0;
float tdsValue         = 0.0;
float ecValue          = 0.0;
float tdsVoltage       = 0.0;
float soilADC          = 0.0;
float soilMoisture     = 0.0;

unsigned long lastSendTime = 0;

// Function prototypes
void connectToWiFi();
void readSensors();
void sendTelemetryHttp();

// =========================================================================================
// SETUP
// =========================================================================================
void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println();
  Serial.println("================================================================");
  Serial.println("🌾 SUDHARSHANA AGRI_CARE MODEL — ESP32 FIELD NODE INITIALIZING");
  Serial.println("================================================================");

  // Initialize GPIO Pins
  pinMode(STATUS_LED, OUTPUT);
  pinMode(TDS_PIN, INPUT);
  pinMode(SOIL_PIN, INPUT);

  // Configure ESP32 ADC Resolution to 12-bit (0 - 4095)
  analogReadResolution(12);

  // Initialize DHT22
  dht.begin();
  Serial.println("[OK] DHT22 Air Temperature & Humidity initialized on GPIO 4");

  // Initialize DS18B20
  waterTempSensor.begin();
  int dsCount = waterTempSensor.getDeviceCount();
  Serial.printf("[OK] DS18B20 Water Temperature initialized on GPIO 27 (Found: %d sensor)\n", dsCount);

  Serial.println("[OK] TDS V1.0 Sensor configured on GPIO 34");
  Serial.println("[OK] Soil Moisture Sensor configured on GPIO 35");

  // Connect to Wi-Fi
  connectToWiFi();
}

// =========================================================================================
// MAIN LOOP
// =========================================================================================
void loop() {
  // Check Wi-Fi connection and auto-reconnect if dropped
  if (WiFi.status() != WL_CONNECTED) {
    digitalWrite(STATUS_LED, LOW);
    connectToWiFi();
  }

  // Periodic Telemetry Acquisition & Transmission
  if (millis() - lastSendTime >= TELEMETRY_INTERVAL_MS) {
    lastSendTime = millis();

    // 1. Read all physical sensors
    readSensors();

    // 2. Print readable telemetry to Serial Monitor
    Serial.println("----------------------------------------------------------------");
    Serial.printf("[TELEMETRY] Air Temp: %.1f °C | Humidity: %.1f %% RH\n", airTemperature, humidity);
    Serial.printf("[TELEMETRY] Water Temp: %.1f °C (DS18B20)\n", waterTemperature);
    Serial.printf("[TELEMETRY] Soil Moisture: %.1f %% (ADC: %.0f)\n", soilMoisture, soilADC);
    Serial.printf("[TELEMETRY] Water TDS: %.1f ppm | EC: %.3f ms/cm | Voltage: %.2f V\n", tdsValue, ecValue, tdsVoltage);
    Serial.printf("[TELEMETRY] Wi-Fi RSSI: %d dBm | Server: %s\n", WiFi.RSSI(), SERVER_URL);

    // 3. Dispatch JSON payload via HTTP POST
    sendTelemetryHttp();
  }
}

// =========================================================================================
// WI-FI CONNECTION HANDLER
// =========================================================================================
void connectToWiFi() {
  Serial.println();
  Serial.printf("[Wi-Fi] Connecting to SSID: %s\n", WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(300);
    // Blink LED to indicate connection attempt
    digitalWrite(STATUS_LED, !digitalRead(STATUS_LED));
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(STATUS_LED, HIGH); // Solid ON when connected
    Serial.println();
    Serial.println("[Wi-Fi] Connected Successfully!");
    Serial.print("[Wi-Fi] ESP32 Assigned IP: ");
    Serial.println(WiFi.localIP());
    Serial.printf("[Wi-Fi] Signal Strength (RSSI): %d dBm\n", WiFi.RSSI());
    Serial.println("================================================================");
  } else {
    Serial.println();
    Serial.println("[Wi-Fi Warning] Connection timed out. Will retry in next loop.");
  }
}

// =========================================================================================
// SENSOR READING & COMPENSATION LOGIC
// =========================================================================================
void readSensors() {
  // ----------------------------------------------------
  // 1. Read DHT22 (Air Temp & Relative Humidity)
  // ----------------------------------------------------
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  if (!isnan(t) && !isnan(h)) {
    airTemperature = t;
    humidity = h;
  } else {
    Serial.println("[Sensor Warning] DHT22 read failure, retaining previous values.");
  }

  // ----------------------------------------------------
  // 2. Read DS18B20 (Water Temperature)
  // ----------------------------------------------------
  waterTempSensor.requestTemperatures();
  float wt = waterTempSensor.getTempCByIndex(0);

  if (wt != DEVICE_DISCONNECTED_C && wt > -50.0 && wt < 100.0) {
    waterTemperature = wt;
  } else {
    // If DS18B20 probe is disconnected or floating, fallback to air temp or 25.0C
    waterTemperature = (airTemperature > 0) ? airTemperature : 25.0;
  }

  // ----------------------------------------------------
  // 3. Read TDS Sensor (GPIO 34) with Multi-sample Averaging
  // ----------------------------------------------------
  long tdsSum = 0;
  for (int i = 0; i < SAMPLE_COUNT; i++) {
    tdsSum += analogRead(TDS_PIN);
    delay(2);
  }
  float adcAverage = (float)tdsSum / (float)SAMPLE_COUNT;
  tdsVoltage = (adcAverage / ADC_RESOLUTION) * ADC_VOLTAGE;

  // Temperature compensation formula using DS18B20 water temperature
  float compensationCoefficient = 1.0 + 0.02 * (waterTemperature - 25.0);
  float compensatedVoltage = tdsVoltage / compensationCoefficient;

  // Electrical Conductivity (EC) formula
  ecValue = (133.42 * compensatedVoltage * compensatedVoltage * compensatedVoltage
             - 255.86 * compensatedVoltage * compensatedVoltage
             + 857.39 * compensatedVoltage);
  
  if (ecValue < 0.0) ecValue = 0.0;

  // TDS in ppm (parts per million) = EC * conversion factor (0.5)
  tdsValue = ecValue * 0.5;

  // ----------------------------------------------------
  // 4. Read Soil Moisture Sensor (GPIO 35) with Averaging
  // ----------------------------------------------------
  long soilSum = 0;
  for (int i = 0; i < SAMPLE_COUNT; i++) {
    soilSum += analogRead(SOIL_PIN);
    delay(2);
  }
  soilADC = (float)soilSum / (float)SAMPLE_COUNT;

  // Map ADC values: SOIL_DRY (3200) -> 0%, SOIL_WET (1200) -> 100%
  soilMoisture = map(soilADC, SOIL_DRY, SOIL_WET, 0, 100);
  soilMoisture = constrain(soilMoisture, 0, 100);
}

// =========================================================================================
// HTTP POST JSON DISPATCHER
// =========================================================================================
void sendTelemetryHttp() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[HTTP Error] Cannot send telemetry: Wi-Fi Disconnected.");
    return;
  }

  HTTPClient http;
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");
  http.setTimeout(2500); // 2.5 second timeout

  // Build JSON string cleanly without external library dependency
  char jsonBuffer[384];
  snprintf(jsonBuffer, sizeof(jsonBuffer),
    "{"
    "\"device_id\":\"%s\","
    "\"air_temperature\":%.2f,"
    "\"temperature\":%.2f,"
    "\"water_temperature\":%.2f,"
    "\"humidity\":%.2f,"
    "\"soil_moisture\":%.1f,"
    "\"soil_adc\":%.0f,"
    "\"tds_ppm\":%.1f,"
    "\"tds\":%.1f,"
    "\"ec\":%.3f,"
    "\"voltage\":%.2f,"
    "\"rssi\":%d"
    "}",
    DEVICE_ID,
    airTemperature,
    airTemperature,
    waterTemperature,
    humidity,
    soilMoisture,
    soilADC,
    tdsValue,
    tdsValue,
    ecValue,
    tdsVoltage,
    WiFi.RSSI()
  );

  int httpCode = http.POST((uint8_t*)jsonBuffer, strlen(jsonBuffer));

  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK || httpCode == 201) {
      Serial.printf("[AgriCare Cloud] Telemetry Broadcast SUCCESS! (HTTP %d)\n", httpCode);
      // Quick LED blink on successful transmission
      digitalWrite(STATUS_LED, LOW);
      delay(40);
      digitalWrite(STATUS_LED, HIGH);
    } else {
      Serial.printf("[AgriCare Cloud] Server responded with HTTP Code: %d\n", httpCode);
    }
  } else {
    Serial.printf("[AgriCare Cloud Error] HTTP POST failed: %s\n", http.errorToString(httpCode).c_str());
    Serial.println("[Tip] Ensure 'server.py' is running on your PC and your PC Firewall permits port 5000.");
  }

  http.end();
}
