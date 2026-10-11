import React, { useState } from 'react';
import { Package, Plus, CheckCircle2, UserCheck, Activity } from 'lucide-react';
import DataSourceBadge from '../components/common/DataSourceBadge';

export default function FoodSamples({ samples, onCreateSample, onSelectSample, activeSample }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    sample_name: '',
    commodity: '',
    category: 'Fresh Produce',
    variety: '',
    input_mode: 'SENSOR MODE',
    moisture_content: 15.0,
    fat_oil_content: 2.5,
    ph: 6.5,
    respiration_rate: 10.0,
    initial_shelf_life: 14,
    desired_shelf_life: 30,
    storage_temperature: 25.0,
    relative_humidity: 65.0,
    transportation_duration: 24.0,
    transportation_condition: 'Ambient',
    storage_type: 'Ambient',
    light_sensitivity: false,
    oxidation_sensitivity: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateSample(formData);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Food Samples Manager</h1>
          <p className="text-sm text-slate-500 mt-1">Create and manage food batches in Sensor Mode or Manual Mode.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create New Food Sample
        </button>
      </div>

      {/* Samples Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {samples.map((s) => {
          const isActive = activeSample && activeSample.id === s.id;
          return (
            <div
              key={s.id}
              className={`glass-card p-6 rounded-2xl border transition-all ${
                isActive ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{s.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{s.sample_name}</h3>
                  <p className="text-xs text-slate-500">{s.commodity} ({s.batch_id})</p>
                </div>
                <DataSourceBadge type={s.input_mode === 'MANUAL MODE' ? 'USER INPUT' : 'LIVE SENSOR DATA'} />
              </div>

              {/* Physicochemical Parameters */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-500 block">Moisture Content:</span>
                  <strong className="text-slate-800">{s.moisture_content !== null ? `${s.moisture_content}%` : 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Fat / Oil Content:</span>
                  <strong className="text-slate-800">{s.fat_oil_content !== null ? `${s.fat_oil_content}%` : 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">pH Level:</span>
                  <strong className="text-slate-800">{s.ph !== null ? s.ph : 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Respiration Rate:</span>
                  <strong className="text-slate-800">{s.respiration_rate !== null ? `${s.respiration_rate} mg/kg·h` : 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Storage Temp:</span>
                  <strong className="text-slate-800">{s.storage_temperature !== null ? `${s.storage_temperature}°C` : 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Storage Type:</span>
                  <strong className="text-slate-800">{s.storage_type}</strong>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => onSelectSample(s)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                  }`}
                >
                  {isActive ? 'Active Sample Selected' : 'Select Sample for Analysis'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Create New Food Sample</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sample Name</label>
                  <input
                    type="text"
                    required
                    value={formData.sample_name}
                    onChange={(e) => setFormData({ ...formData, sample_name: e.target.value })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                    placeholder="e.g. Export Alphonso Mangoes"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Commodity</label>
                  <input
                    type="text"
                    required
                    value={formData.commodity}
                    onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                    placeholder="e.g. Fresh Mangoes"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Food Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  >
                    <option value="Fresh Produce">Fresh Produce (Fruits/Vegetables)</option>
                    <option value="Processed Snack">Processed Snack (Crisps/Nuts)</option>
                    <option value="Bakery">Bakery & Confectionery</option>
                    <option value="Dairy">Dairy Products</option>
                    <option value="Meat">Meat & Seafood</option>
                    <option value="Dry Grains">Dry Grains & Powders</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Data Collection Mode</label>
                  <select
                    value={formData.input_mode}
                    onChange={(e) => setFormData({ ...formData, input_mode: e.target.value })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  >
                    <option value="SENSOR MODE">SENSOR MODE (Read from ESP32)</option>
                    <option value="MANUAL MODE">MANUAL MODE (User Entered)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Moisture Content (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.moisture_content}
                    onChange={(e) => setFormData({ ...formData, moisture_content: parseFloat(e.target.value) })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fat / Oil Content (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.fat_oil_content}
                    onChange={(e) => setFormData({ ...formData, fat_oil_content: parseFloat(e.target.value) })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">pH Level</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.ph}
                    onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Respiration Rate (mg CO2/kg·h)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.respiration_rate}
                    onChange={(e) => setFormData({ ...formData, respiration_rate: parseFloat(e.target.value) })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Storage Type</label>
                  <select
                    value={formData.storage_type}
                    onChange={(e) => setFormData({ ...formData, storage_type: e.target.value })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  >
                    <option value="Ambient">Ambient (20°C - 30°C)</option>
                    <option value="Chilled">Chilled (2°C - 8°C)</option>
                    <option value="Frozen">Frozen (&lt; -18°C)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Desired Shelf Life (Days)</label>
                  <input
                    type="number"
                    value={formData.desired_shelf_life}
                    onChange={(e) => setFormData({ ...formData, desired_shelf_life: parseInt(e.target.value) })}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/20"
                >
                  Save Sample
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
