from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.core.database import get_db
from app.models.db_models import FoodSample, SensorDevice, SensorReading, PackagingMaterial, PackagingRecommendation, RecommendationHistory, ShelfLifePrediction
from app.services.rule_engine import RuleEngine
from app.services.ai_engine import AIEngine
from app.services.shelf_life import ShelfLifePredictor
from app.services.sustainability_cost import SustainabilityAndCostEngine

router = APIRouter(prefix="/analysis", tags=["Packaging & AI Analysis"])

class RunAnalysisRequest(BaseModel):
    sample_id: int
    device_id: Optional[str] = "ESP32-PACK-01"
    package_quantity: int = 1000
    pouch_length_cm: float = 20.0
    pouch_width_cm: float = 15.0

@router.post("/run", response_model=Dict[str, Any])
def run_packaging_recommendation_pipeline(req: RunAnalysisRequest, db: Session = Depends(get_db)):
    # 1. Fetch Food Sample
    sample = db.query(FoodSample).filter(FoodSample.id == req.sample_id).first()
    if not sample:
        raise HTTPException(status_code=404, detail=f"Food sample ID {req.sample_id} not found")

    sample_dict = {
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
        "oxidation_sensitivity": sample.oxidation_sensitivity
    }

    # 2. Fetch Latest Live Sensor Reading if available
    live_sensors = {}
    if req.device_id:
        device = db.query(SensorDevice).filter(SensorDevice.device_id == req.device_id).first()
        if device:
            latest_r = db.query(SensorReading).filter(SensorReading.device_id == device.id).order_by(SensorReading.timestamp.desc()).first()
            if latest_r:
                live_sensors = {
                    "temperature": latest_r.temperature,
                    "humidity": latest_r.humidity,
                    "co2": latest_r.co2,
                    "moisture": latest_r.moisture,
                    "ph": latest_r.ph,
                    "respiration_rate": latest_r.respiration_rate,
                    "timestamp": latest_r.timestamp.isoformat()
                }

    # 3. Run Deterministic Rule Engine
    rule_results = RuleEngine.analyze_food_packaging_requirements(sample_dict, live_sensors)

    # 4. Fetch Packaging Materials Candidates from DB
    materials = db.query(PackagingMaterial).all()
    mat_candidates = [
        {
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
            "temp_min_c": m.temp_min_c,
            "temp_max_c": m.temp_max_c,
            "recyclability_category": m.recyclability_category,
            "compostability": m.compostability,
            "cost_per_kg_usd": m.cost_per_kg_usd,
            "carbon_footprint_kg_co2_kg": m.carbon_footprint_kg_co2_kg,
            "density_g_cm3": m.density_g_cm3,
            "typical_applications": m.typical_applications
        }
        for m in materials
    ]

    # 5. Run AI Recommendation Layer
    ai_recommendation = AIEngine.generate_recommendation(
        sample_dict,
        live_sensors,
        rule_results,
        mat_candidates
    )

    # Find matched DB material object for detailed calculations
    matched_mat_dict = mat_candidates[0] if mat_candidates else {}
    rec_mat_name = ai_recommendation.get("recommended_material_name", "")
    for m in mat_candidates:
        if m["material_name"].lower() in rec_mat_name.lower() or rec_mat_name.lower() in m["material_name"].lower():
            matched_mat_dict = m
            break

    # 6. Run Shelf Life Prediction
    shelf_life_res = ShelfLifePredictor.predict_shelf_life(
        sample_dict,
        live_sensors,
        matched_mat_dict
    )

    # 7. Run Cost & Sustainability Analysis
    thickness_val = 60.0
    cost_sust_res = SustainabilityAndCostEngine.calculate_cost_and_sustainability(
        matched_mat_dict,
        thickness_um=thickness_val,
        package_quantity=req.package_quantity,
        food_weight_kg=0.5,
        pouch_length_cm=req.pouch_length_cm,
        pouch_width_cm=req.pouch_width_cm
    )

    # Save Recommendation Record to Database
    db_rec = PackagingRecommendation(
        sample_id=sample.id,
        recommended_material_name=ai_recommendation.get("recommended_material_name", "PET / Al-Foil / PE Laminate"),
        recommended_structure=ai_recommendation.get("recommended_structure", "PET 12µm / Al 7µm / LDPE 50µm"),
        recommended_thickness_um=ai_recommendation.get("recommended_thickness_um", "50 - 90 µm"),
        required_otr=ai_recommendation.get("required_otr", "< 10 cc/m²·day·atm"),
        required_wvtr=ai_recommendation.get("required_wvtr", "< 1.5 g/m²·day"),
        sealability_requirement=ai_recommendation.get("sealability_requirement", "High Integrity Seal"),
        map_suitability=ai_recommendation.get("map_suitability", False),
        recommended_gas_strategy=ai_recommendation.get("recommended_gas_strategy"),
        why_recommended=ai_recommendation.get("why_recommended", "Rule engine match"),
        expected_advantages=ai_recommendation.get("expected_advantages"),
        potential_limitations=ai_recommendation.get("potential_limitations"),
        sustainability_summary=ai_recommendation.get("sustainability_summary"),
        cost_summary=ai_recommendation.get("cost_summary"),
        risk_level=ai_recommendation.get("risk_level", "LOW")
    )
    db.add(db_rec)
    db.commit()
    db.refresh(db_rec)

    # Save History
    db_hist = RecommendationHistory(
        sample_id=sample.id,
        recommendation_id=db_rec.id,
        rule_engine_output=rule_results,
        ai_raw_response=str(ai_recommendation)
    )
    db.add(db_hist)
    db.commit()

    return {
        "recommendation_id": db_rec.id,
        "sample": sample_dict,
        "live_sensors": live_sensors,
        "rule_analysis": rule_results,
        "ai_recommendation": ai_recommendation,
        "shelf_life_prediction": shelf_life_res,
        "cost_sustainability_analysis": cost_sust_res,
        "validation_disclaimer": "Recommendation requires laboratory/industry validation before commercial production use."
    }
