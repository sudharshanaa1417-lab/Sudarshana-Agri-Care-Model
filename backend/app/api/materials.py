from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from app.core.database import get_db
from app.models.db_models import PackagingMaterial

router = APIRouter(prefix="/materials", tags=["Packaging Materials Database"])

class MaterialCreate(BaseModel):
    material_id: str
    material_name: str
    material_type: str
    polymer_type: str
    structure: str
    thickness_min_um: float
    thickness_max_um: float
    otr_cc_m2_day: float
    wvtr_g_m2_day: float
    sealability: str
    mechanical_strength_mpa: float
    temp_min_c: float = -20.0
    temp_max_c: float = 80.0
    moisture_barrier_grade: str = "Good"
    oxygen_barrier_grade: str = "Good"
    light_barrier_grade: str = "Fair"
    fat_resistance_grade: str = "Good"
    chemical_resistance_grade: str = "Good"
    recyclability_category: str = "Fully Recyclable"
    compostability: bool = False
    map_compatibility: bool = True
    typical_applications: str
    density_g_cm3: float = 0.92
    cost_per_kg_usd: float = 3.50
    carbon_footprint_kg_co2_kg: float = 2.5
    environmental_info: Optional[str] = None

@router.get("", response_model=List[dict])
def list_packaging_materials(db: Session = Depends(get_db)):
    materials = db.query(PackagingMaterial).order_by(PackagingMaterial.material_name).all()
    return [
        {
            "id": m.id,
            "material_id": m.material_id,
            "material_name": m.material_name,
            "material_type": m.material_type,
            "polymer_type": m.polymer_type,
            "structure": m.structure,
            "thickness_range": f"{m.thickness_min_um} - {m.thickness_max_um} µm",
            "thickness_min_um": m.thickness_min_um,
            "thickness_max_um": m.thickness_max_um,
            "otr_cc_m2_day": m.otr_cc_m2_day,
            "wvtr_g_m2_day": m.wvtr_g_m2_day,
            "sealability": m.sealability,
            "mechanical_strength_mpa": m.mechanical_strength_mpa,
            "moisture_barrier_grade": m.moisture_barrier_grade,
            "oxygen_barrier_grade": m.oxygen_barrier_grade,
            "recyclability_category": m.recyclability_category,
            "compostability": m.compostability,
            "map_compatibility": m.map_compatibility,
            "cost_per_kg_usd": m.cost_per_kg_usd,
            "carbon_footprint_kg_co2_kg": m.carbon_footprint_kg_co2_kg,
            "typical_applications": m.typical_applications
        }
        for m in materials
    ]

@router.get("/{material_id}", response_model=dict)
def get_packaging_material(material_id: int, db: Session = Depends(get_db)):
    m = db.query(PackagingMaterial).filter(PackagingMaterial.id == material_id).first()
    if not m:
        raise HTTPException(status_code=404, detail="Packaging material not found")
    return {
        "id": m.id,
        "material_id": m.material_id,
        "material_name": m.material_name,
        "material_type": m.material_type,
        "polymer_type": m.polymer_type,
        "structure": m.structure,
        "thickness_min_um": m.thickness_min_um,
        "thickness_max_um": m.thickness_max_um,
        "otr_cc_m2_day": m.otr_cc_m2_day,
        "wvtr_g_m2_day": m.wvtr_g_m2_day,
        "sealability": m.sealability,
        "mechanical_strength_mpa": m.mechanical_strength_mpa,
        "temp_min_c": m.temp_min_c,
        "temp_max_c": m.temp_max_c,
        "moisture_barrier_grade": m.moisture_barrier_grade,
        "oxygen_barrier_grade": m.oxygen_barrier_grade,
        "light_barrier_grade": m.light_barrier_grade,
        "fat_resistance_grade": m.fat_resistance_grade,
        "chemical_resistance_grade": m.chemical_resistance_grade,
        "recyclability_category": m.recyclability_category,
        "compostability": m.compostability,
        "map_compatibility": m.map_compatibility,
        "typical_applications": m.typical_applications,
        "density_g_cm3": m.density_g_cm3,
        "cost_per_kg_usd": m.cost_per_kg_usd,
        "carbon_footprint_kg_co2_kg": m.carbon_footprint_kg_co2_kg,
        "environmental_info": m.environmental_info
    }

@router.post("", response_model=dict)
def create_packaging_material(mat: MaterialCreate, db: Session = Depends(get_db)):
    existing = db.query(PackagingMaterial).filter(PackagingMaterial.material_id == mat.material_id).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Material with ID {mat.material_id} already exists")
    
    new_m = PackagingMaterial(**mat.dict())
    db.add(new_m)
    db.commit()
    db.refresh(new_m)
    return {"message": "Packaging material created successfully", "id": new_m.id}
