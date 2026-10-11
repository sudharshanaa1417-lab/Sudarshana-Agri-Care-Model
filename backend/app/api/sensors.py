from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from app.core.database import get_db
from app.models.db_models import SensorDevice, SensorReading, SensorCalibration
from app.services.data_validator import DataValidator

router = APIRouter(prefix="/sensors", tags=["Live Sensors & Hardware"])

class IngestPayload(BaseModel):
    device_id: str = "ESP32-PACK-01"
    sample_id: Optional[int] = None
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    co2: Optional[float] = None
    moisture: Optional[float] = None
    ph: Optional[float] = None
    respiration_rate: Optional[float] = None

@router.post("/ingest", response_model=dict)
def ingest_sensor_reading(payload: IngestPayload, db: Session = Depends(get_db)):
    raw_dict = payload.dict(exclude_unset=True)
    is_valid, err_msg, sanitized = DataValidator.validate_sensor_payload(raw_dict)
    
    if not is_valid:
        raise HTTPException(status_code=422, detail=err_msg)

    # Find or register ESP32 device
    device = db.query(SensorDevice).filter(SensorDevice.device_id == payload.device_id).first()
    if not device:
        device = SensorDevice(
            device_id=payload.device_id,
            device_name=f"ESP32 Node ({payload.device_id})",
            status="CONNECTED",
            last_seen=datetime.utcnow()
        )
        db.add(device)
        db.commit()
        db.refresh(device)
    else:
        device.status = "CONNECTED"
        device.last_seen = datetime.utcnow()
        db.commit()

    # Save timestamped sensor reading
    reading = SensorReading(
        device_id=device.id,
        sample_id=payload.sample_id,
        temperature=sanitized.get("temperature"),
        humidity=sanitized.get("humidity"),
        co2=sanitized.get("co2"),
        moisture=sanitized.get("moisture"),
        ph=sanitized.get("ph"),
        respiration_rate=sanitized.get("respiration_rate"),
        sensor_status="ONLINE",
        source_type="LIVE SENSOR DATA",
        timestamp=datetime.utcnow()
    )
    db.add(reading)
    db.commit()
    db.refresh(reading)

    return {
        "status": "success",
        "reading_id": reading.id,
        "timestamp": reading.timestamp.isoformat(),
        "device_status": device.status
    }

@router.get("/latest", response_model=dict)
def get_latest_sensor_reading(device_id: str = "ESP32-PACK-01", db: Session = Depends(get_db)):
    device = db.query(SensorDevice).filter(SensorDevice.device_id == device_id).first()
    
    status_text, is_connected = DataValidator.check_sensor_freshness(device.last_seen if device else None)
    
    if not device or not is_connected:
        return {
            "device_id": device_id,
            "connection_status": "DISCONNECTED",
            "sensor_status_message": status_text,
            "last_updated": device.last_seen.isoformat() if device and device.last_seen else None,
            "readings": {
                "temperature": None,
                "humidity": None,
                "co2": None,
                "moisture": None,
                "ph": None,
                "respiration_rate": None
            }
        }

    latest_reading = db.query(SensorReading).filter(SensorReading.device_id == device.id).order_by(SensorReading.timestamp.desc()).first()
    
    if not latest_reading:
        return {
            "device_id": device_id,
            "connection_status": "CONNECTED",
            "sensor_status_message": "CONNECTED (Waiting for first payload)",
            "last_updated": device.last_seen.isoformat(),
            "readings": {}
        }

    return {
        "device_id": device_id,
        "connection_status": "CONNECTED",
        "sensor_status_message": "CONNECTED & STREAMING LIVE",
        "last_updated": latest_reading.timestamp.isoformat(),
        "readings": {
            "temperature": latest_reading.temperature,
            "humidity": latest_reading.humidity,
            "co2": latest_reading.co2,
            "moisture": latest_reading.moisture,
            "ph": latest_reading.ph,
            "respiration_rate": latest_reading.respiration_rate
        }
    }

@router.get("/devices", response_model=List[dict])
def list_hardware_devices(db: Session = Depends(get_db)):
    devices = db.query(SensorDevice).all()
    res = []
    for d in devices:
        status_text, is_conn = DataValidator.check_sensor_freshness(d.last_seen)
        res.append({
            "id": d.id,
            "device_id": d.device_id,
            "device_name": d.device_name,
            "status": "CONNECTED" if is_conn else "DISCONNECTED",
            "status_message": status_text,
            "last_seen": d.last_seen.isoformat() if d.last_seen else None,
            "firmware_version": d.firmware_version
        })
    return res

@router.get("/history", response_model=List[dict])
def get_sensor_history(limit: int = 100, db: Session = Depends(get_db)):
    readings = db.query(SensorReading).order_by(SensorReading.timestamp.desc()).limit(limit).all()
    return [
        {
            "id": r.id,
            "timestamp": r.timestamp.isoformat(),
            "temperature": r.temperature,
            "humidity": r.humidity,
            "co2": r.co2,
            "moisture": r.moisture,
            "ph": r.ph,
            "source_type": r.source_type
        }
        for r in readings
    ]
