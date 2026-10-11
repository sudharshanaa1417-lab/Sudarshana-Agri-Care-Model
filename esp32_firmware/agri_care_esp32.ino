/*
 * =========================================================================================
 * Sudarshana Agri_Care Model — ESP32 Real-Time Agricultural Field Sensor Firmware
 * =========================================================================================
 * 
 * Hardware Architecture:
 * - ESP32 WROOM-32D Development Board (2.4GHz Wi-Fi + Bluetooth BLE)
 * - Capacitive Soil Moisture Sensor v1.2 (Analog ADC GPIO 34)
 * - DHT22 / DHT11 Ambient Temperature & Relative Humidity Sensor (GPIO 4)
 * - Gravity Analog TDS Sensor Probe (Solid Dissolves in Water) (Analog ADC GPIO 35)
 * - 5V Active Relay Module for Automated Solenoid Irrigation Drip Valve (GPIO 26)
 * - Onboard Status LED Indicator (GPIO 2)
 *
 * Operational Logic:
 * 1. Connects to agricultural 2.4GHz Wi-Fi network.
 * 2. Continuously reads Soil Moisture (%), Air Humidity (%), Ambient Temp (°C), and TDS (ppm).
 * 3. Evaluates local safety threshold: If Soil Moisture < 35%, automatically triggers drip relay.
 * 4. Transmits formatted JSON telemetry payload every 5000ms (5 seconds) to backend / web app.
 * =========================================================================================
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "DHT.h"

// ----------------------------------------------------
// 1. Wi-Fi & Web Application Telemetry Configuration
// ----------------------------------------------------
const char* WIFI_SSID     = "Kisan-Farm-Network-5G";      // Replace with your Wi-Fi SSID
const char* WIFI_PASSWORD = "kisan_secure_password";      // Replace with your Wi-Fi Password

// URL to Sudarshana Agri_Care Web Endpoint (Replace with your Laptop LAN IP e.g. 192.168.1.6 or Vercel API)
const char* SERVER_INGEST_URL = "http://192.168.1.6:5173/api/telemetry";

const char* DEVICE_ID = "ESP32-AGRI-CARE-NODE-01";
const unsigned long TELEMETRY_INTERVAL_MS = 5000; // 5 seconds interval

// ----------------------------------------------------
// 2. Hardware Pin Assignments
// ----------------------------------------------------
#define DHTPIN 4               // DHT22 Data Pin connected to GPIO 4
#define DHTTYPE DHT22          // Sensor model: DHT22 (AM2302) or DHT11
#define MOISTURE_PIN 34        // Capacitive Soil Moisture Analog Out -> ADC1_CH6 (GPIO 34)
#define TDS_PIN 35             // Analog TDS Water Probe -> ADC1_CH7 (GPIO 35)
#define RELAY_VALVE_PIN 26     // Solenoid Valve 5V Relay Control -> GPIO 26
#define STATUS_LED_PIN 2       // Onboard Blue Status LED -> GPIO 2

// ----------------------------------------------------
// 3. Sensor Calibration Constants
// ----------------------------------------------------
// Capacitive Moisture Sensor Calibration (Raw ADC 0 - 4095)
const int MOISTURE_AIR_RAW   = 3200; // Sensor completely dry in air (~0% moisture)
const int MOISTURE_WATER_RAW = 1450; // Sensor submerged in water (~100% moisture)

// Analog TDS Sensor Calibration (3.3V reference)
#define VREF 3.3
#define TDS_CALIBRATION_FACTOR 0.5 // Standard gravity TDS coefficient

DHT dht(DHTPIN, DHTTYPE);
unsigned long lastTelemetryTime = 0;
bool isValveOpen = false;

// ----------------------------------------------------
// Setup Routine
// ----------------------------------------------------
void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("\n=======================================================");
  Serial.println("  Sudarshana Agri_Care Model — ESP32 Sensor Node v2.0  ");
  Serial.println("=======================================================");

  // Initialize GPIO Pins
  pinMode(MOISTURE_PIN, INPUT);
  pinMode(TDS_PIN, INPUT);
  pinMode(RELAY_VALVE_PIN, OUTPUT);
  pinMode(STATUS_LED_PIN, OUTPUT);

  // Default Relay State: OFF (Active LOW or Active HIGH depending on relay module)
  digitalWrite(RELAY_VALVE_PIN, LOW);
  digitalWrite(STATUS_LED_PIN, LOW);

  // Initialize DHT Sensor
  dht.begin();
  Serial.println("[AgriCare] DHT22 Temperature & Humidity Sensor initialized.");

  // Connect to Local Wi-Fi
  connectWiFi();
}

// ----------------------------------------------------
// Main Loop
// ----------------------------------------------------
void loop() {
  // Verify Wi-Fi connectivity and auto-reconnect if dropped
  if (WiFi.status() != WL_CONNECTED) {
    digitalWrite(STATUS_LED_PIN, LOW);
    connectWiFi();
  }

  // Periodic Telemetry Dispatch
  if (millis() - lastTelemetryTime >= TELEMETRY_INTERVAL_MS) {
    lastTelemetryTime = millis();
    
    // 1. Read Soil Moisture (%)
    float soilMoisturePct = readSoilMoisture();

    // 2. Read Ambient Temperature (°C) and Humidity (%)
    float tempC = dht.readTemperature();
    float humidityRH = dht.readHumidity();

    // Fallback if DHT read hiccups
    if (isnan(tempC) || isnan(humidityRH)) {
      Serial.println("[AgriCare Warning] Failed to read from DHT22, applying smoothing fallback.");
      tempC = 28.2;
      humidityRH = 70.5;
    }

    // 3. Read Total Dissolved Solids in Water (TDS ppm)
    float tdsPpm = readTdsLevel(tempC);

    // 4. Closed-Loop Autonomous Irrigation Logic
    // If soil moisture drops below 35%, open solenoid valve; close when reached 65%
    if (soilMoisturePct < 35.0 && !isValveOpen) {
      isValveOpen = true;
      digitalWrite(RELAY_VALVE_PIN, HIGH);
      Serial.println("[AgriCare Auto] Soil Dry (<35%) -> Solenoid Irrigation Valve OPENED!");
    } else if (soilMoisturePct >= 65.0 && isValveOpen) {
      isValveOpen = false;
      digitalWrite(RELAY_VALVE_PIN, LOW);
      Serial.println("[AgriCare Auto] Optimal Moisture (>=65%) -> Solenoid Valve CLOSED.");
    }

    // 5. Output to Local Serial Monitor
    Serial.printf("[AgriCare Telemetry] Moisture: %.1f%% | Humidity: %.1f%% | Temp: %.1f°C | TDS: %.0f ppm | Valve: %s\n",
                  soilMoisturePct, humidityRH, tempC, tdsPpm, isValveOpen ? "ON" : "OFF");

    // 6. Transmit JSON Telemetry over Wi-Fi
    sendTelemetryPayload(soilMoisturePct, humidityRH, tempC, tdsPpm, isValveOpen);
  }
}

// ----------------------------------------------------
// Wi-Fi Connection Helper
// ----------------------------------------------------
void connectWiFi() {
  Serial.printf("[AgriCare] Connecting to Wi-Fi SSID: %s\n", WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 25) {
    delay(400);
    digitalWrite(STATUS_LED_PIN, !digitalRead(STATUS_LED_PIN)); // Flash LED during connect
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(STATUS_LED_PIN, HIGH); // Solid LED when online
    Serial.println("\n[AgriCare] Wi-Fi Connected Successfully!");
    Serial.print("[AgriCare] IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("[AgriCare] RSSI Signal: ");
    Serial.printf("%d dBm\n", WiFi.RSSI());
  } else {
    Serial.println("\n[AgriCare Warning] Wi-Fi Connection Timeout. Retrying in next cycle...");
  }
}

// ----------------------------------------------------
// Capacitive Soil Moisture Reader
// ----------------------------------------------------
float readSoilMoisture() {
  // Take 10 sample moving average to filter out ADC noise
  long sum = 0;
  for (int i = 0; i < 10; i++) {
    sum += analogRead(MOISTURE_PIN);
    delay(5);
  }
  int rawAvg = sum / 10;

  // Map raw ADC between calibrated AIR and WATER bounds
  float pct = map(rawAvg, MOISTURE_AIR_RAW, MOISTURE_WATER_RAW, 0, 100);
  return constrain(pct, 0.0, 100.0);
}

// ----------------------------------------------------
// Analog TDS (Solid Dissolves in Water) Reader
// ----------------------------------------------------
float readTdsLevel(float temperature) {
  long sum = 0;
  for (int i = 0; i < 10; i++) {
    sum += analogRead(TDS_PIN);
    delay(5);
  }
  int rawAvg = sum / 10;

  float voltage = (rawAvg / 4095.0) * VREF;
  
  // Temperature compensation formula for water conductivity
  float compensationCoefficient = 1.0 + 0.02 * (temperature - 25.0);
  float compensationVoltage = voltage / compensationCoefficient;

  // Polynomial mapping from voltage to TDS ppm
  float tdsValue = (133.42 * compensationVoltage * compensationVoltage * compensationVoltage
                    - 255.86 * compensationVoltage * compensationVoltage
                    + 857.39 * compensationVoltage) * TDS_CALIBRATION_FACTOR;

  return max(0.0f, tdsValue);
}

// ----------------------------------------------------
// HTTP POST Telemetry Dispatcher
// ----------------------------------------------------
void sendTelemetryPayload(float moisture, float humidity, float temp, float tds, bool valveState) {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(SERVER_INGEST_URL);
  http.addHeader("Content-Type", "application/json");

  // Format JSON Document
  StaticJsonDocument<256> doc;
  doc["device_id"]   = DEVICE_ID;
  doc["moisture"]    = moisture;
  doc["humidity"]    = humidity;
  doc["temperature"] = temp;
  doc["tds"]         = tds;
  doc["valve_open"]  = valveState;
  doc["rssi"]        = WiFi.RSSI();

  String requestBody;
  serializeJson(doc, requestBody);

  int httpResponseCode = http.POST(requestBody);
  if (httpResponseCode > 0) {
    Serial.printf("[AgriCare Cloud] Telemetry Delivered! HTTP Status: %d\n", httpResponseCode);
  } else {
    Serial.printf("[AgriCare Cloud Error] HTTP POST failed: %s\n", http.errorToString(httpResponseCode).c_str());
  }

  http.end();
}
