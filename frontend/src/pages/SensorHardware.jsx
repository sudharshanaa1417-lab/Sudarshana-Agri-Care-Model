import React from 'react';
import { Cpu, CheckCircle2, AlertCircle, Wrench, ShieldCheck } from 'lucide-react';

export default function SensorHardware({ esp32Connected }) {
  const hardwareSensors = [
    { name: 'ESP32 IoT Controller Node', model: 'ESP32 WROOM-32D', pin: 'Master MCU', status: esp32Connected ? 'CONNECTED' : 'DISCONNECTED', calib: 'Factory Calibrated' },
    { name: 'Temperature & Humidity Sensor', model: 'DHT22 / SHT31', pin: 'GPIO 4', status: esp32Connected ? 'ONLINE' : 'OFFLINE', calib: 'Offset: ±0.2°C' },
    { name: 'CO2 Concentration Sensor', model: 'MH-Z19B NDIR', pin: 'UART RX2/TX2', status: esp32Connected ? 'ONLINE' : 'OFFLINE', calib: 'Zero Calib 400ppm' },
    { name: 'Moisture Content Sensor', model: 'Capacitive v1.2', pin: 'ADC GPIO 34', status: esp32Connected ? 'ONLINE' : 'OFFLINE', calib: 'Air/Water Calibrated' },
    { name: 'Acidity pH Sensor Probe', model: 'Analog pH Meter v1.1', pin: 'ADC GPIO 35', status: esp32Connected ? 'ONLINE' : 'OFFLINE', calib: 'Buffer 4.0 & 7.0' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hardware Integration & Calibration</h1>
          <p className="text-sm text-slate-500 mt-1">Diagnostic state of physical IoT sensors, pinout mapping, and calibration records.</p>
        </div>
        <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200">
          Device ID: <strong>ESP32-PACK-01</strong>
        </div>
      </div>

      {/* Hardware Diagnostic Table */}
      <div className="glass-card rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-600" />
            Connected Sensor Array Diagnostic Status
          </h3>
          <span className="text-xs font-semibold text-slate-500">Firmware v1.0.4-PackSense</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100/70 text-slate-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-4">Sensor Name</th>
                <th className="py-3 px-4">Model / Type</th>
                <th className="py-3 px-4">ESP32 Pinout</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Calibration Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {hardwareSensors.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-all">
                  <td className="py-3 px-4 font-bold text-slate-900">{item.name}</td>
                  <td className="py-3 px-4">{item.model}</td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-500">{item.pin}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold inline-flex items-center gap-1 ${item.status === 'ONLINE' || item.status === 'CONNECTED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600">{item.calib}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Firmware & Hardware Wiring Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-600" />
            Hardware Assumptions & Pinout Diagram
          </h3>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li>• <strong>ESP32 Microcontroller:</strong> Dual-core 240MHz with built-in Wi-Fi & Bluetooth.</li>
            <li>• <strong>DHT22 / SHT31 (Temp & Humidity):</strong> Connected to GPIO 4 (Digital Input with 10k pull-up).</li>
            <li>• <strong>MH-Z19B NDIR CO2:</strong> Connected via Hardware Serial UART (RX2 = GPIO 16, TX2 = GPIO 17).</li>
            <li>• <strong>Capacitive Moisture:</strong> Connected to Analog ADC Channel 1 (GPIO 34).</li>
            <li>• <strong>pH Sensor Module:</strong> Connected to Analog ADC Channel 1 (GPIO 35).</li>
          </ul>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Calibration Protocol & Quality Verification
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All analog sensor readings undergo 12-bit ADC multi-sample moving average filtering on the ESP32 before transmission. Calibration records are stored in non-volatile flash memory and verified against NIST-traceable standard instruments.
          </p>
        </div>
      </div>
    </div>
  );
}
