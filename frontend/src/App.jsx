import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CropDetector from './components/crop/CropDetector';
import IotDashboard from './components/iot/IotDashboard';
import FarmerHub2026 from './components/hub2026/FarmerHub2026';
import PrescriptionHistory from './components/prescriptions/PrescriptionHistory';

export default function App() {
  const [activeTab, setActiveTab] = useState('detect');
  const [language, setLanguage] = useState('en');
  const [esp32Status, setEsp32Status] = useState('online');

  // Real-time telemetry state
  const [telemetryData, setTelemetryData] = useState({
    soilMoisture: 64.5,
    humidity: 71.2,
    temperature: 28.4,
    tdsLevel: 385,
    lastUpdated: new Date().toLocaleTimeString()
  });

  // 24-hour historical telemetry data points
  const [telemetryHistory, setTelemetryHistory] = useState([
    { time: '06:00', moisture: 72.0, temperature: 22.4, humidity: 82.0, tds: 37 },
    { time: '08:00', moisture: 69.5, temperature: 24.8, humidity: 78.5, tds: 38 },
    { time: '10:00', moisture: 66.0, temperature: 27.2, humidity: 74.0, tds: 38 },
    { time: '12:00', moisture: 62.4, temperature: 31.0, humidity: 65.2, tds: 39 },
    { time: '14:00', moisture: 59.8, temperature: 32.5, humidity: 62.0, tds: 39 },
    { time: '16:00', moisture: 58.2, temperature: 30.8, humidity: 66.4, tds: 38 },
    { time: '18:00', moisture: 64.5, temperature: 28.4, humidity: 71.2, tds: 38 }
  ]);

  // Saved Prescriptions list
  const [prescriptions, setPrescriptions] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_prescriptions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSavePrescription = (result) => {
    setPrescriptions((prev) => {
      const updated = [result, ...prev.filter((p) => p.id !== result.id)].slice(0, 20);
      try {
        localStorage.setItem('agri_prescriptions', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
      return updated;
    });
  };

  const handleClearPrescriptions = () => {
    setPrescriptions([]);
    try {
      localStorage.removeItem('agri_prescriptions');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Ambient Floating Glassmorphic Glow Orbs */}
      <div className="fixed top-12 left-12 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed top-1/3 right-12 w-[30rem] h-[30rem] bg-cyan-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-12 left-1/4 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Glass Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        esp32Status={esp32Status}
        language={language}
        setLanguage={setLanguage}
        prescriptionCount={prescriptions.length}
      />

      {/* Main Glass Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'detect' && (
          <CropDetector
            language={language}
            onSavePrescription={handleSavePrescription}
          />
        )}

        {activeTab === 'iot' && (
          <IotDashboard
            language={language}
            esp32Status={esp32Status}
            setEsp32Status={setEsp32Status}
            telemetryData={telemetryData}
            setTelemetryData={setTelemetryData}
            telemetryHistory={telemetryHistory}
            setTelemetryHistory={setTelemetryHistory}
          />
        )}

        {activeTab === '2026' && (
          <FarmerHub2026 language={language} />
        )}

        {activeTab === 'prescriptions' && (
          <PrescriptionHistory
            language={language}
            prescriptions={prescriptions}
            onSelectPrescription={() => {}}
            onClearPrescriptions={handleClearPrescriptions}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Glass Footer */}
      <Footer language={language} setActiveTab={setActiveTab} />
    </div>
  );
}
