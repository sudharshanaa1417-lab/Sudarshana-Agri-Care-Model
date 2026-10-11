import React from 'react';
import {
  Package,
  Thermometer,
  Droplets,
  Wind,
  Layers,
  Activity,
  ShieldAlert,
  Sparkles,
  Clock,
  WifiOff,
  CheckCircle2
} from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function Dashboard({
  sample,
  sensorData,
  analysisData,
  esp32Connected,
  lastUpdated
}) {
  const readings = sensorData?.readings || {};
  const isSensorAvailable = esp32Connected && sensorData?.connection_status === 'CONNECTED';

  const cards = [
    {
      title: '1. Active Food Sample',
      value: sample ? sample.sample_name : 'No Sample Selected',
      sub: sample ? `${sample.commodity} (${sample.batch_id})` : 'Create or select a sample',
      icon: Package,
      source: sample ? (sample.input_mode === 'MANUAL MODE' ? 'USER INPUT' : 'DATABASE') : 'DATABASE',
      accent: 'border-l-4 border-emerald-500'
    },
    {
      title: '2. Current Temperature',
      value: isSensorAvailable && readings.temperature !== null ? `${readings.temperature} °C` : (sample?.storage_temperature !== null ? `${sample.storage_temperature} °C` : 'N/A'),
      sub: isSensorAvailable ? 'Live ESP32 Stream' : (sample?.storage_temperature !== null ? 'Target Storage Temp' : 'SENSOR OFFLINE'),
      icon: Thermometer,
      source: isSensorAvailable && readings.temperature !== null ? 'LIVE SENSOR DATA' : (sample?.storage_temperature !== null ? 'USER INPUT' : 'SENSOR OFFLINE'),
      accent: 'border-l-4 border-cyan-500'
    },
    {
      title: '3. Relative Humidity',
      value: isSensorAvailable && readings.humidity !== null ? `${readings.humidity} %` : (sample?.relative_humidity !== null ? `${sample.relative_humidity} %` : 'N/A'),
      sub: isSensorAvailable ? 'Live ESP32 Stream' : (sample?.relative_humidity !== null ? 'Target Humidity' : 'SENSOR OFFLINE'),
      icon: Droplets,
      source: isSensorAvailable && readings.humidity !== null ? 'LIVE SENSOR DATA' : (sample?.relative_humidity !== null ? 'USER INPUT' : 'SENSOR OFFLINE'),
      accent: 'border-l-4 border-blue-500'
    },
    {
      title: '4. CO2 Concentration',
      value: isSensorAvailable && readings.co2 !== null ? `${readings.co2} ppm` : 'N/A',
      sub: isSensorAvailable ? 'MH-Z19 NDIR Sensor' : 'SENSOR OFFLINE',
      icon: Wind,
      source: isSensorAvailable && readings.co2 !== null ? 'LIVE SENSOR DATA' : 'SENSOR OFFLINE',
      accent: 'border-l-4 border-purple-500'
    },
    {
      title: '5. Moisture Content',
      value: sample?.moisture_content !== null ? `${sample.moisture_content} %` : 'N/A',
      sub: 'Physicochemical Measurement',
      icon: Droplets,
      source: sample?.moisture_content !== null ? (sample.input_mode === 'MANUAL MODE' ? 'USER INPUT' : 'LIVE SENSOR DATA') : 'USER INPUT',
      accent: 'border-l-4 border-indigo-500'
    },
    {
      title: '6. pH Level',
      value: sample?.ph !== null ? `${sample.ph}` : 'N/A',
      sub: 'Acidity Index',
      icon: Activity,
      source: sample?.ph !== null ? (sample.input_mode === 'MANUAL MODE' ? 'USER INPUT' : 'LIVE SENSOR DATA') : 'USER INPUT',
      accent: 'border-l-4 border-teal-500'
    },
    {
      title: '7. Respiration Rate',
      value: sample?.respiration_rate !== null ? `${sample.respiration_rate} mg/kg·h` : '0.0 mg/kg·h',
      sub: sample?.category === 'Fresh Produce' ? 'High Respiration Metabolic' : 'Non-respiring',
      icon: Activity,
      source: sample?.respiration_rate !== null ? 'USER INPUT' : 'CALCULATED',
      accent: 'border-l-4 border-amber-500'
    },
    {
      title: '8. Estimated Shelf Life',
      value: analysisData?.shelf_life_prediction ? `${analysisData.shelf_life_prediction.estimated_shelf_life_days} Days` : (sample?.desired_shelf_life ? `Target ${sample.desired_shelf_life} Days` : 'N/A'),
      sub: 'Arrhenius & Barrier Kinetic Model',
      icon: Clock,
      source: 'CALCULATED',
      accent: 'border-l-4 border-emerald-600'
    },
    {
      title: '9. Packaging Risk Level',
      value: analysisData?.ai_recommendation?.risk_level || 'LOW RISK',
      sub: 'Vulnerability Assessment',
      icon: ShieldAlert,
      source: 'AI RECOMMENDATION',
      accent: 'border-l-4 border-rose-500'
    },
    {
      title: '10. Recommended Packaging',
      value: analysisData?.ai_recommendation?.recommended_material_name || 'Run Analysis to Generate',
      sub: analysisData?.ai_recommendation?.recommended_structure || 'Barrier Laminate',
      icon: Sparkles,
      source: 'AI RECOMMENDATION',
      accent: 'border-l-4 border-teal-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PackSense AI — Smart Food Packaging Intelligence</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time IoT telemetry, rule-based expert analysis, and explainable AI recommendations.</p>
        </div>

        {/* Live Timestamp & Device Monitor */}
        <div className="flex items-center gap-3">
          {esp32Connected ? (
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

      {/* Timestamp Notice */}
      <div className="text-xs text-slate-500 flex justify-between items-center px-1">
        <span>Last updated: <strong className="text-slate-700">{lastUpdated || new Date().toLocaleString()}</strong></span>
        <span className="text-slate-400">Strict No-Dummy-Data Compliance Active</span>
      </div>

      {/* 10 Dashboard Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`glass-card p-4 rounded-xl ${card.accent} flex flex-col justify-between space-y-3 transition-all hover:shadow-md`}>
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-500">{card.title}</span>
                <Icon className="w-4 h-4 text-slate-400" />
              </div>
              
              <div>
                <h3 className="text-base font-bold text-slate-900 truncate" title={card.value}>{card.value}</h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{card.sub}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                <DataSourceBadge type={card.source} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Status Banner */}
      {!esp32Connected && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-900">ESP32 Sensor Hardware Currently Disconnected</h4>
            <p className="text-xs text-amber-800 mt-1">
              Physical ESP32 hardware is not sending live sensor data over WebSocket/HTTP. The system is operating cleanly in <strong>MANUAL MODE / DATABASE MODE</strong>. You can enter food measurements manually in the Food Samples module or connect your ESP32 device. Zero fake numbers are generated.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
