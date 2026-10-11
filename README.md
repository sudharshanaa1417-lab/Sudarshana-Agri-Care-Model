# 🌾 Sudharshana Agri_Care Model
### Intelligent AI Crop Disease Detection & ESP32 IoT Real-Time Agricultural Monitoring System

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-sudharshanaa1417--lab-181717?style=for-the-badge&logo=github)](https://github.com/sudharshanaa1417-lab)
[![IoT Hardware](https://img.shields.io/badge/Hardware-ESP32%20WROOM--32-E7352C?style=for-the-badge&logo=espressif)](https://espressif.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📖 1. Overview

**Sudharshana Agri_Care Model** is a next-generation agricultural decision-support ecosystem built for rural farmers in India and globally. Designed to bridge the gap between advanced agricultural science and grassroots farming, the platform combines **Computer Vision Leaf Diagnostics**, **Zero-Cost Organic Homemade Remedies**, **Calibrated Chemical/Bio-Fertilizer Schedules**, and **Live ESP32 Field Telemetry**.

### 🌟 Core Highlights
1. **Camera & Device Folder Diagnostic**: Instant leaf image capture via mobile/laptop camera or device folders with real-time chlorophyll, necrosis, and lesion pattern scanning.
2. **Healthy vs. Affected Triage**:
   - **Healthy Crops**: Displays crop name, 98%+ health score, and proactive yield maintenance & organic bio-spray schedules.
   - **Affected Crops**: Pinpoints disease name, pathogen type, severity percentage, symptom breakdown, 100% natural homemade remedies (Chaas + Hing, Neem seed extract, Wood ash, Baking soda), recommended agro-dealer medicines (Mancozeb, Copper Oxychloride, etc.), and exact daily/weekly application schedules.
3. **Voice Audio Advisory**: Vernacular text-to-speech audio that reads prescriptions aloud in English, Hindi, Tamil, Telugu, and Kannada for farmers.
4. **ESP32 IoT Real-Time Telemetry Node**:
   - Live Wi-Fi connection indicator (`ONLINE` / `OFFLINE` / `SIMULATED`).
   - Four vital parameters: **Soil Moisture Level (%)**, **Ambient Humidity (% RH)**, **Field Temperature (°C / °F)**, and **Solid Dissolves in Water Level (TDS in ppm)**.
   - Closed-loop autonomous solenoid drip irrigation valve control.
5. **2026 Strategic Farmer Requirements Hub**:
   - Hyperlocal 72-hour climate resilience warnings.
   - Precision groundwater preservation & automated drip.
   - Soil organic carbon (SOC) & carbon credit monetization (₹1,500/acre).
   - Real-time 2026 APMC Mandi rates via e-NAM.
   - 2026 Indian Government Subsidies Portal (PM-Kisan, PMKSY, Soil Health Card, PMFBY, SMAM).

---

## 🚀 2. Quickstart & Local Execution

### Localhost Access URLs
- **Local Machine**: [http://localhost:5173/](http://localhost:5173/)
- **Local Network / Mobile Access (Same Wi-Fi)**: [http://192.168.1.6:5173/](http://192.168.1.6:5173/)

```bash
# 1. Clone repository
git clone https://github.com/sudharshanaa1417-lab/Sudharshana-Agri-Care-Model.git
cd Sudharshana-Agri-Care-Model

# 2. Install dependencies
cd frontend
npm install

# 3. Start local development server
npm run dev
```

---

## ☁️ 3. Deploy to Vercel in 1 Click

The project includes pre-configured `vercel.json` files at the root and frontend for zero-configuration deployment:

### Method A: Deploy via GitHub (Recommended)
1. Push your repository to your GitHub account: `https://github.com/sudharshanaa1417-lab/Sudharshana-Agri-Care-Model`.
2. Open [Vercel Dashboard](https://vercel.com/new).
3. Select **Import Git Repository** and choose `Sudharshana-Agri-Care-Model`.
4. Vercel automatically detects **Vite** with the build command `npm run build --prefix frontend` and output directory `frontend/dist`.
5. Click **Deploy**! Your site is live in under 45 seconds.

### Method B: Deploy via Vercel CLI
```bash
npx vercel --prod
```

---

## 📡 4. ESP32 IoT Sensor Node Hardware Setup

The ESP32 firmware is located in `esp32_firmware/agri_care_esp32.ino`.

### Hardware Bill of Materials & Pinouts
| Component | Pin | ESP32 GPIO | Function |
|---|---|---|---|
| Capacitive Soil Moisture v1.2 | AOUT | **GPIO 34 (ADC1_CH6)** | Volumetric soil water content (0–100%) |
| DHT22 / AM2302 Sensor | DATA | **GPIO 4** | Ambient temperature (°C) & Humidity (%) |
| Gravity Analog TDS Probe | AOUT | **GPIO 35 (ADC1_CH7)** | Dissolved solids / irrigation salinity (ppm) |
| 5V Relay Actuator | IN | **GPIO 26** | Solenoid Drip Irrigation Valve control |
| Status LED Indicator | Positive | **GPIO 2** | Wi-Fi link status |

### Flashing Instructions
1. Open `esp32_firmware/agri_care_esp32.ino` in Arduino IDE.
2. Enter your Wi-Fi SSID and Password.
3. Set `SERVER_INGEST_URL = "http://192.168.1.6:5173/api/telemetry";` (or your deployed Vercel domain).
4. Select **ESP32 Dev Module** and upload at 115200 baud.

---

## 🚜 5. What are the Requirements of Farmers in 2026?

| Pillar | 2026 Agrarian Challenge | Sudharshana Agri_Care Solution |
|---|---|---|
| **1. Climate Resilience** | Unseasonal storms, heatwaves, and hailstorms ruining harvest. | 72-hour hyperlocal micro-climate alerts advising whether to spray or delay harvest. |
| **2. Groundwater Preservation** | Water table falling 2–4m annually in Punjab, Haryana, Tamil Nadu. | Automated closed-loop drip irrigation triggering below 35% soil moisture to save 42% water. |
| **3. Soil Carbon & Carbon Credits** | Soil organic carbon <0.4% causing fertilizer fatigue. | Digital MRV validation for zero-till farmers to earn ₹1,200–₹2,000/acre in carbon credits. |
| **4. Mandi Price Discovery** | Middlemen taking 30–50% commission during harvest gluts. | Real-time APMC Mandi rates and e-NAM integration to identify top regional market prices. |
| **5. Solar-Powered AgTech** | Expensive industrial sensors costing ₹50,000+ with SIM fees. | Under ₹2,000 open-source ESP32 solar nodes with Wi-Fi mesh telemetry. |
| **6. 2026 Welfare Subsidies** | Complex paperwork for government programs. | 1-Click eligibility portal for PM-Kisan, PMKSY (45–55% drip subsidy), and PMFBY insurance. |
| **7. Vernacular Voice Access** | High digital literacy barriers for elder rural farmers. | Multi-language voice assistant speaking in Hindi, Tamil, Telugu, and Kannada. |

---

## 📁 6. Repository File Structure

```
SIH2026-PS2/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   └── AgriLogo.jsx            # Unique animated SVG branding logo
│   │   │   ├── crop/
│   │   │   │   ├── CropDetector.jsx        # Camera, file upload, AI scanner & diagnosis
│   │   │   │   └── SampleLeafVisual.jsx    # Offline-ready SVG botanical leaf renderer
│   │   │   ├── iot/
│   │   │   │   └── IotDashboard.jsx        # ESP32 live gauges (Moisture, Temp, Humidity, TDS)
│   │   │   ├── hub2026/
│   │   │   │   └── FarmerHub2026.jsx       # 2026 Farmer Requirements, Subsidies & Mandi
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx              # Navigation, ESP32 status, vernacular switcher
│   │   │   │   └── Footer.jsx              # Brand footer, helpline & links
│   │   │   └── prescriptions/
│   │   │       └── PrescriptionHistory.jsx # Saved digital advisory cards
│   │   ├── data/
│   │   │   ├── cropDiseases.js             # Crops, diseases, home remedies & fertilizers
│   │   │   ├── farmerRequirements2026.js   # 2026 challenges, solutions & mandi prices
│   │   │   └── translations.js             # Vernacular multi-language dictionary
│   │   ├── services/
│   │   │   └── imageDiagnosis.js           # Computer vision & color heuristic engine
│   │   ├── App.jsx                         # Main master orchestrator
│   │   ├── index.css                       # Agrarian theme & animations
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json
├── esp32_firmware/
│   ├── agri_care_esp32.ino                 # Complete Arduino C++ firmware
│   ├── esp32_firmware.ino                  # Synced firmware
│   └── README.md                           # Hardware schematic & wiring pinouts
├── package.json                            # Root package scripts
├── vercel.json                             # Root Vercel deployment configuration
├── .gitignore
└── README.md
```

---

## 👨‍💻 7. Author & Push Instructions

- **GitHub ID**: [`sudharshanaa1417-lab`](https://github.com/sudharshanaa1417-lab)
- **Model Name**: **Sudharshana Agri_Care Model**
- **Kisan Call Center Helpline**: 1800-180-1551 (Toll-Free 24x7)
