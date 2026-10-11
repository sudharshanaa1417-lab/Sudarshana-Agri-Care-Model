import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from app.core.database import get_db
from app.models.db_models import FoodSample, User

router = APIRouter(prefix="/samples", tags=["Food Samples"])

class FoodSampleCreate(BaseModel):
    user_id: Optional[int] = 1
    sample_name: str
    commodity: str
    category: str
    variety: Optional[str] = None
    input_mode: str = "SENSOR MODE" # SENSOR MODE vs MANUAL MODE
    moisture_content: Optional[float] = None
    fat_oil_content: Optional[float] = None
    ph: Optional[float] = None
    respiration_rate: Optional[float] = None
    initial_shelf_life: Optional[int] = 14
    desired_shelf_life: Optional[int] = 30
    storage_temperature: Optional[float] = 25.0
    relative_humidity: Optional[float] = 60.0
    transportation_duration: Optional[float] = 24.0
    transportation_condition: Optional[str] = "Ambient"
    storage_type: str = "Ambient"
    light_sensitivity: bool = False
    oxidation_sensitivity: bool = False

@router.post("", response_model=dict)
def create_food_sample(sample_in: FoodSampleCreate, db: Session = Depends(get_db)):
    batch_id = f"BATCH-{uuid.uuid4().hex[:8].upper()}"
    
    new_sample = FoodSample(
        user_id=sample_in.user_id or 1,
        sample_name=sample_in.sample_name,
        commodity=sample_in.commodity,
        category=sample_in.category,
        variety=sample_in.variety,
        batch_id=batch_id,
        input_mode=sample_in.input_mode,
        moisture_content=sample_in.moisture_content,
        fat_oil_content=sample_in.fat_oil_content,
        ph=sample_in.ph,
        respiration_rate=sample_in.respiration_rate,
        initial_shelf_life=sample_in.initial_shelf_life,
        desired_shelf_life=sample_in.desired_shelf_life,
        storage_temperature=sample_in.storage_temperature,
        relative_humidity=sample_in.relative_humidity,
        transportation_duration=sample_in.transportation_duration,
        transportation_condition=sample_in.transportation_condition,
        storage_type=sample_in.storage_type,
        light_sensitivity=sample_in.light_sensitivity,
        oxidation_sensitivity=sample_in.oxidation_sensitivity
    )
    db.add(new_sample)
    db.commit()
    db.refresh(new_sample)

    return {
        "message": "Food sample created successfully",
        "sample_id": new_sample.id,
        "batch_id": new_sample.batch_id,
        "sample_name": new_sample.sample_name,
        "input_mode": new_sample.input_mode
    }

@router.get("", response_model=List[dict])
def list_food_samples(db: Session = Depends(get_db)):
    samples = db.query(FoodSample).order_by(FoodSample.created_at.desc()).all()
    return [
        {
            "id": s.id,
            "sample_name": s.sample_name,
            "commodity": s.commodity,
            "category": s.category,
            "batch_id": s.batch_id,
            "input_mode": s.input_mode,
            "moisture_content": s.moisture_content,
            "fat_oil_content": s.fat_oil_content,
            "ph": s.ph,
            "respiration_rate": s.respiration_rate,
            "storage_temperature": s.storage_temperature,
            "relative_humidity": s.relative_humidity,
            "created_at": s.created_at.isoformat()
        }
        for s in samples
    ]

@router.get("/{sample_id}", response_model=dict)
def get_food_sample(sample_id: int, db: Session = Depends(get_db)):
    sample = db.query(FoodSample).filter(FoodSample.id == sample_id).first()
    if not sample:
        raise HTTPException(status_code=404, detail="Food sample not found")
    return {
        "id": sample.id,
        "sample_name": sample.sample_name,
        "commodity": sample.commodity,
        "category": sample.category,
        "variety": sample.variety,
        "batch_id": sample.batch_id,
        "input_mode": sample.input_mode,
        "moisture_content": sample.moisture_content,
        "fat_oil_content": sample.fat_oil_content,
        "ph": sample.ph,
        "respiration_rate": sample.respiration_rate,
        "initial_shelf_life": sample.initial_shelf_life,
        "desired_shelf_life": sample.desired_shelf_life,
        "storage_temperature": sample.storage_temperature,
        "relative_humidity": sample.relative_humidity,
        "transportation_duration": sample.transportation_duration,
        "transportation_condition": sample.transportation_condition,
        "storage_type": sample.storage_type,
        "light_sensitivity": sample.light_sensitivity,
        "oxidation_sensitivity": sample.oxidation_sensitivity,
        "created_at": sample.created_at.isoformat()
    }
