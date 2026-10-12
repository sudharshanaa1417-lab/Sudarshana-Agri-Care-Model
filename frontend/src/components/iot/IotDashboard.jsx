import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Droplets,
  Thermometer,
  CloudRain,
  Waves,
  Activity,
  Zap,
  CheckCircle2,
  AlertCircle,
  Radio,
  Play,
  Pause,
  Download,
  Settings2,
  Cpu,
  Globe
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { TRANSLATIONS } from '../../data/translations';

export default function IotDashboard({
  language,
  esp32Status,
  setEsp32Status,
  telemetryData,
  setTelemetryData,
  telemetryHistory,
  setTelemetryHistory,
  cloudEndpoint,
  setCloudEndpoint
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [isSimulating, setIsSimulating] = useState(true);
  const [irrigationValveState, setIrrigationValveState] = useState('auto');
  const [isValveActive, setIsValveActive] = useState(false);
  const [lastPingSeconds, setLastPingSeconds] = useState(1);
  const [chartTimeframe, setChartTimeframe] = useState('24h');

  // Real-time sensor ticker (only active during simulation mode)
  useEffect(() => {
    if (esp32Status !== 'simulated') return;

    const interval = setInterval(() => {
      setLastPingSeconds(1);

      setTelemetryData((prev) => {
        const baseMoisture = isValveActive ? Math.min(prev.soilMoisture + 1.2, 78) : Math.max(prev.soilMoisture - 0.25, 32);
        const baseTemp = 28.0 + (Math.sin(Date.now() / 60000) * 2.5);
        const baseWaterTemp = 24.5 + (Math.sin(Date.now() / 75000) * 1.8);
        const baseHumidity = 68.0 + (Math.cos(Date.now() / 80000) * 4.0);
        const baseTds = 380 + Math.floor(Math.sin(Date.now() / 90000) * 25);

        const newMoisture = parseFloat(baseMoisture.toFixed(1));
        const newTemp = parseFloat(baseTemp.toFixed(1));
        const newWaterTemp = parseFloat(baseWaterTemp.toFixed(1));
        const newHumidity = parseFloat(baseHumidity.toFixed(1));
        const newTds = Math.round(baseTds);

        // Auto trigger valve if soil moisture drops below 35%
        if (irrigationValveState === 'auto') {
          if (newMoisture < 35 && !isValveActive) {
            setIsValveActive(true);
          } else if (newMoisture > 65 && isValveActive) {
            setIsValveActive(false);
          }
        }

        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          moisture: newMoisture,
          temperature: newTemp,
          water_temp: newWaterTemp,
          humidity: newHumidity,
          tds: Math.round(newTds / 10)
        };

        setTelemetryHistory((hist) => [...hist.slice(-20), newPoint]);

        return {
          soilMoisture: newMoisture,
          temperature: newTemp,
          waterTemperature: newWaterTemp,
          humidity: newHumidity,
          tdsLevel: newTds,
          ec: parseFloat(((newTds * 2) / 1000).toFixed(3)),
          soilAdc: Math.round(3200 - (newMoisture / 100) * 2000),
          lastUpdated: new Date().toLocaleTimeString()
        };
      });
    }, 3000);

    const pingTimer = setInterval(() => {
      setLastPingSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(pingTimer);
    };
  }, [esp32Status, isValveActive, irrigationValveState]);

  const handleValveToggle = () => {
    if (irrigationValveState === 'auto') {
      setIrrigationValveState('on');
      setIsValveActive(true);
    } else if (irrigationValveState === 'on') {
      setIrrigationValveState('off');
      setIsValveActive(false);
    } else {
      setIrrigationValveState('auto');
    }
  };

  const toggleEsp32Power = () => {
    if (esp32Status === 'online') {
      setEsp32Status('offline');
    } else if (esp32Status === 'offline') {
      setEsp32Status('simulated');
    } else {
      setEsp32Status('online');
    }
  };

  const getTdsStatus = (tds) => {
    if (tds < 300) return { label: 'Low Mineral (< 300 ppm)', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (tds <= 600) return { label: t.optimalRange, color: 'text-emerald-800 bg-emerald-100 border-emerald-300' };
    if (tds <= 1000) return { label: 'Fair (600-1000 ppm)', color: 'text-amber-800 bg-amber-100 border-amber-300' };
    return { label: 'High Saline (> 1000 ppm)', color: 'text-rose-800 bg-rose-100 border-rose-300' };
  };

  const tdsInfo = getTdsStatus(telemetryData.tdsLevel);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Glassmorphic Hardware Node Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                {t.hardwareStatus}
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-white/80 text-slate-700 border border-slate-200">
                ESP32-WROOM-32D
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Radio className="w-6 h-6 text-emerald-600 animate-pulse" />
              <span>{t.iotTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.iotSubtitle}
            </p>
          </div>

          {/* Connection Pill & Simulator Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border shadow-sm transition-all backdrop-blur-md ${
                esp32Status === 'online'
                  ? 'bg-emerald-50/90 text-emerald-800 border-emerald-300'
                  : esp32Status === 'simulated'
                  ? 'bg-blue-50/90 text-blue-800 border-blue-300'
                  : 'bg-rose-50/90 text-rose-800 border-rose-300'
              }`}
            >
              {esp32Status === 'online' ? (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
                  </span>
                  <Wifi className="w-4 h-4 text-emerald-600" />
                  <span>ESP32: {t.online}</span>
                </>
              ) : esp32Status === 'simulated' ? (
                <>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                  <Wifi className="w-4 h-4 text-blue-600" />
                  <span>ESP32: {t.simulated}</span>
                </>
              ) : (
                <>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                  <WifiOff className="w-4 h-4 text-rose-600" />
                  <span>ESP32: {t.offline}</span>
                </>
              )}
            </div>

            <button
              onClick={toggleEsp32Power}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/80 hover:bg-white text-slate-700 border border-slate-300 transition-all shadow-sm"
              title="Cycle status: Online -> Offline -> Simulated"
            >
              <Cpu className="w-4 h-4" />
              <span>{t.toggleStatus}</span>
            </button>
          </div>
        </div>

        {/* Telemetry Hardware Metadata Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm">
            <span className="text-slate-400 font-bold block mb-0.5">{t.connectedSsid}</span>
            <span className="font-bold text-slate-800">Kisan-Farm-Network-5G</span>
          </div>
          <div className="p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm">
            <span className="text-slate-400 font-bold block mb-0.5">{t.nodeIp}</span>
            <span className="font-bold font-mono text-slate-800">192.168.1.45</span>
          </div>
          <div className="p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm">
            <span className="text-slate-400 font-bold block mb-0.5">{t.signalRssi}</span>
            <span className="font-bold text-emerald-700">-64 dBm (Strong)</span>
          </div>
          <div className="p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm">
            <span className="text-slate-400 font-bold block mb-0.5">{t.lastPing}</span>
            <span className="font-bold text-slate-800">
              {esp32Status === 'offline' ? t.offline : `${lastPingSeconds}s ago`}
            </span>
          </div>
        </div>
      </div>

      {/* The 5 Physical Sensor Telemetry Gauges / Cards in Glassmorphism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {/* Metric 1: Soil Moisture Level (GPIO 35) */}
        <div className="relative glass-panel rounded-3xl p-5 shadow-xl border border-white overflow-hidden hover:-translate-y-1 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
              <Droplets className="w-5 h-5" />
            </div>
            <span
              className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase border ${
                telemetryData.soilMoisture < 35
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : telemetryData.soilMoisture > 75
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              {telemetryData.soilMoisture < 35
                ? t.dryNeedsWater
                : telemetryData.soilMoisture > 75
                ? t.waterlogged
                : t.optimalRange}
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {t.soilMoisture}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">GPIO 35</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {esp32Status === 'offline' ? '--' : `${telemetryData.soilMoisture}%`}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">{t.volumetricWater}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              Raw ADC: {telemetryData.soilAdc || Math.round(3200 - (telemetryData.soilMoisture / 100) * 2000)}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(telemetryData.soilMoisture, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
              <span>0% Dry</span>
              <span>40-75%</span>
              <span>100% Wet</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Ambient Humidity Level (DHT22 - GPIO 4) */}
        <div className="relative glass-panel rounded-3xl p-5 shadow-xl border border-white overflow-hidden hover:-translate-y-1 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-105 transition-transform">
              <CloudRain className="w-5 h-5" />
            </div>
            <span
              className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase border ${
                telemetryData.humidity > 80
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              {telemetryData.humidity > 80 ? t.fungalRisk : t.healthyRh}
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {t.humidity}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">GPIO 4</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {esp32Status === 'offline' ? '--' : `${telemetryData.humidity}%`}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">{t.relativeHumidity}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              Dew Point: ~{(telemetryData.temperature - ((100 - telemetryData.humidity) / 5)).toFixed(1)}°C
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(telemetryData.humidity, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
              <span>20% Low</span>
              <span>55-75% Opt</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Field / Air Temperature Level (DHT22 - GPIO 4) */}
        <div className="relative glass-panel rounded-3xl p-5 shadow-xl border border-white overflow-hidden hover:-translate-y-1 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <Thermometer className="w-5 h-5" />
            </div>
            <span
              className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase border ${
                telemetryData.temperature > 34
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              {telemetryData.temperature > 34 ? t.heatStress : t.optimalTemp}
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Air Temperature
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">DHT22</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {esp32Status === 'offline' ? '--' : `${telemetryData.temperature}°C`}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">
                ({((telemetryData.temperature * 9) / 5 + 32).toFixed(1)}°F)
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              Diurnal Delta: ±3.5°C
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((telemetryData.temperature / 45) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
              <span>10°C</span>
              <span>24–30°C</span>
              <span>45°C</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Water Temperature (DS18B20 - GPIO 27) */}
        <div className="relative glass-panel rounded-3xl p-5 shadow-xl border border-white overflow-hidden hover:-translate-y-1 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
              <Thermometer className="w-5 h-5 text-sky-600" />
            </div>
            <span className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase border bg-sky-100 text-sky-800 border-sky-300">
              DS18B20 PROBE
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Water Temperature
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">GPIO 27</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {esp32Status === 'offline' ? '--' : `${telemetryData.waterTemperature ?? 24.8}°C`}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">
                ({((((telemetryData.waterTemperature ?? 24.8) * 9) / 5) + 32).toFixed(1)}°F)
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold block">
              ✓ TDS Temp Compensated
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
              <div
                className="bg-sky-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(((telemetryData.waterTemperature ?? 24.8) / 40) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
              <span>5°C Cold</span>
              <span>20–26°C Opt</span>
              <span>40°C</span>
            </div>
          </div>
        </div>

        {/* Metric 5: Solid Dissolves in Water Level (TDS V1.0 - GPIO 34) */}
        <div className="relative glass-panel rounded-3xl p-5 shadow-xl border border-white overflow-hidden hover:-translate-y-1 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600 group-hover:scale-105 transition-transform">
              <Waves className="w-5 h-5" />
            </div>
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase border ${tdsInfo.color}`}>
              {tdsInfo.label}
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {t.tdsWater}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">GPIO 34</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {esp32Status === 'offline' ? '--' : `${telemetryData.tdsLevel}`}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">ppm</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              EC: {telemetryData.ec || ((telemetryData.tdsLevel * 2) / 1000).toFixed(3)} mS/cm
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100">
            <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
              <div
                className="bg-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((telemetryData.tdsLevel / 1000) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
              <span>0 ppm</span>
              <span>300-600</span>
              <span>1200+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Automated Solenoid Valve Control in Glassmorphism */}
      <div className="glass-panel-dark text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>ESP32 Closed-Loop Irrigation Automation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            {t.irrigationValve}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl">
            {t.irrigationValveDesc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 text-center min-w-[170px] shadow-inner">
            <span className="text-[11px] font-bold text-emerald-300 uppercase block mb-1">
              {t.valveStatusLabel}
            </span>
            <div className="flex items-center justify-center gap-2 font-black text-sm">
              <span
                className={`w-3 h-3 rounded-full ${
                  isValveActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'
                }`}
              ></span>
              <span className={isValveActive ? 'text-emerald-300' : 'text-slate-300'}>
                {isValveActive ? t.wateringOpen : t.closedOff}
              </span>
            </div>
            <span className="text-[10px] text-emerald-200/70 block mt-1">
              Mode: {irrigationValveState.toUpperCase()}
            </span>
          </div>

          <button
            onClick={handleValveToggle}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95 ${
              isValveActive
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/40'
                : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-400/30'
            }`}
          >
            {isValveActive ? t.overrideShutOff : t.manualOpen}
          </button>
        </div>
      </div>

      {/* 24-Hour Telemetry Historical Chart */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>{t.telemetryChartTitle}</span>
            </h3>
            <p className="text-xs text-slate-500">{t.telemetryChartSub}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">{t.timeWindow}</span>
            {['1h', '6h', '24h'].map((tf) => (
              <button
                key={tf}
                onClick={() => setChartTimeframe(tf)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  chartTimeframe === tf
                    ? 'bg-emerald-700 text-white shadow-emerald-700/30'
                    : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryHistory} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.6)" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line
                type="monotone"
                dataKey="moisture"
                name={`${t.soilMoisture} (%)`}
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                name={`${t.humidity} (%)`}
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                name="Air Temp (°C)"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="water_temp"
                name="Water Temp (°C)"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="tds"
                name="TDS (ppm / 10)"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hardware Ingestion & Wiring Guide */}
      <div className="glass-panel-dark text-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-black text-white">ESP32 Hardware Wiring & Telemetry Guide</h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/90 px-3 py-1 rounded-xl border border-emerald-700/60 w-fit">
            HTTP POST Ingest • 115200 Baud
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Flash your ESP32 board using the <span className="text-emerald-400 font-mono font-bold">esp32_firmware/agri_care_esp32.ino</span> sketch. The microcontroller connects to your 2.4GHz Wi-Fi and dispatches JSON telemetry packets every 3 seconds directly to this dashboard.
        </p>

        {/* Pinout Architecture Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 font-bold block mb-1">DHT22 (Air Temp & RH)</span>
            <span className="text-emerald-400 font-mono font-black text-sm">GPIO 4</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">VCC 3.3V • DATA • GND</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 font-bold block mb-1">DS18B20 (Water Temp)</span>
            <span className="text-sky-400 font-mono font-black text-sm">GPIO 27</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">4.7kΩ Resistor to 3.3V</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 font-bold block mb-1">TDS V1.0 (Solids Probe)</span>
            <span className="text-teal-400 font-mono font-black text-sm">GPIO 34</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Analog ADC1 • 0-3.3V</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-slate-400 font-bold block mb-1">Soil Moisture Sensor</span>
            <span className="text-blue-400 font-mono font-black text-sm">GPIO 35</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Analog ADC1 • 3200-1200</span>
          </div>
        </div>

        {/* Cloud Ingest Endpoint Configurator */}
        <div className="bg-slate-900/95 rounded-2xl p-4 border border-white/10 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Target Telemetry Ingest URL (Cloud or Localhost):</span>
            </span>
            <span
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold w-fit ${
                cloudEndpoint
                  ? 'bg-purple-950 text-purple-300 border border-purple-700'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
              }`}
            >
              {cloudEndpoint ? '🌐 CLOUD INGEST ACTIVE' : '💻 LOCALHOST / IN-BROWSER'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={cloudEndpoint || ''}
              onChange={(e) => {
                const val = e.target.value;
                setCloudEndpoint(val);
                if (val.trim()) {
                  localStorage.setItem('agri_cloud_endpoint', val.trim());
                } else {
                  localStorage.removeItem('agri_cloud_endpoint');
                }
              }}
              placeholder="e.g. https://sudarshana-agri-backend.onrender.com (or leave blank for localhost:5000)"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-emerald-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {cloudEndpoint && (
              <button
                onClick={() => {
                  setCloudEndpoint('');
                  localStorage.removeItem('agri_cloud_endpoint');
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all shrink-0"
              >
                Reset to Local
              </button>
            )}
          </div>
        </div>

        {/* Server Endpoint Code Box */}
        <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-300 space-y-1.5 shadow-inner">
          <div className="text-slate-400">// In agri_care_esp32.ino, set your Server URL (Cloud HTTPS or Local IP):</div>
          <div className="text-amber-300">
            const char* SERVER_URL = "{cloudEndpoint ? (cloudEndpoint.includes('/api/telemetry') ? cloudEndpoint : `${cloudEndpoint}/api/telemetry`) : 'http://<YOUR_PC_IP>:5000/api/telemetry'}";
          </div>
          <div className="text-slate-400 pt-1">// Test telemetry ingestion from PowerShell / Terminal:</div>
          <div className="text-slate-200">
            curl -X POST {cloudEndpoint ? (cloudEndpoint.includes('/api/telemetry') ? cloudEndpoint : `${cloudEndpoint}/api/telemetry`) : 'http://localhost:5000/api/telemetry'} -H "Content-Type: application/json" -d '&#123;"device_id":"ESP32-NODE","air_temperature":28.4,"water_temperature":24.5,"humidity":72.0,"soil_moisture":65.0,"tds_ppm":385&#125;'
          </div>
        </div>
      </div>
    </div>
  );
}
