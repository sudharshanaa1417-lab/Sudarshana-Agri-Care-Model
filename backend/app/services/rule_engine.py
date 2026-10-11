from typing import Dict, Any, List

class RuleEngine:
    """
    Deterministic Expert System for Food Packaging Property Requirements.
    Evaluates food physicochemical attributes, live sensor readings, and storage environments
    to compute exact barrier and mechanical specifications.
    """

    @classmethod
    def analyze_food_packaging_requirements(cls, sample_data: Dict[str, Any], live_sensor_data: Dict[str, Any] = None) -> Dict[str, Any]:
        live_sensor_data = live_sensor_data or {}
        
        # Merge properties prioritizing live sensors if available, else user inputs
        moisture = live_sensor_data.get("moisture") if live_sensor_data.get("moisture") is not None else sample_data.get("moisture_content")
        temp = live_sensor_data.get("temperature") if live_sensor_data.get("temperature") is not None else sample_data.get("storage_temperature")
        rh = live_sensor_data.get("humidity") if live_sensor_data.get("humidity") is not None else sample_data.get("relative_humidity")
        co2 = live_sensor_data.get("co2")
        ph = live_sensor_data.get("ph") if live_sensor_data.get("ph") is not None else sample_data.get("ph")
        respiration_rate = live_sensor_data.get("respiration_rate") if live_sensor_data.get("respiration_rate") is not None else sample_data.get("respiration_rate", 0.0)
        
        fat_content = sample_data.get("fat_oil_content") or 0.0
        category = (sample_data.get("category") or "").strip().lower()
        storage_type = (sample_data.get("storage_type") or "Ambient").strip()
        light_sensitive = sample_data.get("light_sensitivity", False)
        oxidation_sensitive = sample_data.get("oxidation_sensitivity", False)
        
        rules_triggered = []
        
        # 1. WVTR Requirement Analysis (Water Vapor Transmission Rate in g/m²·day)
        # High moisture food (>15%) or dry crispy food (<5%) in high RH (>60%) needs tight moisture barrier
        if moisture is not None and moisture < 8.0:
            target_wvtr = "< 1.5 g/m²·day (High Moisture Barrier - Crispness Retention)"
            wvtr_max = 1.5
            rules_triggered.append("RULE_DRY_FOOD_CRISPNESS: Low moisture food requires ultra-low WVTR to prevent staling.")
        elif moisture is not None and moisture > 40.0:
            target_wvtr = "< 3.0 g/m²·day (Moisture Loss Prevention)"
            wvtr_max = 3.0
            rules_triggered.append("RULE_HIGH_MOISTURE_RETENTION: High moisture food requires low WVTR to prevent desiccation.")
        elif rh is not None and rh > 75.0:
            target_wvtr = "< 2.0 g/m²·day (High RH Ambient Barrier)"
            wvtr_max = 2.0
            rules_triggered.append("RULE_HIGH_RH_PROTECTION: Ambient RH >75% requires low WVTR to prevent external moisture ingress.")
        else:
            target_wvtr = "< 5.0 g/m²·day (Standard Moisture Barrier)"
            wvtr_max = 5.0

        # 2. OTR Requirement Analysis (Oxygen Transmission Rate in cc/m²·day·atm)
        if oxidation_sensitive or fat_content > 15.0:
            target_otr = "< 10.0 cc/m²·day·atm (High Oxygen Barrier - Rancidity Prevention)"
            otr_max = 10.0
            rules_triggered.append("RULE_FAT_OXIDATION: High fat/oil content (>15%) requires ultra-low OTR to avoid lipid oxidation & rancidity.")
        elif category in ["meat", "dairy", "bakery"]:
            target_otr = "< 20.0 cc/m²·day·atm (Moderate-High Oxygen Barrier)"
            otr_max = 20.0
            rules_triggered.append("RULE_PERISHABLE_SPOILAGE: Meat/dairy/bakery products require oxygen restriction to prevent aerobic mold/bacterial growth.")
        elif category in ["fresh produce", "fruit", "vegetable"]:
            # Fresh produce needs oxygen permeability to avoid anaerobic respiration!
            target_otr = "1,000 - 15,000 cc/m²·day·atm (Breathable / Micro-perforated Equilibrium Barrier)"
            otr_max = 15000.0
            rules_triggered.append("RULE_FRESH_PRODUCE_RESPIRATION: Living produce requires controlled gas permeability to prevent anaerobic fermentation and off-odors.")
        else:
            target_otr = "< 50.0 cc/m²·day·atm (General Barrier)"
            otr_max = 50.0

        # 3. Thickness & Mechanical Strength
        if storage_type == "Frozen":
            target_thickness = "60 - 120 µm"
            target_sealability = "Hermetic / High Low-Temp Impact Strength"
            target_mech_strength = "> 35 MPa (High Puncture & Flex-Crack Resistance at Sub-Zero)"
            rules_triggered.append("RULE_FROZEN_STORAGE: Sub-zero temperatures require impact resistance and flex-crack resistant polymer structures.")
        elif sample_data.get("transportation_duration", 0) > 48:
            target_thickness = "50 - 90 µm"
            target_sealability = "High Integrity Heat Seal"
            target_mech_strength = "> 30 MPa (Long Transit Vibration & Stacking Resistance)"
            rules_triggered.append("RULE_LONG_TRANSIT: Extended transit (>48h) requires higher film thickness and tensile strength.")
        else:
            target_thickness = "30 - 70 µm"
            target_sealability = "Standard Heat Seal"
            target_mech_strength = "> 20 MPa"

        # 4. Light Barrier
        if light_sensitive or fat_content > 20.0:
            light_barrier_required = True
            light_barrier_desc = "Opaque / Metallized (Met-PET or Al-Foil Laminate) or UV-Blocking"
            rules_triggered.append("RULE_LIGHT_SENSITIVITY: Light-induced oxidation protection required.")
        else:
            light_barrier_required = False
            light_barrier_desc = "Transparent / High Clarity Permitted"

        # 5. MAP (Modified Atmosphere Packaging) Analysis & Fresh Produce Dynamics
        is_fresh_produce = category in ["fresh produce", "fruit", "vegetable"] or respiration_rate > 5.0
        if is_fresh_produce:
            map_suitability = True
            if respiration_rate > 40.0:
                gas_strategy = "High Respiration EMAP: 3-5% O₂, 5-10% CO₂, Balance N₂. Use Micro-perforated BOPP/PE."
                ventilation = "Micro-perforated (100-300 µm laser perforations)"
                anaerobic_risk = "HIGH if non-perforated film is used"
            elif respiration_rate > 20.0:
                gas_strategy = "Moderate Respiration MAP: 5% O₂, 5% CO₂, 90% N₂. Use Breathable Anti-Fog PLA or BOPP."
                ventilation = "Breathable Film / Anti-Fog Coating"
                anaerobic_risk = "MEDIUM"
            else:
                gas_strategy = "Low Respiration MAP: 5-8% O₂, 2-5% CO₂, Balance N₂."
                ventilation = "Standard Macro-vented or High Permeability Film"
                anaerobic_risk = "LOW"
        elif category in ["meat", "snack", "bakery", "dairy"]:
            map_suitability = True
            gas_strategy = "Flush with 70-80% N₂ / 20-30% CO₂ (Residual O₂ < 0.5%) for mold prevention."
            ventilation = "Hermetic Barrier Seal (Zero Perforation)"
            anaerobic_risk = "N/A - Non-respiring product"
        else:
            map_suitability = False
            gas_strategy = "Ambient Air Packaging or Light Vacuum Seal"
            ventilation = "Non-perforated Standard Seal"
            anaerobic_risk = "N/A"

        # Condensation Risk Analysis
        condensation_risk = "HIGH" if (rh and rh > 80.0 and is_fresh_produce) else ("MEDIUM" if is_fresh_produce else "LOW")

        return {
            "target_wvtr": target_wvtr,
            "wvtr_max_g_m2_day": wvtr_max,
            "target_otr": target_otr,
            "otr_max_cc_m2_day": otr_max,
            "recommended_thickness_range": target_thickness,
            "sealability_requirement": target_sealability,
            "mechanical_strength_requirement": target_mech_strength,
            "light_barrier_required": light_barrier_required,
            "light_barrier_desc": light_barrier_desc,
            "map_suitability": map_suitability,
            "recommended_gas_strategy": gas_strategy,
            "ventilation_strategy": ventilation,
            "anaerobic_risk": anaerobic_risk,
            "condensation_risk": condensation_risk,
            "is_fresh_produce": is_fresh_produce,
            "rules_triggered": rules_triggered
        }
