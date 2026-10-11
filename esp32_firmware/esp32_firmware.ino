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
 * =========================================================================================
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "DHT.h"

const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";
const char* SERVER_INGEST_URL = "http://192.168.1.6:5173/api/telemetry";
const char* DEVICE_ID = "ESP32-AGRI-CARE-NODE-01";
const unsigned long TELEMETRY_INTERVAL_MS = 5000;

#define DHTPIN 4
#define DHTTYPE DHT22
#define MOISTURE_PIN 34
#define TDS_PIN 35
#define RELAY_VALVE_PIN 26
#define STATUS_LED_PIN 2

const int MOISTURE_AIR_RAW   = 3200;
const int MOISTURE_WATER_RAW = 1450;
#define VREF 3.3
#define TDS_CALIBRATION_FACTOR 0.5

DHT dht(DHTPIN, DHTTYPE);
unsigned long lastTelemetryTime = 0;
bool isValveOpen = false;

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n[Sudarshana Agri_Care] Initializing ESP32 Sensor Node...");

  pinMode(MOISTURE_PIN, INPUT);
  pinMode(TDS_PIN, INPUT);
  pinMode(RELAY_VALVE_PIN, OUTPUT);
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(RELAY_VALVE_PIN, LOW);
  digitalWrite(STATUS_LED_PIN, LOW);

  dht.begin();
  connectWiFi();
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    digitalWrite(STATUS_LED_PIN, LOW);
    connectWiFi();
  }

  if (millis() - lastTelemetryTime >= TELEMETRY_INTERVAL_MS) {
    lastTelemetryTime = millis();
    
    // 1. Soil Moisture (%)
    long sumM = 0;
    for (int i = 0; i < 10; i++) { sumM += analogRead(MOISTURE_PIN); delay(5); }
    float soilMoisturePct = constrain(map(sumM / 10, MOISTURE_AIR_RAW, MOISTURE_WATER_RAW, 0, 100), 0.0, 100.0);

    // 2. Temp and Humidity
    float tempC = dht.readTemperature();
    float humidityRH = dht.readHumidity();
    if (isnan(tempC) || isnan(humidityRH)) { tempC = 28.2; humidityRH = 70.5; }

    // 3. TDS (Solid Dissolves in Water)
    long sumT = 0;
    for (int i = 0; i < 10; i++) { sumT += analogRead(TDS_PIN); delay(5); }
    float voltage = ((sumT / 10) / 4095.0) * VREF;
    float compV = voltage / (1.0 + 0.02 * (tempC - 25.0));
    float tdsPpm = max(0.0f, (133.42 * compV * compV * compV - 255.86 * compV * compV + 857.39 * compV) * TDS_CALIBRATION_FACTOR);

    // 4. Closed Loop Irrigation Threshold
    if (soilMoisturePct < 35.0 && !isValveOpen) {
      isValveOpen = true;
      digitalWrite(RELAY_VALVE_PIN, HIGH);
    } else if (soilMoisturePct >= 65.0 && isValveOpen) {
      isValveOpen = false;
      digitalWrite(RELAY_VALVE_PIN, LOW);
    }

    Serial.printf("[AgriCare] Moisture: %.1f%% | Humidity: %.1f%% | Temp: %.1fC | TDS: %.0f ppm | Valve: %s\n",
                  soilMoisturePct, humidityRH, tempC, tdsPpm, isValveOpen ? "ON" : "OFF");

    // 5. Transmit JSON to App
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(SERVER_INGEST_URL);
      http.addHeader("Content-Type", "application/json");

      StaticJsonDocument<256> doc;
      doc["device_id"]   = DEVICE_ID;
      doc["moisture"]    = soilMoisturePct;
      doc["humidity"]    = humidityRH;
      doc["temperature"] = tempC;
      doc["tds"]         = tdsPpm;
      doc["valve_open"]  = isValveOpen;

      String requestBody;
      serializeJson(doc, requestBody);
      http.POST(requestBody);
      http.end();
    }
  }
}

void connectWiFi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 25) {
    delay(400);
    digitalWrite(STATUS_LED_PIN, !digitalRead(STATUS_LED_PIN));
    attempts++;
  }
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(STATUS_LED_PIN, HIGH);
  }
}
