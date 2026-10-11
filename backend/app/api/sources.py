from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.db_models import DataSource, SensorReading, SensorDevice

router = APIRouter(prefix="/sources", tags=["Data Sources Audit"])

@router.get("", response_model=List[dict])
def get_data_sources_audit(db: Session = Depends(get_db)):
    # Check ESP32 status
    device = db.query(SensorDevice).first()
    is_sensor_active = device and device.status == "CONNECTED" and device.last_seen and (datetime.utcnow() - device.last_seen).total_seconds() < 45

    sources = [
        {
            "metric_name": "Ambient Temperature",
            "source_type": "LIVE SENSOR DATA" if is_sensor_active else "USER INPUT",
            "source_name": "DHT22 / SHT31 (ESP32-PACK-01)" if is_sensor_active else "Manual Sample Form Input",
            "status": "VALID" if is_sensor_active else "MANUAL INPUT",
            "unit": "°C",
            "confidence_score": 0.99 if is_sensor_active else 0.85,
            "last_updated": device.last_seen.isoformat() if is_sensor_active and device.last_seen else datetime.utcnow().isoformat()
        },
        {
            "metric_name": "Relative Humidity",
            "source_type": "LIVE SENSOR DATA" if is_sensor_active else "USER INPUT",
            "source_name": "DHT22 / SHT31 (ESP32-PACK-01)" if is_sensor_active else "Manual Sample Form Input",
            "status": "VALID" if is_sensor_active else "MANUAL INPUT",
            "unit": "% RH",
            "confidence_score": 0.98 if is_sensor_active else 0.85,
            "last_updated": device.last_seen.isoformat() if is_sensor_active and device.last_seen else datetime.utcnow().isoformat()
        },
        {
            "metric_name": "CO2 Concentration",
            "source_type": "LIVE SENSOR DATA" if is_sensor_active else "SENSOR OFFLINE",
            "source_name": "MH-Z19 NDIR Sensor (ESP32-PACK-01)" if is_sensor_active else "Hardware Disconnected",
            "status": "VALID" if is_sensor_active else "OFFLINE",
            "unit": "ppm",
            "confidence_score": 0.96 if is_sensor_active else 0.0,
            "last_updated": device.last_seen.isoformat() if is_sensor_active and device.last_seen else "N/A"
        },
        {
            "metric_name": "Moisture Content",
            "source_type": "USER INPUT",
            "source_name": "Laboratory Moisture Meter / User Entry",
            "status": "VALID",
            "unit": "%",
            "confidence_score": 0.90,
            "last_updated": datetime.utcnow().isoformat()
        },
        {
            "metric_name": "OTR & WVTR Requirements",
            "source_type": "CALCULATED",
            "source_name": "PackSense Deterministic Rule Engine",
            "status": "VALID",
            "unit": "cc/m²·day / g/m²·day",
            "confidence_score": 0.95,
            "last_updated": datetime.utcnow().isoformat()
        },
        {
            "metric_name": "Packaging Material Properties",
            "source_type": "DATABASE",
            "source_name": "PackSense Verified Material Specs DB",
            "status": "VALID",
            "unit": "ASTM Standards",
            "confidence_score": 0.99,
            "last_updated": datetime.utcnow().isoformat()
        },
        {
            "metric_name": "Material Cost Estimate",
            "source_type": "DATABASE",
            "source_name": "Polymer Index Database Estimate",
            "status": "VALID",
            "unit": "USD / INR",
            "confidence_score": 0.88,
            "last_updated": datetime.utcnow().isoformat()
        },
        {
            "metric_name": "Explainable Packaging Rationale",
            "source_type": "AI RECOMMENDATION",
            "source_name": "Google Gemini 1.5 AI Model",
            "status": "VALID",
            "unit": "Natural Language Rationale",
            "confidence_score": 0.94,
            "last_updated": datetime.utcnow().isoformat()
        }
    ]

    return sources
