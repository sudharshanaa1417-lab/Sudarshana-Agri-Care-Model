from typing import Dict, Any, List

class SustainabilityAndCostEngine:
    """
    Calculates material mass, financial packaging cost, and environmental Life Cycle Assessment (LCA) metrics.
    """

    @classmethod
    def calculate_cost_and_sustainability(
        cls,
        material: Dict[str, Any],
        thickness_um: float = 60.0,
        package_quantity: int = 1000,
        food_weight_kg: float = 0.5,
        pouch_length_cm: float = 20.0,
        pouch_width_cm: float = 15.0
    ) -> Dict[str, Any]:

        # 1. Surface Area calculation for a standard 3-side seal or pillow pouch (front + back + seams ~ 15% allowance)
        area_m2 = (2 * (pouch_length_cm / 100.0) * (pouch_width_cm / 100.0)) * 1.15
        
        density_g_cm3 = float(material.get("density_g_cm3", 0.92))
        thickness_m = thickness_um * 1e-6 # convert µm to meters
        
        # Volume in m³ per package
        volume_m3 = area_m2 * thickness_m
        # Mass in grams per package (Density in g/cm³ -> 1 g/cm³ = 1000 kg/m³)
        mass_grams = volume_m3 * (density_g_cm3 * 1e6)
        mass_kg_per_package = mass_grams / 1000.0

        # Cost Calculations
        cost_per_kg_material = float(material.get("cost_per_kg_usd", 3.50))
        cost_per_package_usd = mass_kg_per_package * cost_per_kg_material
        cost_per_1000_usd = cost_per_package_usd * 1000.0
        
        # Cost per kg of food
        packages_per_kg_food = 1.0 / max(0.01, food_weight_kg)
        cost_per_kg_food_usd = cost_per_package_usd * packages_per_kg_food

        # Convert to INR at standard reference rate (1 USD = ~85 INR)
        usd_to_inr = 85.0
        cost_per_package_inr = cost_per_package_usd * usd_to_inr
        cost_per_1000_inr = cost_per_1000_usd * usd_to_inr
        cost_per_kg_food_inr = cost_per_kg_food_usd * usd_to_inr

        # Environmental Carbon Footprint
        carbon_factor = float(material.get("carbon_footprint_kg_co2_kg", 2.5)) # kg CO2 / kg material
        co2_per_package_g = mass_kg_per_package * carbon_factor * 1000.0

        return {
            "pouch_dimensions": f"{pouch_length_cm} cm x {pouch_width_cm} cm",
            "package_area_m2": round(area_m2, 4),
            "thickness_um": thickness_um,
            "package_mass_grams": round(mass_grams, 2),
            "cost_per_package_usd": round(cost_per_package_usd, 4),
            "cost_per_package_inr": round(cost_per_package_inr, 2),
            "cost_per_1000_packages_usd": round(cost_per_1000_usd, 2),
            "cost_per_1000_packages_inr": round(cost_per_1000_inr, 2),
            "cost_per_kg_food_usd": round(cost_per_kg_food_usd, 4),
            "cost_per_kg_food_inr": round(cost_per_kg_food_inr, 2),
            "cost_label": "DATABASE ESTIMATE",
            "co2_per_package_g": round(co2_per_package_g, 2),
            "recyclability": material.get("recyclability_category", "Conditionally Recyclable"),
            "compostability": "Home / Industrial Compostable" if material.get("compostability") else "Non-Compostable",
            "end_of_life_pathway": "Mechanical Recycling (PE/PP stream)" if "LDPE" in material.get("polymer_type", "") or "PP" in material.get("polymer_type", "") else "Energy Recovery / Incineration",
            "environmental_notes": material.get("environmental_info", "LCA evaluated per ISO 14040 principles.")
        }
