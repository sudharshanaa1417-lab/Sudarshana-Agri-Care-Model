import math
from typing import Dict, Any

class ShelfLifePredictor:
    """
    Kinetic & Arrhenius Shelf-Life Prediction Engine for PackSense AI.
    Calculates temperature deterioration acceleration and barrier protection kinetic extension.
    """

    @classmethod
    def predict_shelf_life(
        cls,
        food_sample: Dict[str, Any],
        live_sensors: Dict[str, Any],
        packaging_material: Dict[str, Any]
    ) -> Dict[str, Any]:

        base_shelf_life = float(food_sample.get("initial_shelf_life") or 14) # baseline days at optimal 4°C or ambient
        desired_shelf_life = float(food_sample.get("desired_shelf_life") or 30)

        # Storage temperatures
        ref_temp = 4.0 # Reference standard chill temp °C
        current_temp = live_sensors.get("temperature") if live_sensors.get("temperature") is not None else food_sample.get("storage_temperature", 25.0)
        current_rh = live_sensors.get("humidity") if live_sensors.get("humidity") is not None else food_sample.get("relative_humidity", 65.0)
        
        # Packaging Barrier Transmission Rates
        wvtr = float(packaging_material.get("wvtr_g_m2_day", 2.0))
        otr = float(packaging_material.get("otr_cc_m2_day", 15.0))
        
        # Q10 Temperature Factor (Typically 2.0 - 2.5 for food degradation reactions)
        category = (food_sample.get("category") or "").lower()
        if "produce" in category or "fruit" in category or "vegetable" in category:
            q10 = 2.5 # Respiration doubles/triples every 10°C
            deterioration_factor = "Respiration & Moisture Loss (Transpiration)"
        elif "meat" in category or "dairy" in category:
            q10 = 2.2 # Microbial growth acceleration
            deterioration_factor = "Microbial Growth & Lipid Oxidation"
        elif "bakery" in category or "snack" in category:
            q10 = 1.8 # Staling & moisture migration
            deterioration_factor = "Moisture Absorption & Crispness Loss"
        else:
            q10 = 2.0
            deterioration_factor = "Physicochemical Degradation"

        # Arrhenius Temperature Acceleration Factor
        temp_diff = current_temp - ref_temp
        temp_factor = math.pow(q10, temp_diff / 10.0)

        # Packaging Barrier Protection Coefficient
        # Lower WVTR and OTR yield higher protection multiplier
        barrier_protection_multiplier = (10.0 / (wvtr + 0.5)) * (20.0 / (otr + 1.0))
        barrier_protection_multiplier = max(0.4, min(3.5, barrier_protection_multiplier))

        # Calculated Shelf Life
        estimated_days = (base_shelf_life / temp_factor) * barrier_protection_multiplier
        estimated_days = max(1.0, round(estimated_days, 1))

        range_min = max(0.8, round(estimated_days * 0.85, 1))
        range_max = round(estimated_days * 1.2, 1)

        # Risk Factors & Contributions
        packaging_contribution = f"WVTR {wvtr} g/m²·day & OTR {otr} cc/m²·day provides {barrier_protection_multiplier:.2f}x protection multiplier."
        environmental_contribution = f"Storage at {current_temp:.1f}°C & {current_rh:.1f}% RH accelerates reaction rate by {temp_factor:.2f}x relative to 4°C standard."

        return {
            "estimated_shelf_life_days": estimated_days,
            "shelf_life_range_min": range_min,
            "shelf_life_range_max": range_max,
            "target_shelf_life_days": desired_shelf_life,
            "is_target_achievable": estimated_days >= desired_shelf_life,
            "q10_factor": q10,
            "temp_acceleration_factor": round(temp_factor, 2),
            "barrier_protection_multiplier": round(barrier_protection_multiplier, 2),
            "primary_deterioration_factor": deterioration_factor,
            "packaging_barrier_impact": packaging_contribution,
            "environmental_impact": environmental_contribution,
            "disclaimer": "AI/model-based estimate — validation required before commercial use."
        }
