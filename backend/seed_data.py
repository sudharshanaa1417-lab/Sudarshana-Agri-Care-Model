import uuid
from app.core.database import SessionLocal, Base, engine
from app.core.security import get_password_hash
from app.models.db_models import User, PackagingMaterial, GovernmentResource, FoodSample, SensorDevice

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        print("[PackSense AI] Seeding Database...")

        # 1. Seed Default User
        admin_user = db.query(User).filter(User.email == "admin@packsense.ai").first()
        if not admin_user:
            admin_user = User(
                name="Packaging Specialist",
                email="admin@packsense.ai",
                organization="Food Technology Research Center",
                hashed_password=get_password_hash("password123")
            )
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)
            print(" -> Created Admin User: admin@packsense.ai")

        # 2. Seed ESP32 Device Record
        device = db.query(SensorDevice).filter(SensorDevice.device_id == "ESP32-PACK-01").first()
        if not device:
            device = SensorDevice(
                device_id="ESP32-PACK-01",
                device_name="PackSense Multi-Sensor IoT Node #1",
                status="DISCONNECTED",
                firmware_version="v1.0.4-PackSense"
            )
            db.add(device)
            db.commit()
            print(" -> Registered ESP32 Device: ESP32-PACK-01")

        # 3. Seed Real Packaging Materials
        materials_data = [
            {
                "material_id": "MAT-PET-AL-PE-01",
                "material_name": "PET / Al-Foil / LDPE High-Barrier Triplex Laminate",
                "material_type": "Triplex Barrier Laminate",
                "polymer_type": "PET / Aluminum Foil / LDPE",
                "structure": "PET 12µm / Al-Foil 7µm / LDPE 50µm",
                "thickness_min_um": 65.0,
                "thickness_max_um": 90.0,
                "otr_cc_m2_day": 0.1,
                "wvtr_g_m2_day": 0.05,
                "sealability": "High Integrity Heat Seal",
                "mechanical_strength_mpa": 45.0,
                "temp_min_c": -18.0,
                "temp_max_c": 90.0,
                "moisture_barrier_grade": "Excellent",
                "oxygen_barrier_grade": "Excellent",
                "light_barrier_grade": "Excellent (Opaque)",
                "fat_resistance_grade": "Excellent",
                "chemical_resistance_grade": "Excellent",
                "recyclability_category": "Conditionally Recyclable",
                "compostability": False,
                "map_compatibility": True,
                "typical_applications": "Roasted nuts, coffee, powdered milk, moisture/light sensitive dry snacks, shelf-stable military rations",
                "density_g_cm3": 1.15,
                "cost_per_kg_usd": 4.80,
                "carbon_footprint_kg_co2_kg": 3.8
            },
            {
                "material_id": "MAT-BOPP-MET-PE-02",
                "material_name": "BOPP / Metallized PET / LDPE Duplex Laminate",
                "material_type": "Metallized Barrier Laminate",
                "polymer_type": "BOPP / Met-PET / LDPE",
                "structure": "BOPP 20µm / Met-PET 12µm / LDPE 40µm",
                "thickness_min_um": 50.0,
                "thickness_max_um": 75.0,
                "otr_cc_m2_day": 15.0,
                "wvtr_g_m2_day": 0.8,
                "sealability": "High Heat Sealability",
                "mechanical_strength_mpa": 38.0,
                "temp_min_c": -10.0,
                "temp_max_c": 80.0,
                "moisture_barrier_grade": "Excellent",
                "oxygen_barrier_grade": "Good",
                "light_barrier_grade": "Good (Met Light Shield)",
                "fat_resistance_grade": "Good",
                "chemical_resistance_grade": "Good",
                "recyclability_category": "Conditionally Recyclable",
                "compostability": False,
                "map_compatibility": True,
                "typical_applications": "Potato chips, fried snack foods, confectionery, bakery goods",
                "density_g_cm3": 0.98,
                "cost_per_kg_usd": 3.60,
                "carbon_footprint_kg_co2_kg": 2.7
            },
            {
                "material_id": "MAT-MICRO-PERF-BOPP-03",
                "material_name": "Micro-Perforated Breathable BOPP Film",
                "material_type": "Perforated Breathable Monolayer",
                "polymer_type": "Micro-Perforated BOPP",
                "structure": "Laser Micro-Perforated BOPP 30µm (120µm hole size)",
                "thickness_min_um": 25.0,
                "thickness_max_um": 40.0,
                "otr_cc_m2_day": 8500.0,
                "wvtr_g_m2_day": 45.0,
                "sealability": "Medium Heat Sealability",
                "mechanical_strength_mpa": 30.0,
                "temp_min_c": 0.0,
                "temp_max_c": 50.0,
                "moisture_barrier_grade": "Fair (Controlled Permeability)",
                "oxygen_barrier_grade": "Permeable / Respirational",
                "light_barrier_grade": "Transparent",
                "fat_resistance_grade": "Fair",
                "chemical_resistance_grade": "Good",
                "recyclability_category": "Fully Recyclable (PP Stream)",
                "compostability": False,
                "map_compatibility": True,
                "typical_applications": "Fresh fruits, leafy vegetables, high-respiration produce (grapes, strawberries, mangoes)",
                "density_g_cm3": 0.90,
                "cost_per_kg_usd": 2.90,
                "carbon_footprint_kg_co2_kg": 1.9
            },
            {
                "material_id": "MAT-PLA-BIO-04",
                "material_name": "PLA Bio-Polymer Compostable Film",
                "material_type": "Bio-based Monolayer",
                "polymer_type": "PolyLactic Acid (PLA)",
                "structure": "Clear PLA Bio-Film 35µm",
                "thickness_min_um": 25.0,
                "thickness_max_um": 50.0,
                "otr_cc_m2_day": 550.0,
                "wvtr_g_m2_day": 22.0,
                "sealability": "Medium Seal Integrity",
                "mechanical_strength_mpa": 42.0,
                "temp_min_c": 0.0,
                "temp_max_c": 45.0,
                "moisture_barrier_grade": "Fair",
                "oxygen_barrier_grade": "Moderate",
                "light_barrier_grade": "Transparent / High Clarity",
                "fat_resistance_grade": "Good",
                "chemical_resistance_grade": "Fair",
                "recyclability_category": "Compostable Stream Only",
                "compostability": True,
                "map_compatibility": True,
                "typical_applications": "Organic salads, fresh herbs, short shelf-life produce, eco-bakery products",
                "density_g_cm3": 1.24,
                "cost_per_kg_usd": 5.20,
                "carbon_footprint_kg_co2_kg": 1.2
            },
            {
                "material_id": "MAT-LDPE-FROZEN-05",
                "material_name": "Heavy-Duty Low-Density Polyethylene (LDPE Freezer Grade)",
                "material_type": "Freezer Monolayer",
                "polymer_type": "LDPE / LLDPE Co-ex",
                "structure": "Co-extruded LLDPE/LDPE 80µm",
                "thickness_min_um": 70.0,
                "thickness_max_um": 120.0,
                "otr_cc_m2_day": 2500.0,
                "wvtr_g_m2_day": 1.2,
                "sealability": "Hermetic High-Impact Seal",
                "mechanical_strength_mpa": 28.0,
                "temp_min_c": -35.0,
                "temp_max_c": 60.0,
                "moisture_barrier_grade": "Excellent",
                "oxygen_barrier_grade": "Poor",
                "light_barrier_grade": "Transparent / Translucent",
                "fat_resistance_grade": "Good",
                "chemical_resistance_grade": "Good",
                "recyclability_category": "Fully Recyclable (PE Stream)",
                "compostability": False,
                "map_compatibility": False,
                "typical_applications": "Frozen seafood, frozen vegetables, ice cream, IQF meat cuts",
                "density_g_cm3": 0.92,
                "cost_per_kg_usd": 2.10,
                "carbon_footprint_kg_co2_kg": 1.8
            }
        ]

        for m_data in materials_data:
            existing_m = db.query(PackagingMaterial).filter(PackagingMaterial.material_id == m_data["material_id"]).first()
            if not existing_m:
                db.add(PackagingMaterial(**m_data))
        db.commit()
        print(" -> Seeded 5 Packaging Materials into Database")

        # 4. Seed Government Resources
        govt_data = [
            {
                "organization": "MoFPI",
                "title": "Scheme for Creation of Food Processing & Packaging Infrastructure",
                "category": "Government Schemes & Subsidies",
                "summary": "Ministry of Food Processing Industries guidelines for modern cold chain, MAP packaging machinery adoption, and quality testing labs.",
                "url": "https://mofpi.gov.in/",
                "publication_date": "2024-01-15"
            },
            {
                "organization": "FSSAI",
                "title": "Food Safety and Standards (Packaging) Regulations",
                "category": "Regulatory Standard",
                "summary": "Mandatory safety parameters for food contact materials, migration limits for heavy metals/plasticizers, and food-grade polymer certifications.",
                "url": "https://www.fssai.gov.in/",
                "publication_date": "2023-11-20"
            },
            {
                "organization": "BIS",
                "title": "IS 10146: Polyethylene for its safe use in contact with foodstuffs",
                "category": "Bureau of Indian Standards",
                "summary": "Indian standard specifications for food-grade PE, PP, and PET film structures used in primary food packaging.",
                "url": "https://www.services.bis.gov.in/",
                "publication_date": "2022-08-10"
            },
            {
                "organization": "ICAR",
                "title": "Post-Harvest Handling & MAP Specifications for Fresh Produce",
                "category": "Research Manual",
                "summary": "ICAR guidelines for respiration rates, optimal storage temperatures, and micro-perforated film equilibrium gas compositions for tropical fruits.",
                "url": "https://icar.org.in/",
                "publication_date": "2023-04-05"
            },
            {
                "organization": "FAO",
                "title": "Appropriate Food Packaging Solutions for Developing Countries",
                "category": "International Manual",
                "summary": "FAO manual on barrier film selection to reduce post-harvest food losses, spoilage prevention, and eco-friendly packaging materials.",
                "url": "https://www.fao.org/food-loss-and-food-waste/",
                "publication_date": "2021-09-12"
            }
        ]

        for g_data in govt_data:
            existing_g = db.query(GovernmentResource).filter(GovernmentResource.title == g_data["title"]).first()
            if not existing_g:
                db.add(GovernmentResource(**g_data))
        db.commit()
        print(" -> Seeded 5 Government & Ministry Resources")

        # 5. Seed Initial Food Sample
        existing_sample = db.query(FoodSample).filter(FoodSample.batch_id == "BATCH-MANGO-01").first()
        if not existing_sample:
            sample = FoodSample(
                user_id=admin_user.id,
                sample_name="Export Alphonso Mangoes",
                commodity="Fresh Mangoes",
                category="Fresh Produce",
                variety="Alphonso / Ratnagiri",
                batch_id="BATCH-MANGO-01",
                input_mode="SENSOR MODE",
                moisture_content=82.5,
                fat_oil_content=0.4,
                ph=4.5,
                respiration_rate=45.0,
                initial_shelf_life=10,
                desired_shelf_life=25,
                storage_temperature=13.0,
                relative_humidity=85.0,
                transportation_duration=72.0,
                transportation_condition="Cold Chain",
                storage_type="Chilled",
                light_sensitivity=False,
                oxidation_sensitivity=False
            )
            db.add(sample)
            db.commit()
            print(" -> Created Initial Sample: Export Alphonso Mangoes (BATCH-MANGO-01)")

        print("[PackSense AI] Database Seeding Completed Successfully!")

    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
