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
from flask_cors import CORS
from PIL import Image
import numpy as np

app = Flask(__name__, static_folder='frontend/dist', static_url_path='/')
CORS(app)

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
telemetry_state = {
    "device": "ESP32",
    "online": True,
    "soil_moisture": 64.5,
    "humidity": 71.2,
    "temperature": 28.4,
    "water_level": 385,
    "tds_ppm": 385,
    "valve_status": "AUTO",
    "last_updated": time.strftime("%H:%M:%S"),
    "last_ping_timestamp": time.time()
}

@app.route('/api/status', methods=['GET'])
def get_status():
    age = time.time() - telemetry_state["last_ping_timestamp"]
    is_online = age <= 20
    return jsonify({
        "status": "active",
        "app": "Sudharshana Agri_Care Model",
        "esp32_online": is_online,
        "model_loaded": keras_model is not None or onnx_session is not None,
        "classes_count": len(DISEASE_LABELS),
        "server_time": time.strftime("%Y-%m-%d %H:%M:%S")
    })

@app.route('/api/telemetry', methods=['GET', 'POST'])
def handle_telemetry():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            telemetry_state["soil_moisture"] = float(data.get("moisture", data.get("soil_moisture", telemetry_state["soil_moisture"])))
            telemetry_state["humidity"] = float(data.get("humidity", telemetry_state["humidity"]))
            telemetry_state["temperature"] = float(data.get("temperature", telemetry_state["temperature"]))
            telemetry_state["tds_ppm"] = float(data.get("tds", data.get("tds_ppm", telemetry_state["tds_ppm"])))
            telemetry_state["valve_status"] = data.get("valve", telemetry_state["valve_status"])
            telemetry_state["last_updated"] = time.strftime("%H:%M:%S")
            telemetry_state["last_ping_timestamp"] = time.time()
            telemetry_state["online"] = True
            return jsonify({"status": "success", "message": "Telemetry ingested"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
    else:
        age = time.time() - telemetry_state["last_ping_timestamp"]
        telemetry_state["online"] = age <= 20
        return jsonify(telemetry_state)

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

# Catch-all route to serve the SPA
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    dist_dir = BASE_DIR / 'frontend' / 'dist'
    if path != "" and (dist_dir / path).exists():
        return send_from_directory(dist_dir, path)
    return send_from_directory(dist_dir, 'index.html')

if __name__ == '__main__':
    print("\n=======================================================")
    print("🌾 Sudharshana Agri_Care Model Server")
    print("Running on: http://localhost:5000")
    print("ESP32 Ingest URL: http://<LAN_IP>:5000/api/telemetry")
    print("=======================================================\n")
    app.run(host='0.0.0.0', port=5000, debug=False)
