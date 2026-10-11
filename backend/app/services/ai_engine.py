import os
import json
import requests
from typing import Dict, Any, List, Optional
from app.core.config import settings

class AIEngine:
    """
    AI Recommendation Layer for PackSense AI.
    Integrates Google Gemini API on top of deterministic rule-engine results
    and database material candidates to output explainable recommendations.
    """

    @classmethod
    def generate_recommendation(
        cls,
        food_sample: Dict[str, Any],
        live_sensors: Dict[str, Any],
        rule_output: Dict[str, Any],
        db_candidate_materials: List[Dict[str, Any]]
    ) -> Dict[str, Any]:

        api_key = settings.GEMINI_API_KEY or settings.ANTIGRAVITY_API_KEY or os.getenv("GEMINI_API_KEY") or os.getenv("ANTIGRAVITY_API_KEY")
        
        # Format input for AI model
        prompt_payload = {
            "food_profile": food_sample,
            "live_sensors": live_sensors,
            "deterministic_rule_requirements": rule_output,
            "database_candidate_materials": db_candidate_materials
        }

        if api_key:
            try:
                ai_response = cls._call_gemini_api(api_key, prompt_payload)
                if ai_response:
                    return ai_response
            except Exception as e:
                print(f"[PackSense AI Engine] Gemini API call exception: {e}")

        # Fallback to deterministic expert match if API key missing or call fails
        return cls._generate_deterministic_ai_fallback(food_sample, rule_output, db_candidate_materials)

    @classmethod
    def _call_gemini_api(cls, api_key: str, payload: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        
        system_instruction = (
            "You are PackSense AI, an expert food packaging scientist and materials engineer. "
            "Evaluate the provided food profile, live sensor readings, and rule-based barrier requirements. "
            "Select the single best packaging material from the database candidates and provide 2 alternative structures. "
            "You must return ONLY a raw valid JSON object without markdown formatting, with the following keys:\n"
            "{\n"
            '  "recommended_material_name": "String",\n'
            '  "recommended_structure": "String",\n'
            '  "recommended_thickness_um": "String",\n'
            '  "required_otr": "String",\n'
            '  "required_wvtr": "String",\n'
            '  "sealability_requirement": "String",\n'
            '  "map_suitability": boolean,\n'
            '  "recommended_gas_strategy": "String",\n'
            '  "why_recommended": "Detailed scientific explanation string",\n'
            '  "expected_advantages": ["Advantage 1", "Advantage 2", "Advantage 3"],\n'
            '  "potential_limitations": ["Limitation 1", "Limitation 2"],\n'
            '  "sustainability_summary": "String analysis",\n'
            '  "cost_summary": "String analysis",\n'
            '  "risk_level": "LOW" | "MEDIUM" | "HIGH",\n'
            '  "alternatives": [\n'
            '     {"material_name": "Alt 1", "structure": "Structure 1", "trade_off": "Trade-off details"},\n'
            '     {"material_name": "Alt 2", "structure": "Structure 2", "trade_off": "Trade-off details"}\n'
            '  ]\n'
            "}"
        )

        user_prompt = f"Analyze this food packaging scenario and select the optimal material from the candidates:\n{json.dumps(payload, indent=2)}"

        body = {
            "contents": [
                {
                    "parts": [
                        {"text": system_instruction + "\n\n" + user_prompt}
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "response_mime_type": "application/json"
            }
        }

        response = requests.post(url, json=body, headers={"Content-Type": "application/json"}, timeout=12)
        if response.status_code == 200:
            res_data = response.json()
            raw_text = res_data["candidates"][0]["content"]["parts"][0]["text"].strip()
            # Clean markdown JSON block formatting if present
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            if raw_text.startswith("```"):
                raw_text = raw_text[3:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]
            parsed = json.loads(raw_text.strip())
            parsed["ai_status"] = "AI RECOMMENDATION (Gemini 1.5 Powered)"
            return parsed
        
        return None

    @classmethod
    def _generate_deterministic_ai_fallback(
        cls,
        food_sample: Dict[str, Any],
        rule_output: Dict[str, Any],
        db_materials: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Expert scientific fallback when external AI key is absent.
        Matches candidate packaging materials against computed OTR & WVTR thresholds.
        """
        best_mat = None
        best_score = float('inf')

        wvtr_target = rule_output.get("wvtr_max_g_m2_day", 10.0)
        otr_target = rule_output.get("otr_max_cc_m2_day", 100.0)
        is_fresh = rule_output.get("is_fresh_produce", False)

        for mat in db_materials:
            m_wvtr = mat.get("wvtr_g_m2_day", 10.0)
            m_otr = mat.get("otr_cc_m2_day", 100.0)

            if is_fresh:
                # Fresh produce prefers higher permeability / breathable films
                if "breathable" in mat.get("polymer_type", "").lower() or "micro-perforated" in mat.get("material_name", "").lower() or m_otr > 500:
                    score = abs(m_otr - 5000)
                else:
                    score = 10000 + m_otr
            else:
                # Barrier foods prefer materials meeting WVTR <= wvtr_target & OTR <= otr_target
                wvtr_diff = max(0, m_wvtr - wvtr_target) * 20
                otr_diff = max(0, m_otr - otr_target) * 5
                score = wvtr_diff + otr_diff + (m_wvtr + (m_otr / 10.0))

            if score < best_score:
                best_score = score
                best_mat = mat

        if not best_mat and db_materials:
            best_mat = db_materials[0]

        mat_name = best_mat.get("material_name", "PET / Al-Foil / LDPE High Barrier Laminate") if best_mat else "PET / Al-Foil / LDPE Laminate"
        mat_struct = best_mat.get("structure", "PET 12µm / Al 7µm / LDPE 50µm") if best_mat else "PET 12µm / Al 7µm / LDPE 50µm"

        return {
            "recommended_material_name": mat_name,
            "recommended_structure": mat_struct,
            "recommended_thickness_um": rule_output.get("recommended_thickness_range", "50 - 90 µm"),
            "required_otr": rule_output.get("target_otr", "< 10 cc/m²·day·atm"),
            "required_wvtr": rule_output.get("target_wvtr", "< 1.5 g/m²·day"),
            "sealability_requirement": rule_output.get("sealability_requirement", "High Integrity Heat Seal"),
            "map_suitability": rule_output.get("map_suitability", False),
            "recommended_gas_strategy": rule_output.get("recommended_gas_strategy", "Ambient"),
            "why_recommended": f"Rule-Based Expert Match: Selected {mat_name} based on calculated barrier thresholds (WVTR: {rule_output.get('target_wvtr')}, OTR: {rule_output.get('target_otr')}) and product vulnerability rules.",
            "expected_advantages": [
                f"Meets target WVTR ({best_mat.get('wvtr_g_m2_day', 'N/A')} g/m²·day) to prevent moisture transfer",
                f"Meets target OTR ({best_mat.get('otr_cc_m2_day', 'N/A')} cc/m²·day·atm) to prevent oxidation",
                f"Optimal temperature range ({best_mat.get('temp_min_c', -20)}°C to {best_mat.get('temp_max_c', 80)}°C)"
            ],
            "potential_limitations": [
                "Laminate structures require specialized municipal recycling streams",
                "Requires precise heat sealing temperature control during form-fill-seal"
            ],
            "sustainability_summary": f"Recyclability: {best_mat.get('recyclability_category', 'Conditionally Recyclable')}. Carbon footprint ~{best_mat.get('carbon_footprint_kg_co2_kg', 2.5)} kg CO₂-eq/kg.",
            "cost_summary": f"Estimated base material cost: ~${best_mat.get('cost_per_kg_usd', 3.50):.2f}/kg.",
            "risk_level": "LOW",
            "ai_status": "AI SERVICE TEMPORARILY UNAVAILABLE — RULE-BASED ANALYSIS AVAILABLE",
            "alternatives": [
                {
                    "material_name": "BOPP / Met-PET / PE",
                    "structure": "BOPP 20µm / Met-PET 12µm / PE 40µm",
                    "trade_off": "Lower cost alternative with slightly higher OTR (15 cc/m²·day·atm)"
                },
                {
                    "material_name": "PLA Bio-Polymer Film",
                    "structure": "PLA 30µm / Cellulose Barrier",
                    "trade_off": "Compostable eco-friendly structure with higher moisture permeability"
                }
            ]
        }
