from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    phone_number = Column(String(30), nullable=True)
    organization = Column(String(150), nullable=True)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    samples = relationship("FoodSample", back_populates="user")
    devices = relationship("SensorDevice", back_populates="user")
    reports = relationship("Report", back_populates="user")


class FoodSample(Base):
    __tablename__ = "food_samples"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    sample_name = Column(String(150), nullable=False)
    commodity = Column(String(100), nullable=False) # e.g. Fresh Mangoes, Roasted Almonds, Raw Milk
    category = Column(String(100), nullable=False) # Fresh Produce, Bakery, Dairy, Processed Snack, Meat, Dry Grains
    variety = Column(String(100), nullable=True)
    batch_id = Column(String(100), unique=True, nullable=False)
    
    # Food Properties (Sensor Mode vs Manual Mode)
    input_mode = Column(String(50), default="SENSOR MODE") # SENSOR MODE, MANUAL MODE
    moisture_content = Column(Float, nullable=True) # %
    fat_oil_content = Column(Float, nullable=True) # %
    ph = Column(Float, nullable=True)
    respiration_rate = Column(Float, nullable=True) # mg CO2/kg·h
    initial_shelf_life = Column(Integer, nullable=True) # days
    desired_shelf_life = Column(Integer, nullable=True) # days
    
    # Target Storage Conditions
    storage_temperature = Column(Float, nullable=True) # °C
    relative_humidity = Column(Float, nullable=True) # %
    transportation_duration = Column(Float, nullable=True) # hours or days
    transportation_condition = Column(String(100), nullable=True) # Ambient, Cold Chain, Frozen
    storage_type = Column(String(50), default="Ambient") # Ambient, Chilled, Frozen
    
    light_sensitivity = Column(Boolean, default=False)
    oxidation_sensitivity = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="samples")
    readings = relationship("SensorReading", back_populates="sample")
    recommendations = relationship("PackagingRecommendation", back_populates="sample")
    shelf_life_predictions = relationship("ShelfLifePrediction", back_populates="sample")


class SensorDevice(Base):
    __tablename__ = "sensor_devices"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String(100), unique=True, index=True, nullable=False) # e.g. ESP32-PACK-01
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    device_name = Column(String(100), default="PackSense ESP32 IoT Node")
    status = Column(String(50), default="DISCONNECTED") # CONNECTED, DISCONNECTED, ERROR
    mac_address = Column(String(50), nullable=True)
    ip_address = Column(String(50), nullable=True)
    last_seen = Column(DateTime, nullable=True)
    firmware_version = Column(String(50), default="v1.0.4-PackSense")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="devices")
    calibrations = relationship("SensorCalibration", back_populates="device")
    readings = relationship("SensorReading", back_populates="device")


class SensorCalibration(Base):
    __tablename__ = "sensor_calibration"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("sensor_devices.id"), nullable=False)
    sensor_type = Column(String(50), nullable=False) # Temperature, Humidity, CO2, Moisture, pH
    calibration_date = Column(DateTime, default=datetime.utcnow)
    offset_value = Column(Float, default=0.0)
    scale_factor = Column(Float, default=1.0)
    status = Column(String(50), default="CALIBRATED") # CALIBRATED, PENDING, EXPIRED
    calibrated_by = Column(String(100), nullable=True)
    notes = Column(Text, nullable=True)

    device = relationship("SensorDevice", back_populates="calibrations")


class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("sensor_devices.id"), nullable=True)
    sample_id = Column(Integer, ForeignKey("food_samples.id"), nullable=True)
    
    temperature = Column(Float, nullable=True) # °C
    humidity = Column(Float, nullable=True) # %
    co2 = Column(Float, nullable=True) # ppm
    moisture = Column(Float, nullable=True) # %
    ph = Column(Float, nullable=True)
    respiration_rate = Column(Float, nullable=True) # mg CO2/kg·h
    oil_fat_level = Column(Float, nullable=True) # %
    
    sensor_status = Column(String(50), default="ONLINE") # ONLINE, OFFLINE, DEGRADED
    source_type = Column(String(50), default="LIVE SENSOR DATA") # LIVE SENSOR DATA, USER INPUT, API DATA
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    device = relationship("SensorDevice", back_populates="readings")
    sample = relationship("FoodSample", back_populates="readings")


class StorageCondition(Base):
    __tablename__ = "storage_conditions"

    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("food_samples.id"), nullable=False)
    target_temp_min = Column(Float, nullable=True)
    target_temp_max = Column(Float, nullable=True)
    target_rh_min = Column(Float, nullable=True)
    target_rh_max = Column(Float, nullable=True)
    storage_type = Column(String(50), default="Ambient")
    created_at = Column(DateTime, default=datetime.utcnow)


class PackagingMaterial(Base):
    __tablename__ = "packaging_materials"

    id = Column(Integer, primary_key=True, index=True)
    material_id = Column(String(50), unique=True, index=True, nullable=False) # e.g. MAT-LDPE-01
    material_name = Column(String(150), nullable=False) # e.g. Low-Density Polyethylene
    material_type = Column(String(100), nullable=False) # Monolayer, Laminate, Bio-based, Co-extruded
    polymer_type = Column(String(100), nullable=False) # LDPE, HDPE, PP, PET, BOPP, Met-PET, Al-Foil, PLA, PHA, Cellulose
    structure = Column(String(150), nullable=False) # e.g. PET 12µm / Al-Foil 7µm / LDPE 50µm
    
    # Barrier & Technical Attributes
    thickness_min_um = Column(Float, nullable=False)
    thickness_max_um = Column(Float, nullable=False)
    otr_cc_m2_day = Column(Float, nullable=False) # Oxygen Transmission Rate (cc/m²·day·atm)
    wvtr_g_m2_day = Column(Float, nullable=False) # Water Vapor Transmission Rate (g/m²·day)
    sealability = Column(String(50), nullable=False) # High, Medium, Low
    mechanical_strength_mpa = Column(Float, nullable=False) # Tensile Strength in MPa
    temp_min_c = Column(Float, nullable=False) # Temp limits
    temp_max_c = Column(Float, nullable=False)
    
    moisture_barrier_grade = Column(String(50), nullable=False) # Excellent, Good, Fair, Poor
    oxygen_barrier_grade = Column(String(50), nullable=False)
    light_barrier_grade = Column(String(50), nullable=False)
    fat_resistance_grade = Column(String(50), nullable=False)
    chemical_resistance_grade = Column(String(50), nullable=False)
    
    # Sustainability & MAP
    recyclability_category = Column(String(50), nullable=False) # Fully Recyclable, Conditionally Recyclable, Non-Recyclable
    compostability = Column(Boolean, default=False) # Industrial, Home, Non-Compostable
    map_compatibility = Column(Boolean, default=True) # MAP suitable
    typical_applications = Column(Text, nullable=False)
    
    # Cost & Environmental
    density_g_cm3 = Column(Float, default=0.92)
    cost_per_kg_usd = Column(Float, nullable=False) # Cost in USD per kg
    carbon_footprint_kg_co2_kg = Column(Float, default=2.5) # kg CO2 / kg material
    environmental_info = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    properties = relationship("PackagingProperty", back_populates="material")


class PackagingProperty(Base):
    __tablename__ = "packaging_properties"

    id = Column(Integer, primary_key=True, index=True)
    material_id = Column(Integer, ForeignKey("packaging_materials.id"), nullable=False)
    property_name = Column(String(100), nullable=False)
    property_value = Column(String(100), nullable=False)
    unit = Column(String(50), nullable=True)
    test_standard = Column(String(100), nullable=True) # e.g. ASTM D3985 for OTR, ASTM F1249 for WVTR

    material = relationship("PackagingMaterial", back_populates="properties")


class PackagingRecommendation(Base):
    __tablename__ = "packaging_recommendations"

    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("food_samples.id"), nullable=False)
    recommended_material_id = Column(Integer, ForeignKey("packaging_materials.id"), nullable=True)
    
    recommended_material_name = Column(String(150), nullable=False)
    recommended_structure = Column(String(200), nullable=False)
    recommended_thickness_um = Column(String(50), nullable=False)
    required_otr = Column(String(100), nullable=False)
    required_wvtr = Column(String(100), nullable=False)
    sealability_requirement = Column(String(50), nullable=False)
    map_suitability = Column(Boolean, default=False)
    recommended_gas_strategy = Column(Text, nullable=True)
    
    # AI Explainability & Analysis
    why_recommended = Column(Text, nullable=False)
    expected_advantages = Column(JSON, nullable=True)
    potential_limitations = Column(JSON, nullable=True)
    sustainability_summary = Column(Text, nullable=True)
    cost_summary = Column(Text, nullable=True)
    risk_level = Column(String(50), default="LOW") # LOW, MEDIUM, HIGH, CRITICAL
    
    created_at = Column(DateTime, default=datetime.utcnow)

    sample = relationship("FoodSample", back_populates="recommendations")
    material = relationship("PackagingMaterial")


class RecommendationHistory(Base):
    __tablename__ = "recommendation_history"

    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("food_samples.id"), nullable=False)
    recommendation_id = Column(Integer, ForeignKey("packaging_recommendations.id"), nullable=False)
    rule_engine_output = Column(JSON, nullable=True)
    ai_raw_response = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ShelfLifePrediction(Base):
    __tablename__ = "shelf_life_predictions"

    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(Integer, ForeignKey("food_samples.id"), nullable=False)
    estimated_shelf_life_days = Column(Float, nullable=False)
    shelf_life_range_min = Column(Float, nullable=False)
    shelf_life_range_max = Column(Float, nullable=False)
    primary_deterioration_factor = Column(String(150), nullable=False)
    packaging_barrier_impact = Column(String(150), nullable=False)
    environmental_impact = Column(String(150), nullable=False)
    disclaimer = Column(String(255), default="AI/model-based estimate — validation required before commercial use.")
    created_at = Column(DateTime, default=datetime.utcnow)

    sample = relationship("FoodSample", back_populates="shelf_life_predictions")


class CostData(Base):
    __tablename__ = "cost_data"

    id = Column(Integer, primary_key=True, index=True)
    material_id = Column(Integer, ForeignKey("packaging_materials.id"), nullable=False)
    cost_per_package_usd = Column(Float, nullable=False)
    cost_per_1000_packages_usd = Column(Float, nullable=False)
    cost_per_kg_food_usd = Column(Float, nullable=False)
    label = Column(String(50), default="DATABASE ESTIMATE")
    updated_at = Column(DateTime, default=datetime.utcnow)


class SustainabilityData(Base):
    __tablename__ = "sustainability_data"

    id = Column(Integer, primary_key=True, index=True)
    material_id = Column(Integer, ForeignKey("packaging_materials.id"), nullable=False)
    recyclability = Column(String(50), nullable=False)
    compostability = Column(String(50), nullable=False)
    estimated_carbon_footprint = Column(Float, nullable=False) # kg CO2-eq
    end_of_life_pathway = Column(String(150), nullable=False)
    reuse_potential = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class DataSource(Base):
    __tablename__ = "data_sources"

    id = Column(Integer, primary_key=True, index=True)
    metric_name = Column(String(100), nullable=False) # e.g. Temperature, Moisture, OTR, Price
    source_type = Column(String(50), nullable=False) # LIVE SENSOR DATA, USER INPUT, API DATA, CALCULATED, DATABASE, AI RECOMMENDATION
    source_name = Column(String(150), nullable=False) # e.g. ESP32 DHT22, User Form, Gemini AI, Packaging DB
    status = Column(String(50), default="VALID") # VALID, WARNING, STALE, REJECTED
    unit = Column(String(50), nullable=True)
    last_updated = Column(DateTime, default=datetime.utcnow)
    confidence_score = Column(Float, default=1.0) # 0.0 - 1.0


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    sample_id = Column(Integer, ForeignKey("food_samples.id"), nullable=False)
    report_title = Column(String(200), nullable=False)
    file_path = Column(String(255), nullable=True)
    data_summary = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="reports")
    sample = relationship("FoodSample")


class GovernmentResource(Base):
    __tablename__ = "government_resources"

    id = Column(Integer, primary_key=True, index=True)
    organization = Column(String(100), nullable=False) # MoFPI, FSSAI, BIS, ICAR, FAO
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False) # Standards, Regulations, Packaging Manual, Research
    summary = Column(Text, nullable=False)
    url = Column(String(255), nullable=True)
    publication_date = Column(String(50), nullable=True)
    retrieval_date = Column(DateTime, default=datetime.utcnow)
