import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { LineChart as ChartIcon, Clock, WifiOff } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function RealtimeAnalysis({ sensorHistory, esp32Connected }) {
  const [timeRange, setTimeRange] = useState('1h');

  // Format stored readings for Recharts
  const chartData = (sensorHistory || []).map((r) => ({
    time: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: r.temperature,
    humidity: r.humidity,
    co2: r.co2,
    moisture: r.moisture
  })).reverse();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Real-Time Packaging Analysis & Charts</h1>
          <p className="text-sm text-slate-500 mt-1">Live time-series analysis of environmental parameters.</p>
        </div>

        {/* Time Range Selectors */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          {['1h', '6h', '12h', '24h', '7d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === range ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Temperature Chart */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Temperature (°C) vs Time</h3>
              <DataSourceBadge type={esp32Connected ? "LIVE SENSOR DATA" : "DATABASE"} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Relative Humidity Chart */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Humidity (% RH) vs Time</h3>
              <DataSourceBadge type={esp32Connected ? "LIVE SENSOR DATA" : "DATABASE"} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="humidity" stroke="#10b981" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CO2 Concentration Chart */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">CO2 Concentration (ppm) vs Time</h3>
              <DataSourceBadge type={esp32Connected ? "LIVE SENSOR DATA" : "DATABASE"} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip />
                  <Line type="monotone" dataKey="co2" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Moisture Chart */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Moisture Content (%) vs Time</h3>
              <DataSourceBadge type={esp32Connected ? "LIVE SENSOR DATA" : "DATABASE"} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="moisture" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-2xl border border-slate-200 space-y-3">
          <WifiOff className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">ESP32 NOT CONNECTED – CONNECT DEVICE TO START LIVE ANALYSIS</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            No live time-series readings stored in database yet. Connect your ESP32 IoT node or submit sensor payloads to generate real-time charts.
          </p>
        </div>
      )}
    </div>
  );
}
