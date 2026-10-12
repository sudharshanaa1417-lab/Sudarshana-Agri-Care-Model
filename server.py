"""
Sudharshana Agri_Care Model — Python Backend Server
Supports:
1. Plant disease prediction with plant_disease_recog_model_sudharshana_pwp.keras and ONNX model
2. Real-time ESP32 IoT telemetry ingest & broadcast
3. Static frontend file hosting on localhost
"""

import os
import json
import time
from pathlib import Path
from flask import Flask, request, jsonify, send_from_directory
from PIL import Image
import numpy as np

app = Flask(__name__, static_folder='frontend/dist', static_url_path='/')

try:
    from flask_cors import CORS
    CORS(app)
except ImportError:
    @app.after_request
    def add_cors_headers(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

BASE_DIR = Path(__file__).resolve().parent

# Load plant disease labels
LABELS_PATH = BASE_DIR / 'frontend' / 'src' / 'data' / 'plant_disease.json'
if not LABELS_PATH.exists():
    LABELS_PATH = BASE_DIR / 'frontend' / 'public' / 'models' / 'plant_disease.json'

with open(LABELS_PATH, 'r', encoding='utf-8') as f:
    DISEASE_LABELS = json.load(f)

# Global model state
keras_model = None
onnx_session = None

# Attempt to load Keras model
KERAS_PATH = Path(r"c:\Users\sudha\Downloads\plant_disease_recog_model_sudharshana_pwp.keras")
if not KERAS_PATH.exists():
    KERAS_PATH = BASE_DIR / "models" / "plant_disease_recog_model_sudharshana_pwp.keras"

ONNX_PATH = BASE_DIR / "frontend" / "public" / "models" / "plant_disease_model.onnx"

def load_ai_model():
    global keras_model, onnx_session
    # Try ONNX first (lightweight, fast)
    if ONNX_PATH.exists():
        try:
            import onnxruntime as ort
            onnx_session = ort.InferenceSession(str(ONNX_PATH))
            print(f"[AI MODEL] Successfully loaded ONNX model from {ONNX_PATH}")
            return
        except Exception as e:
            print(f"[AI MODEL] ONNX load notice: {e}")

    # Fallback to Keras
    if KERAS_PATH.exists():
        try:
            import keras
            keras_model = keras.models.load_model(str(KERAS_PATH))
            print(f"[AI MODEL] Successfully loaded Keras model from {KERAS_PATH}")
            return
        except Exception as e:
            print(f"[AI MODEL] Keras load notice: {e}")

try:
    load_ai_model()
except Exception as e:
    print(f"[AI MODEL] Initialization: {e}")

# In-memory ESP32 telemetry cache
telemetry_history_buffer = []

telemetry_state = {
    "device": "ESP32",
    "device_id": "ESP32-SUDHARSHANA-NODE",
    "online": False,
    "soil_moisture": 64.5,
    "soil_adc": 2100,
    "humidity": 71.2,
    "temperature": 28.4,
    "air_temperature": 28.4,
    "water_temperature": 24.8,
    "tds_ppm": 385,
    "ec": 0.77,
    "voltage": 1.25,
    "rssi": -65,
    "valve_status": "AUTO",
    "last_updated": time.strftime("%H:%M:%S"),
    "last_ping_timestamp": 0
}

@app.route('/api/status', methods=['GET'])
@app.route('/status', methods=['GET'])
def get_status():
    age = time.time() - telemetry_state["last_ping_timestamp"]
    is_online = (telemetry_state["last_ping_timestamp"] > 0) and (age <= 45)
    return jsonify({
        "status": "active",
        "app": "Sudharshana Agri_Care Model",
        "esp32_online": is_online,
        "model_loaded": keras_model is not None or onnx_session is not None,
        "classes_count": len(DISEASE_LABELS),
        "server_time": time.strftime("%Y-%m-%d %H:%M:%S"),
        "telemetry_age_seconds": round(age, 1) if telemetry_state["last_ping_timestamp"] > 0 else None
    })

@app.route('/api/telemetry', methods=['GET', 'POST'])
@app.route('/telemetry', methods=['GET', 'POST'])
def handle_telemetry():
    global telemetry_history_buffer
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            now_str = time.strftime("%H:%M:%S")

            # Extract sensor readings
            soil_m = float(data.get("moisture", data.get("soil_moisture", telemetry_state["soil_moisture"])))
            hum = float(data.get("humidity", telemetry_state["humidity"]))
            air_t = float(data.get("air_temperature", data.get("temperature", telemetry_state["temperature"])))
            water_t = float(data.get("water_temperature", telemetry_state.get("water_temperature", 24.8)))
            tds = float(data.get("tds", data.get("tds_ppm", telemetry_state["tds_ppm"])))
            ec = float(data.get("ec", telemetry_state.get("ec", 0.0)))
            volt = float(data.get("voltage", telemetry_state.get("voltage", 0.0)))
            soil_adc = float(data.get("soil_adc", telemetry_state.get("soil_adc", 0.0)))
            rssi = data.get("rssi", telemetry_state.get("rssi", -65))
            dev_id = data.get("device_id", telemetry_state.get("device_id", "ESP32"))

            telemetry_state.update({
                "device": "ESP32",
                "device_id": dev_id,
                "soil_moisture": round(soil_m, 1),
                "soil_adc": round(soil_adc, 1),
                "humidity": round(hum, 1),
                "temperature": round(air_t, 1),
                "air_temperature": round(air_t, 1),
                "water_temperature": round(water_t, 1),
                "tds_ppm": round(tds, 1),
                "ec": round(ec, 3),
                "voltage": round(volt, 2),
                "rssi": rssi,
                "valve_status": data.get("valve", telemetry_state["valve_status"]),
                "last_updated": now_str,
                "last_ping_timestamp": time.time(),
                "online": True
            })

            # Append to rolling history
            telemetry_history_buffer.append({
                "time": now_str,
                "moisture": round(soil_m, 1),
                "temperature": round(air_t, 1),
                "water_temp": round(water_t, 1),
                "humidity": round(hum, 1),
                "tds": round(tds / 10, 1)
            })
            if len(telemetry_history_buffer) > 30:
                telemetry_history_buffer.pop(0)

            print(f"[ESP32 TELEMETRY] Moisture: {soil_m}% | AirTemp: {air_t}C | WaterTemp: {water_t}C | Hum: {hum}% | TDS: {tds} ppm")
            return jsonify({"status": "success", "message": "Telemetry ingested"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
    else:
        age = time.time() - telemetry_state["last_ping_timestamp"]
        telemetry_state["online"] = (telemetry_state["last_ping_timestamp"] > 0) and (age <= 45)
        response_data = dict(telemetry_state)
        response_data["history"] = telemetry_history_buffer
        return jsonify(response_data)

@app.route('/api/predict', methods=['POST'])
def predict_disease():
    if 'image' not in request.files:
        return jsonify({"success": False, "message": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"success": False, "message": "No selected file"}), 400

    try:
        img = Image.open(file.stream).convert('RGB').resize((160, 160))
        arr = np.array(img, dtype=np.float32)

        # Run inference
        if onnx_session:
            inp_name = onnx_session.get_inputs()[0].name
            out_name = onnx_session.get_outputs()[0].name
            inp = np.expand_dims(arr, axis=0)
            outs = onnx_session.run([out_name], {inp_name: inp})[0]
            probs = outs[0]
        elif keras_model:
            inp = np.expand_dims(arr, axis=0)
            probs = keras_model.predict(inp, verbose=0)[0]
        else:
            return jsonify({"success": False, "message": "Model not loaded on server"}), 500

        best_idx = int(np.argmax(probs))
        confidence = float(np.max(probs))

        # Softmax if raw logits
        if confidence > 1.0 or confidence < 0.0:
            exp_p = np.exp(probs - np.max(probs))
            probs = exp_p / np.sum(exp_p)
            confidence = float(np.max(probs))

        label_info = DISEASE_LABELS[best_idx] if best_idx < len(DISEASE_LABELS) else {"name": "Unknown"}

        return jsonify({
            "success": True,
            "class_index": best_idx,
            "raw_name": label_info.get("name", "Unknown"),
            "cause": label_info.get("cause", ""),
            "cure": label_info.get("cure", ""),
            "confidence": round(confidence * 100, 1)
        })
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Catch-all route to serve the SPA or ingest telemetry if POSTed
@app.route('/', defaults={'path': ''}, methods=['GET', 'POST'])
@app.route('/<path:path>', methods=['GET', 'POST'])
def serve_frontend(path):
    if request.method == 'POST':
        return handle_telemetry()
    dist_dir = BASE_DIR / 'frontend' / 'dist'
    if path != "" and (dist_dir / path).exists():
        return send_from_directory(dist_dir, path)
    if (dist_dir / 'index.html').exists():
        return send_from_directory(dist_dir, 'index.html')
    return get_status()

if __name__ == '__main__':
    print("\n=======================================================")
    print("[AGRI CARE] Sudharshana Agri_Care Model Server")
    print("Running on: http://localhost:5000")
    print("ESP32 Ingest URL: http://<LAN_IP>:5000/api/telemetry")
    print("=======================================================\n")
    port = int(os.environ.get("PORT", 5000))
    print(f"Running on port: {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
