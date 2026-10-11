from datetime import datetime, timedelta
from typing import Dict, Any, Optional, Tuple

class DataValidator:
    """
    Enforces strict data integrity and NO-DUMMY-DATA compliance across PackSense AI.
    Rejects null/impossible readings, flags stale sensor data, and ensures exact source tagging.
    """

    VALID_RANGES = {
        "temperature": (-20.0, 70.0),    # °C
        "humidity": (0.0, 100.0),       # % RH
        "co2": (300.0, 50000.0),        # ppm
        "moisture": (0.0, 100.0),       # %
        "ph": (1.0, 14.0),              # pH scale
        "respiration_rate": (0.0, 500.0) # mg CO2/kg·h
    }

    @classmethod
    def validate_sensor_payload(cls, data: Dict[str, Any]) -> Tuple[bool, Optional[str], Dict[str, Any]]:
        """
        Validates incoming sensor payload from ESP32 or HTTP ingestion.
        Returns: (is_valid, error_message, sanitized_data)
        """
        if not isinstance(data, dict):
            return False, "Invalid payload format: expected JSON object", {}

        sanitized = {}
        for key, value in data.items():
            if key in cls.VALID_RANGES:
                if value is None:
                    continue  # Omit null values cleanly, do not replace with fake data
                
                try:
                    val_float = float(value)
                except (ValueError, TypeError):
                    return False, f"Invalid numerical value for {key}: {value}", {}

                min_val, max_val = cls.VALID_RANGES[key]
                if not (min_val <= val_float <= max_val):
                    return False, f"Sensor reading out of plausible physical range for {key}: {val_float} (Valid: {min_val} to {max_val})", {}
                
                sanitized[key] = val_float
            else:
                sanitized[key] = value

        if not sanitized:
            return False, "No valid sensor data keys provided", {}

        return True, None, sanitized

    @classmethod
    def get_source_label(cls, source_type: str) -> str:
        valid_sources = {
            "LIVE SENSOR DATA",
            "USER INPUT",
            "API DATA",
            "CALCULATED",
            "DATABASE",
            "AI RECOMMENDATION"
        }
        upper_source = source_type.upper()
        return upper_source if upper_source in valid_sources else "USER INPUT"

    @classmethod
    def check_sensor_freshness(cls, last_seen: Optional[datetime], threshold_seconds: int = 45) -> Tuple[str, bool]:
        """
        Checks if an ESP32 device reading is fresh or stale.
        Returns: (status_text, is_connected)
        """
        if not last_seen:
            return "ESP32 NOT CONNECTED — CONNECT DEVICE TO START LIVE ANALYSIS", False
        
        elapsed = (datetime.utcnow() - last_seen).total_seconds()
        if elapsed > threshold_seconds:
            return "SENSOR OFFLINE (No signal for >45s)", False
        
        return "CONNECTED", True
