import React from 'react';
import { Activity, Thermometer, Droplets, Wind, WifiOff, CheckCircle2, ShieldAlert } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function LiveSensors({ sensorData, esp32Connected, lastUpdated }) {
  const readings = sensorData?.readings || {};
  const isOnline = esp32Connected && sensorData?.connection_status === 'CONNECTED';

  const sensorList = [
    {
      name: 'Temperature Sensor (DHT22 / SHT31)',
      value: isOnline && readings.temperature !== null ? `${readings.temperature} °C` : 'N/A',
      unit: '°C',
      status: isOnline && readings.temperature !== null ? 'ONLINE' : 'OFFLINE',
      source: 'LIVE SENSOR DATA'
    },
    {
      name: 'Relative Humidity Sensor (DHT22 / SHT31)',
      value: isOnline && readings.humidity !== null ? `${readings.humidity} %` : 'N/A',
      unit: '% RH',
      status: isOnline && readings.humidity !== null ? 'ONLINE' : 'OFFLINE',
      source: 'LIVE SENSOR DATA'
    },
    {
      name: 'CO2 Gas Concentration Sensor (MH-Z19 NDIR)',
      value: isOnline && readings.co2 !== null ? `${readings.co2} ppm` : 'N/A',
      unit: 'ppm',
      status: isOnline && readings.co2 !== null ? 'ONLINE' : 'OFFLINE',
      source: 'LIVE SENSOR DATA'
    },
    {
      name: 'Food Soil/Moisture Sensor (Capacitive)',
      value: isOnline && readings.moisture !== null ? `${readings.moisture} %` : 'N/A',
      unit: '%',
      status: isOnline && readings.moisture !== null ? 'ONLINE' : 'OFFLINE',
      source: 'LIVE SENSOR DATA'
    },
    {
      name: 'Acidity pH Sensor (Analog Probe)',
      value: isOnline && readings.ph !== null ? `${readings.ph}` : 'N/A',
      unit: 'pH',
      status: isOnline && readings.ph !== null ? 'ONLINE' : 'OFFLINE',
      source: 'LIVE SENSOR DATA'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ESP32 Real-Time Sensor Telemetry</h1>
          <p className="text-sm text-slate-500 mt-1">Live WebSocket feed from physical ESP32 IoT hardware node.</p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          {isOnline ? (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>ESP32: CONNECTED & STREAMING</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-xl border border-rose-200 text-xs font-semibold">
              <WifiOff className="w-4 h-4 text-rose-600" />
              <span>ESP32 NOT CONNECTED – CONNECT DEVICE TO START LIVE ANALYSIS</span>
            </div>
          )}
        </div>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorList.map((s, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-bold text-slate-900">{s.name}</h3>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${s.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {s.status}
              </span>
            </div>

            <div className="py-2">
              <span className="text-3xl font-extrabold text-slate-900">{s.value}</span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500">Last communication: <strong className="text-slate-700">{lastUpdated || 'N/A'}</strong></span>
              {s.status === 'ONLINE' ? <DataSourceBadge type="LIVE SENSOR DATA" /> : <span className="text-rose-600 font-bold">SENSOR OFFLINE</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Strict Compliance Warning */}
      {!isOnline && (
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-xl flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white">Strict No-Dummy-Data Compliance Standard</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              PackSense AI enforces a strict protocol rejecting synthetic or hardcoded numbers. When ESP32 IoT hardware is not connected or streaming, sensor values are explicitly set to <strong>"N/A"</strong> and tagged <strong>"SENSOR OFFLINE"</strong> or <strong>"ESP32 NOT CONNECTED – CONNECT DEVICE TO START LIVE ANALYSIS"</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
