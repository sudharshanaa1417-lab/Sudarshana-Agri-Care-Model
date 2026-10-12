// Comprehensive Database of Agricultural Crops, Diseases, Homemade Remedies, and Fertilizer Schedules
// Fully integrated with trained neural network (plant_disease_recog_model_sudharshana_pwp.keras)
// Multilingual support for: English (en), Hindi (hi), Tamil (ta), Telugu (te), Kannada (kn)

export const CROP_NAMES_LOCALIZED = {
  'Tomato': { en: 'Tomato', hi: 'टमाटर', ta: 'தக்காளி', te: 'టమోటా', kn: 'ಟೊಮೆಟೊ' },
  'Potato': { en: 'Potato', hi: 'आलू', ta: 'உருளைக்கிழங்கு', te: 'బంగాళాదుంప', kn: 'ಆಲೂಗಡ್ಡೆ' },
  'Rice / Paddy': { en: 'Rice / Paddy', hi: 'धान (चावल)', ta: 'நெல்', te: 'వరి', kn: 'ಭತ್ತ' },
  'Wheat': { en: 'Wheat', hi: 'गेहूं', ta: 'கோதுமை', te: 'గోధుమ', kn: 'ಗೋಧಿ' },
  'Cotton': { en: 'Cotton', hi: 'कपास', ta: 'பருத்தி', te: 'పత్తి', kn: 'ಹತ್ತಿ' },
  'Corn / Maize': { en: 'Corn / Maize', hi: 'मक्का', ta: 'மக்காச்சோளம்', te: 'మొక్కజొన్న', kn: 'ಮೆಕ್ಕೆಜೋಳ' },
  'Chilli / Pepper': { en: 'Chilli / Bell Pepper', hi: 'शिमला मिर्च / मिर्च', ta: 'குடைமிளகாய் / மிளகாய்', te: 'బెల్ పెప్పర్ / మిరపకాయ', kn: 'ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ' },
  'Apple': { en: 'Apple', hi: 'सेब', ta: 'ஆப்பிள்', te: 'ఆపిల్', kn: 'ಸೇಬು' },
  'Grape': { en: 'Grape', hi: 'अंगूर', ta: 'திராட்சை', te: 'ద్రాక్ష', kn: 'ದ್ರಾಕ್ಷಿ' },
  'Orange / Citrus': { en: 'Orange (Citrus)', hi: 'संतरा (नींबू वर्गीय)', ta: 'ஆரஞ்சு (எலுமிச்சை)', te: 'నారింజ', kn: 'ಕಿತ್ತಳೆ' },
  'Peach': { en: 'Peach', hi: 'आड़ू', ta: 'பீச்', te: 'పీచ్', kn: 'ಪೀಚ್' },
  'Cherry': { en: 'Cherry', hi: 'चेरी', ta: 'செர்ரி', te: 'చెర్రీ', kn: 'ಚೆರ್ರಿ' },
  'Blueberry': { en: 'Blueberry', hi: 'ब्लूबेरी', ta: 'நீலநாகப்பழம்', te: 'బ్లూబెర్రీ', kn: 'ಬ್ಲೂಬೆರ್ರಿ' },
  'Strawberry': { en: 'Strawberry', hi: 'स्ट्रॉबेरी', ta: 'ஸ்ட்ராபெர்ரி', te: 'స్ట్రాబెర్రీ', kn: 'ಸ್ಟ್ರಾಬೆರಿ' },
  'Soybean': { en: 'Soybean', hi: 'सोयाबीन', ta: 'சோயாபீன்', te: 'సోயாబీన్', kn: 'ಸೋಯಾಬೀನ್' },
  'Squash': { en: 'Squash / Pumpkin', hi: 'कद्दू / स्क्वैश', ta: 'பூசணிக்காய்', te: 'గుమ్మడికాయ', kn: 'ಕುಂಬಳಕಾಯಿ' },
  'Raspberry': { en: 'Raspberry', hi: 'रसभरी', ta: 'ராஸ்பெர்ரி', te: 'ರಾಸ್ಪ್ಬೆర్రీ', kn: 'ರಾಸ್ಪ್ಬೆರ್ರಿ' },
  'Background': { en: 'Non-Plant / Background', hi: 'गैर-पौधा / पृष्ठभूमि', ta: 'தாவரமல்லாத பின்னணி', te: 'మొక్క కాని నేపథ్యం', kn: 'ಸಸ್ಯವಲ್ಲದ ಹಿನ್ನೆಲೆ' }
};

export const CROP_DISEASES = [
  {
    "id": "apple-scab",
    "modelIndex": 0,
    "cropKey": "Apple",
    "cropName": "Apple",
    "scientificName": "Malus domestica",
    "status": "affected",
    "diseaseName": "Apple Scab",
    "pathogen": "Fungal (Venturia inaequalis)",
    "severity": "Moderate (38% Leaf Area Affected)",
    "healthScore": 62,
    "badgeColor": "amber",
    "imageType": "apple-scab",
    "symptoms": "Velvety olive-green to dull black circular spots with feathery margins on leaf surface, leading to leaf distortion, chlorosis, and premature leaf drop.",
    "environmentalCause": "Cool, humid weather (15\u00b0C\u201322\u00b0C) with continuous leaf wetness exceeding 9 hours from morning dew or unseasonal rains.",
    "homemadeRemedies": [
      {
        "name": "Baking Soda & Horticultural Oil Antifungal Wash",
        "ingredients": "10g Sodium Bicarbonate (Baking Soda) + 5ml Vegetable Oil + 2ml liquid soap + 1L water.",
        "preparation": "Emulsify oil and soap in lukewarm water, dissolve baking soda, spray thoroughly across canopy.",
        "benefits": "Alters foliar surface pH to alkaline (pH > 8.0), desiccating fungal mycelium and arresting spore penetration."
      },
      {
        "name": "Fermented Garlic & Chili Extract Spray",
        "ingredients": "50g crushed garlic cloves + 25g green chilies soaked in 1L water for 24 hours.",
        "preparation": "Filter through muslin cloth, dilute with 4L clean water, spray on affected foliage.",
        "benefits": "Natural allicin compounds inhibit Venturia conidial germination without chemical residues."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Difenoconazole 25% EC (Score / Diffen)",
        "type": "Systemic Curative Fungicide",
        "brands": "Syngenta Score / Tata",
        "targetRole": "Penetrates leaf cuticle within 2 hours to halt incubating fungal spores."
      },
      {
        "name": "Mancozeb 75% WP (Indofil M-45)",
        "type": "Contact Protective Fungicide",
        "brands": "Indofil M-45 / UPL Saaf",
        "targetRole": "Forms a multi-site protective shield on leaf surface preventing new infection."
      }
    ],
    "dosageSchedule": {
      "frequency": "Apply once every 8 to 10 days during rainy or high humidity periods.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM) on dry leaves.",
      "sprayTimesPerDay": "Strictly 1 spray per day (Never spray twice on the same day).",
      "waterRatio": "2.0 grams Indofil M-45 or 0.5ml Score per 1 Liter of water (500g per 200L water per acre).",
      "precautions": "Prune dense canopy to facilitate sunlight penetration. Destroy fallen infected orchard leaves."
    },
    "voiceText": "Apple Scab fungal infection detected. Apply Mancozeb 75% WP at 2 grams per liter or Difenoconazole once every 8 days in the early morning."
  },
  {
    "id": "apple-black-rot",
    "modelIndex": 1,
    "cropKey": "Apple",
    "cropName": "Apple",
    "scientificName": "Malus domestica",
    "status": "affected",
    "diseaseName": "Black Rot",
    "pathogen": "Fungal (Botryosphaeria obtusa)",
    "severity": "High (54% Foliar & Twig Infection)",
    "healthScore": 46,
    "badgeColor": "red",
    "imageType": "apple-black-rot",
    "symptoms": "Frog-eye leaf spots with brown centers and distinct dark purple-red margins. Twig cankers and black mummified fruits.",
    "environmentalCause": "Warm humid conditions (20\u00b0C\u201327\u00b0C) accompanied by bark mechanical injuries and rain splashes.",
    "homemadeRemedies": [
      {
        "name": "Wood Ash & Lime Foliar Dusting",
        "ingredients": "Fine sifted hardwood ash (70%) mixed with slaked lime (30%).",
        "preparation": "Dust over damp morning dew leaves evenly once every 10 days.",
        "benefits": "Creates a dry alkaline barrier that halts fungal hyphae expansion."
      },
      {
        "name": "Sour Buttermilk & Hing Antifungal Spray",
        "ingredients": "1L 4-day fermented chaas + 10g powdered asafoetida (hing) in 10L water.",
        "preparation": "Mix thoroughly, filter, and spray on canopy.",
        "benefits": "Lactic acid bacteria competitively outcompete Botryosphaeria fungus."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Captan 50% WP (Captaf / Dhanuka)",
        "type": "Broad-Spectrum Protectant",
        "brands": "Rallis Captaf / Dhanuka",
        "targetRole": "Inactivates fungal enzymes and protects developing fruit clusters."
      },
      {
        "name": "Copper Oxychloride 50% WP (Blitox 50)",
        "type": "Contact Bactericide/Fungicide",
        "brands": "Tata Blitox / Rallis",
        "targetRole": "Sterilizes twig cankers and arrests necrotic leaf spotting."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 10 days until twig cankers heal.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.5 grams Blitox per 1 Liter of clean water (500g per 200L per acre).",
      "precautions": "Prune dead or cankered wood 15cm below visible damage and seal cuts with Bordeaux paste."
    },
    "voiceText": "Apple Black Rot detected. Prune infected twigs and spray Copper Oxychloride 50% WP at 2.5 grams per liter strictly once per day."
  },
  {
    "id": "apple-cedar-rust",
    "modelIndex": 2,
    "cropKey": "Apple",
    "cropName": "Apple",
    "scientificName": "Malus domestica",
    "status": "affected",
    "diseaseName": "Cedar Apple Rust",
    "pathogen": "Fungal (Gymnosporangium juniperi-virginianae)",
    "severity": "Moderate (35% Leaf Area Affected)",
    "healthScore": 65,
    "badgeColor": "amber",
    "imageType": "apple-cedar-rust",
    "symptoms": "Brilliant bright yellow-orange circular lesions on upper leaf surface, later producing tiny raised tube-like fungal aecia on the underside.",
    "environmentalCause": "Alternating wet and warm spring conditions requiring nearby Eastern red cedar or juniper trees as alternate hosts.",
    "homemadeRemedies": [
      {
        "name": "Neem Oil & Potassium Soap Emulsion",
        "ingredients": "5ml pure cold-pressed neem oil + 2ml liquid soap + 1L water.",
        "preparation": "Shake vigorously until milky white emulsion forms; spray immediately.",
        "benefits": "Disrupts rust spore germination without harming beneficial pollinating bees."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Myclobutanil 10% WP (Systhane)",
        "type": "Systemic Rust Specialist Fungicide",
        "brands": "Dow Systhane / Indofil",
        "targetRole": "Blocks ergosterol synthesis in Gymnosporangium rust fungus."
      },
      {
        "name": "Wettable Sulfur 80% WDG (Sulfex)",
        "type": "Elemental Protective Shield",
        "brands": "Excel Sulfex / UPL",
        "targetRole": "Protective multi-site vapor action against rust pustules."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days starting at petal fall stage.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "1.0 gram Systhane or 3.0 grams Sulfex per 1 Liter of water.",
      "precautions": "Remove volunteer juniper or cedar bushes within 500 meters of the apple orchard."
    },
    "voiceText": "Cedar Apple Rust detected. Apply Myclobutanil or Wettable Sulfur at 1 gram per liter once every 8 days in early morning."
  },
  {
    "id": "apple-healthy",
    "modelIndex": 3,
    "cropKey": "Apple",
    "cropName": "Apple",
    "scientificName": "Malus domestica",
    "status": "healthy",
    "condition": "Healthy Apple Tree \u2014 Optimal Vigor",
    "healthScore": 98,
    "badgeColor": "emerald",
    "imageType": "apple-healthy",
    "overview": "Vibrant emerald green leaves with intact cuticular wax, uniform chlorophyll density, and zero fungal lesions or pest punctures.",
    "healthyMaintenance": {
      "irrigation": "Deep basin or drip irrigation at 40\u201350 liters per mature tree per week during fruit development.",
      "preventiveBioSpray": "Prophylactic spray of 5ml/L cold-pressed Neem oil or 5% Panchagavya once every 14 days.",
      "nutrientPlan": "Foliar spray of Calcium Nitrate (3g/L) + Boron 20% (1g/L) during fruit set to prevent bitter pit.",
      "soilCare": "Maintain organic straw mulch in tree basins to preserve mycorrhizal root health."
    },
    "homemadeRemedies": [
      {
        "name": "Fermented Panchagavya Growth Tonic",
        "ingredients": "300ml Panchagavya diluted in 10L clean water.",
        "preparation": "Stir clockwise for 5 minutes and spray across tree canopy early morning.",
        "benefits": "Provides natural auxins, gibberellins, and beneficial microflora enhancing fruit size."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Water-Soluble NPK 13:00:45 (Potassium Nitrate)",
        "type": "Fruit Quality & Color Enhancer",
        "brands": "IFFCO / Haifa Multi-K",
        "targetRole": "Boosts fruit sugar accumulation, skin firmness, and shelf life."
      }
    ],
    "dosageSchedule": {
      "frequency": "Nutrient spray once every 14 days; bio-preventive spray every 15 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "4 grams per 1 Liter of water (800g per 200L water per acre).",
      "precautions": "Avoid spraying during active honeybee pollination hours."
    },
    "voiceText": "The Apple orchard foliage is completely healthy with 98% vigor! Continue balanced potassium nutrition and preventive neem spray once every 14 days."
  },
  {
    "id": "background-no-leaf",
    "modelIndex": 4,
    "cropKey": "Background",
    "cropName": "Non-Plant / Background",
    "scientificName": "Non-botanical object",
    "status": "background",
    "condition": "No Plant Leaf Detected \u2014 Please Align Camera",
    "healthScore": 0,
    "badgeColor": "slate",
    "imageType": "background-no-leaf",
    "overview": "The captured image shows a non-plant background, tabletop, soil, sky, or device bezel. No botanical foliage structure was detected.",
    "healthyMaintenance": {
      "irrigation": "Not applicable.",
      "preventiveBioSpray": "Not applicable.",
      "nutrientPlan": "Not applicable.",
      "soilCare": "Not applicable."
    },
    "homemadeRemedies": [],
    "fertilizersMedicines": [],
    "dosageSchedule": {
      "frequency": "Please recapture photo.",
      "timing": "Daylight conditions.",
      "sprayTimesPerDay": "N/A",
      "waterRatio": "N/A",
      "precautions": "Hold the device camera steady 15\u201325 cm directly above a clear crop leaf."
    },
    "voiceText": "No plant leaf was recognized in this photo. Please point your camera directly at a crop leaf and capture again."
  },
  {
    "id": "blueberry-healthy",
    "modelIndex": 5,
    "cropKey": "Blueberry",
    "cropName": "Blueberry",
    "scientificName": "Vaccinium corymbosum",
    "status": "healthy",
    "condition": "Healthy Blueberry Foliage \u2014 Optimal Health",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "blueberry-healthy",
    "overview": "Glossy ovate foliage with optimal deep green pigmentation, uniform venation, and absence of chlorosis or fungal spots.",
    "healthyMaintenance": {
      "irrigation": "Maintain acid soil moisture (pH 4.5\u20135.2) using drip irrigation with acidified water.",
      "preventiveBioSpray": "Spray bio-fungicide Trichoderma harzianum (4g/L) around root zone monthly.",
      "nutrientPlan": "Ammonium Sulfate fertilizer (2g/L) for acid-loving nitrogen supply.",
      "soilCare": "Pine needle or pine bark mulch (5\u20137 cm deep) to retain acidity and soil moisture."
    },
    "homemadeRemedies": [
      {
        "name": "Pine Needle Acidifying Mulch Tea",
        "ingredients": "500g dried pine needles steeped in 10L rain water for 3 days.",
        "preparation": "Pour around bush root drip line to maintain acidic rhizosphere.",
        "benefits": "Maintains acidic soil pH naturally without synthetic acidifiers."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Ammonium Sulfate (21-0-0) + Micronutrients",
        "type": "Acidic Nitrogen Source",
        "brands": "GSFC / IFFCO",
        "targetRole": "Supports vigorous new canes and high anthocyanin fruit development."
      }
    ],
    "dosageSchedule": {
      "frequency": "Fertigate every 14 days during vegetative shoot growth.",
      "timing": "Early morning.",
      "sprayTimesPerDay": "Strictly 1 application per day.",
      "waterRatio": "2 grams per Liter of water.",
      "precautions": "Never use nitrate fertilizers or lime on blueberry bushes."
    },
    "voiceText": "Blueberry bushes are completely healthy! Continue maintaining soil pH below 5.2 and apply pine needle mulch."
  },
  {
    "id": "cherry-powdery-mildew",
    "modelIndex": 6,
    "cropKey": "Cherry",
    "cropName": "Cherry",
    "scientificName": "Prunus avium",
    "status": "affected",
    "diseaseName": "Powdery Mildew",
    "pathogen": "Fungal (Podosphaera clandestina)",
    "severity": "Moderate (40% Leaf Surface Infected)",
    "healthScore": 60,
    "badgeColor": "amber",
    "imageType": "cherry-powdery-mildew",
    "symptoms": "White talcum powder-like fungal patches on leaf surfaces and young shoots, causing leaf curling, upward cupping, and stunted fruit growth.",
    "environmentalCause": "Warm days (20\u00b0C\u201328\u00b0C) with dry air and shade, combined with high nighttime humidity (>70%).",
    "homemadeRemedies": [
      {
        "name": "Milk & Water Bio-Antifungal Spray (1:9 ratio)",
        "ingredients": "100ml fresh cow milk + 900ml water.",
        "preparation": "Mix thoroughly and spray on foliage in direct sunlight.",
        "benefits": "Ferulic acid and lactoferrin proteins generate free radicals in sunlight that destroy powdery fungal mycelium within 24 hours."
      },
      {
        "name": "Baking Soda & Neem Foliar Spray",
        "ingredients": "5g Baking Soda + 5ml Neem Oil + 1L water.",
        "preparation": "Mix and spray weekly.",
        "benefits": "Alkalinizes leaf surface and prevents conidiophore formation."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Hexaconazole 5% SC (Contaf Plus)",
        "type": "Systemic Triazole Fungicide",
        "brands": "Tata Rallis Contaf / Syngenta",
        "targetRole": "Eradicates powdery mildew fungal mycelium on both leaf surfaces."
      },
      {
        "name": "Wettable Sulfur 80% WDG",
        "type": "Protective Contact Fungicide",
        "brands": "Sulfex / UPL",
        "targetRole": "Inhibits spore respiration across the entire orchard canopy."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days until white powdery film vanishes.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.0 ml Contaf or 3.0 grams Sulfur per 1 Liter of water.",
      "precautions": "Do not spray sulfur when ambient field temperature exceeds 32\u00b0C to prevent leaf scorching."
    },
    "voiceText": "Powdery Mildew detected on Cherry foliage. Spray milk solution (1 to 9) or Hexaconazole 5% SC at 2ml per liter once a week in early morning."
  },
  {
    "id": "cherry-healthy",
    "modelIndex": 7,
    "cropKey": "Cherry",
    "cropName": "Cherry",
    "scientificName": "Prunus avium",
    "status": "healthy",
    "condition": "Healthy Cherry Tree \u2014 Excellent Foliar Health",
    "healthScore": 98,
    "badgeColor": "emerald",
    "imageType": "cherry-healthy",
    "overview": "Deep green serrated cherry foliage with robust turgor pressure, clean petioles, and zero fungal mycelium or bacterial spot lesions.",
    "healthyMaintenance": {
      "irrigation": "Irrigate deeply every 7\u201310 days during fruit swell; avoid overhead watering.",
      "preventiveBioSpray": "Foliar spray of 5% Panchagavya + 5ml/L Neem oil every 15 days.",
      "nutrientPlan": "Foliar spray of Chelated Zinc 12% EDTA (1g/L) + Boron 20% (1g/L) post-flowering.",
      "soilCare": "Maintain clean orchard floor with composted cow manure mulching."
    },
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Hing Prophylactic Tonic",
        "ingredients": "1L sour buttermilk + 10g hing in 10L clean water.",
        "preparation": "Spray once a month on leaves.",
        "benefits": "Builds protective foliar immunity against sporulating fungal colonies."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Potassium Schoenite (0-0-23 + 11% Mg)",
        "type": "Premium Potassium & Magnesium Fertilizer",
        "brands": "IFFCO / Yara",
        "targetRole": "Increases sugar accumulation and strengthens leaf cellular walls."
      }
    ],
    "dosageSchedule": {
      "frequency": "Every 12 to 14 days during vegetative flushing.",
      "timing": "Early morning.",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "3 grams per 1 Liter of water.",
      "precautions": "Keep soil moist prior to foliar feeding."
    },
    "voiceText": "Cherry foliage is completely healthy! Continue drip irrigation and apply preventive neem spray once every 14 days."
  },
  {
    "id": "corn-gray-leaf-spot",
    "modelIndex": 8,
    "cropKey": "Corn / Maize",
    "cropName": "Corn / Maize",
    "scientificName": "Zea mays",
    "status": "affected",
    "diseaseName": "Cercospora Leaf Spot (Gray Leaf Spot)",
    "pathogen": "Fungal (Cercospora zeae-maydis)",
    "severity": "Moderate (42% Leaf Tissue Affected)",
    "healthScore": 58,
    "badgeColor": "amber",
    "imageType": "corn-gray-leaf-spot",
    "symptoms": "Narrow, rectangular, tan-to-gray necrotic lesions strictly bounded by leaf parallel veins. Lesions coalesce causing extensive foliar blighting and stalk lodging.",
    "environmentalCause": "Warm humid weather (24\u00b0C\u201330\u00b0C) with persistent fog, dew, and zero-tillage corn residue on soil.",
    "homemadeRemedies": [
      {
        "name": "Fermented Cow Urine & Turmeric Antifungal Wash",
        "ingredients": "1L fresh cow urine + 50g wild turmeric powder + 10L clean water.",
        "preparation": "Ferment cow urine for 3 days, stir in turmeric powder, filter and spray.",
        "benefits": "Curcumin and urea synergistically inhibit Cercospora fungal hyphae expansion."
      },
      {
        "name": "Sour Buttermilk & Wood Ash Spray",
        "ingredients": "2L sour chaas + 200g wood ash extract + 20L water.",
        "preparation": "Filter and spray on lower leaves.",
        "benefits": "Potassium-rich ash strengthens silica deposition in corn leaf epidermal cells."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top)",
        "type": "Dual-Action Strobilurin & Triazole Fungicide",
        "brands": "Syngenta Amistar Top / Godrej",
        "targetRole": "Provides both preventive spore inhibition and curative translaminar protection."
      },
      {
        "name": "Propiconazole 25% EC (Tilt)",
        "type": "Systemic Curative Fungicide",
        "brands": "Syngenta Tilt / Dhanuka",
        "targetRole": "Arrests rectangular leaf lesions and prevents stalk rot."
      }
    ],
    "dosageSchedule": {
      "frequency": "Apply at first sign of lower leaf lesions; repeat once in 10 to 14 days if wet weather continues.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "1.0 ml Amistar Top per 1 Liter of water (200ml per 200L water per acre).",
      "precautions": "Ensure spray reaches lower and mid-canopy leaves where infection originates."
    },
    "voiceText": "Cercospora Gray Leaf Spot detected on Corn foliage. Spray Azoxystrobin plus Difenoconazole at 1ml per liter once every 10 days strictly in early morning."
  },
  {
    "id": "corn-common-rust",
    "modelIndex": 9,
    "cropKey": "Corn / Maize",
    "cropName": "Corn / Maize",
    "scientificName": "Zea mays",
    "status": "affected",
    "diseaseName": "Common Rust",
    "pathogen": "Fungal (Puccinia sorghi)",
    "severity": "Moderate (44% Leaf Blade Covered)",
    "healthScore": 56,
    "badgeColor": "amber",
    "imageType": "corn-common-rust",
    "symptoms": "Golden-brown to cinnamon-brown powdery pustules scattered across both upper and lower leaf surfaces. Pustules rupture the epidermis releasing clouds of rust urediniospores.",
    "environmentalCause": "Moderate temperatures (16\u00b0C\u201325\u00b0C) accompanied by high relative humidity (>85%) and frequent rainfall.",
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Fermented Cow Urine Spray",
        "ingredients": "5L 4-day fermented buttermilk + 2L cow urine + 100L water per acre.",
        "preparation": "Mix thoroughly, filter, and spray on both sides of corn leaves.",
        "benefits": "Lactic acid halts rust pustule sporulation naturally at zero chemical cost."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Mancozeb 75% WP (Indofil M-45)",
        "type": "Broad-Spectrum Contact Protectant",
        "brands": "Indofil M-45 / UPL",
        "targetRole": "Destroys germinating urediniospores on contact."
      },
      {
        "name": "Tebuconazole 25.9% EC (Folicur)",
        "type": "Systemic Triazole Eradicant",
        "brands": "Bayer Folicur / Rallis",
        "targetRole": "Halts active rust pustules within 48 hours."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days until leaf pustules dry out.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.5 grams Mancozeb or 1.0 ml Tebuconazole per 1 Liter of clean water (500g per 200L per acre).",
      "precautions": "Do not delay application past tasseling stage to avoid yield loss."
    },
    "voiceText": "Common Rust detected on Corn crop. Spray Indofil M-45 at 2.5 grams per liter or Tebuconazole at 1ml per liter strictly once per day in early morning."
  },
  {
    "id": "corn-northern-leaf-blight",
    "modelIndex": 10,
    "cropKey": "Corn / Maize",
    "cropName": "Corn / Maize",
    "scientificName": "Zea mays",
    "status": "affected",
    "diseaseName": "Northern Corn Leaf Blight (NCLB)",
    "pathogen": "Fungal (Exserohilum turcicum)",
    "severity": "High (52% Canopy Damage)",
    "healthScore": 48,
    "badgeColor": "red",
    "imageType": "corn-northern-leaf-blight",
    "symptoms": "Long, elliptical, cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long) on leaves. Under humid conditions, dark olive-gray fungal spores develop inside lesions.",
    "environmentalCause": "Moderate temperatures (18\u00b0C\u201327\u00b0C) accompanied by heavy dews and extended leaf wetness.",
    "homemadeRemedies": [
      {
        "name": "Neem Seed Kernel Extract (NSKE 5%) & Turmeric Tonic",
        "ingredients": "500g crushed neem seeds + 50g wild turmeric powder + 10L clean water.",
        "preparation": "Soak overnight, filter through fine cloth, spray thoroughly across whorls.",
        "benefits": "Azadirachtin and curcumin arrest Exserohilum fungal spore germination."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Pyraclostrobin 133 g/L + Epoxiconazole 50 g/L (Opera)",
        "type": "Broad-Spectrum Blight Specialist",
        "brands": "BASF Opera / Syngenta",
        "targetRole": "Inhibits mitochondrial respiration of blight fungus and boosts green leaf retention."
      },
      {
        "name": "Mancozeb 75% WP",
        "type": "Protective Contact Fungicide",
        "brands": "Indofil M-45 / Tata",
        "targetRole": "Forms protective surface barrier preventing new cigar-shaped lesions."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 10 to 12 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "1.5 ml Opera or 2.5g Mancozeb per 1 Liter of water.",
      "precautions": "Ensure deep coverage into corn leaf axils and ear leaves."
    },
    "voiceText": "Northern Corn Leaf Blight detected. Spray Mancozeb at 2.5 grams per liter or Pyraclostrobin once every 10 days in early morning."
  },
  {
    "id": "corn-healthy",
    "modelIndex": 11,
    "cropKey": "Corn / Maize",
    "cropName": "Corn / Maize",
    "scientificName": "Zea mays",
    "status": "healthy",
    "condition": "Healthy Corn / Maize \u2014 Vigorous Vegetative State",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "corn-healthy",
    "overview": "Sturdy dark green erect maize leaves with broad photosynthetic blades, optimal turgidity, and zero blighting or rust pustules.",
    "healthyMaintenance": {
      "irrigation": "Maintain soil moisture at 65\u201375% field capacity, especially during silking and cob filling stages.",
      "preventiveBioSpray": "Spray prophylactic 5% Panchagavya or 5ml/L Neem oil every 15 days.",
      "nutrientPlan": "Side-dress Urea (40 kg/acre) + MOP (20 kg/acre) at knee-high and tasseling stages.",
      "soilCare": "Inter-cultivate or mulch between rows to prevent moisture loss and suppress weeds."
    },
    "homemadeRemedies": [
      {
        "name": "Panchagavya Foliar Growth Booster",
        "ingredients": "300ml Panchagavya in 10L water.",
        "preparation": "Spray in early morning every 15 days.",
        "benefits": "Enhances photosynthetic chlorophyll rate and accelerates cob development."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Zinc Sulfate 21% / Chelated Zinc 12% EDTA",
        "type": "Maize Micronutrient Essential",
        "brands": "Multiplex Zinc / IFFCO",
        "targetRole": "Prevents white bud deficiency and accelerates cob silk synchronization."
      }
    ],
    "dosageSchedule": {
      "frequency": "Foliar zinc at knee-high stage; balanced irrigation throughout.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "1.5 grams Chelated Zinc per 1 Liter of water.",
      "precautions": "Ensure adequate soil moisture before applying nitrogen top-dressing."
    },
    "voiceText": "Corn crop is completely healthy with a 99% vigor score! Keep soil moist during tasseling and apply balanced zinc and nitrogen."
  },
  {
    "id": "grape-black-rot",
    "modelIndex": 12,
    "cropKey": "Grape",
    "cropName": "Grape",
    "scientificName": "Vitis vinifera",
    "status": "affected",
    "diseaseName": "Black Rot",
    "pathogen": "Fungal (Guignardia bidwellii)",
    "severity": "Moderate (45% Foliage & Clusters Affected)",
    "healthScore": 55,
    "badgeColor": "amber",
    "imageType": "grape-black-rot",
    "symptoms": "Small, circular reddish-brown necrotic spots on leaves with tiny black fruiting bodies (pycnidia) arranged in a distinct ring near the lesion border. Berries shrivel into hard black mummies.",
    "environmentalCause": "Warm, wet weather (21\u00b0C\u201327\u00b0C) with persistent leaf wetness (>7 hours).",
    "homemadeRemedies": [
      {
        "name": "Bordeaux Mixture (1%) Traditional Vineyard Spray",
        "ingredients": "100g Copper Sulfate + 100g Slaked Lime in 10 Liters clean water.",
        "preparation": "Dissolve separately in plastic buckets, pour copper solution into lime solution while stirring.",
        "benefits": "Classic organic copper barrier that eliminates black rot spores safely."
      },
      {
        "name": "Baking Soda & Vegetable Oil Wash",
        "ingredients": "10g Baking Soda + 5ml oil + 1L water.",
        "preparation": "Spray on vine leaves every 8 days.",
        "benefits": "Alters foliar pH and inhibits pycnidial spore release."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Mancozeb 75% WP (Indofil M-45)",
        "type": "Protective Contact Fungicide",
        "brands": "Indofil M-45 / UPL",
        "targetRole": "Prevents spore attachment on leaves and developing grape berries."
      },
      {
        "name": "Myclobutanil 10% WP (Systhane)",
        "type": "Systemic Curative Specialist",
        "brands": "Dow Systhane / Indofil",
        "targetRole": "Stops incubating Guignardia fungus within 72 hours of infection."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days from bud break through fruit set.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.5 grams Mancozeb or 0.8g Systhane per 1 Liter of water.",
      "precautions": "Prune grape canopy to improve sun and wind drying. Remove mummified berries from trellises."
    },
    "voiceText": "Grape Black Rot detected. Apply Bordeaux mixture 1% or Mancozeb 75% WP at 2.5 grams per liter strictly once per day in early morning."
  },
  {
    "id": "grape-esca",
    "modelIndex": 13,
    "cropKey": "Grape",
    "cropName": "Grape",
    "scientificName": "Vitis vinifera",
    "status": "affected",
    "diseaseName": "Esca (Black Measles)",
    "pathogen": "Fungal Trunk Complex (Phaeomoniella chlamydospora & Fomitiporia)",
    "severity": "High (58% Vascular Decline)",
    "healthScore": 42,
    "badgeColor": "red",
    "imageType": "grape-esca",
    "symptoms": "Tiger-stripe leaf chlorosis and interveinal necrosis with yellow/red halos. Berries develop small, dark purple sunken spots resembling measles.",
    "environmentalCause": "Warm summer temperatures following fungal penetration through winter pruning wounds.",
    "homemadeRemedies": [
      {
        "name": "Bio-Trichoderma Pruning Seal Paste",
        "ingredients": "Trichoderma viride powder mixed with aloe vera gel and cow dung paste.",
        "preparation": "Apply directly on all pruning cut surfaces.",
        "benefits": "Colonizes wound tissue and physically blocks wood-decay fungal hyphae."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Copper Hydroxide 53.8% DF (Kocide 2000)",
        "type": "Protective Copper Bactericide/Fungicide",
        "brands": "DuPont Kocide / Certis",
        "targetRole": "Sterilizes pruning wounds and surface vine bark."
      },
      {
        "name": "Fosetyl-Al 80% WP (Aliette)",
        "type": "Systemic Phloem-Mobile Elicitor",
        "brands": "Bayer Aliette / Rallis",
        "targetRole": "Stimulates natural vine phytoalexin immune response."
      }
    ],
    "dosageSchedule": {
      "frequency": "Pruning wound paint immediately after trimming; foliar Aliette twice per season.",
      "timing": "Early morning.",
      "sprayTimesPerDay": "Strictly 1 application per day.",
      "waterRatio": "2.5 grams Aliette per 1 Liter of water.",
      "precautions": "Disinfect pruning shears in 70% alcohol between vines to avoid transferring trunk fungus."
    },
    "voiceText": "Esca Black Measles detected in Grape vines. Disinfect pruning shears and apply Copper Hydroxide paste on vine cuts immediately."
  },
  {
    "id": "grape-leaf-blight",
    "modelIndex": 14,
    "cropKey": "Grape",
    "cropName": "Grape",
    "scientificName": "Vitis vinifera",
    "status": "affected",
    "diseaseName": "Leaf Blight (Isariopsis Leaf Spot)",
    "pathogen": "Fungal (Pseudocercospora vitis / Isariopsis clavispora)",
    "severity": "Moderate (42% Foliar Blighting)",
    "healthScore": 58,
    "badgeColor": "amber",
    "imageType": "grape-leaf-blight",
    "symptoms": "Irregular large dark brown to reddish-brown blighted patches on mature leaves with dark velvety fungal sporulation on the underside.",
    "environmentalCause": "Warm, humid post-monsoon weather (25\u00b0C\u201332\u00b0C) with dense unventilated vine canopies.",
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Hing Antifungal Spray",
        "ingredients": "5L 4-day fermented buttermilk + 50g hing + 100L water per acre.",
        "preparation": "Filter and spray on canopy.",
        "benefits": "Halts Pseudocercospora spore production organically."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Carbendazim 12% + Mancozeb 63% WP (Saaf)",
        "type": "Dual Systemic & Contact Fungicide",
        "brands": "UPL Saaf / Dhanuka Sixer",
        "targetRole": "Provides both leaf penetration and broad-spectrum surface protection."
      },
      {
        "name": "Kresoxim-methyl 44.3% SC (Ergon)",
        "type": "Strobilurin Specialist",
        "brands": "Rallis Ergon / BASF",
        "targetRole": "Inhibits fungal spore respiration on grape foliage."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 8 to 10 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.0 grams Saaf per 1 Liter of water (400g per 200L water per acre).",
      "precautions": "Thin excess leaf canopy to allow light penetration into fruiting zone."
    },
    "voiceText": "Grape Leaf Blight detected. Spray Carbendazim plus Mancozeb (Saaf) at 2 grams per liter strictly once per day in early morning."
  },
  {
    "id": "grape-healthy",
    "modelIndex": 15,
    "cropKey": "Grape",
    "cropName": "Grape",
    "scientificName": "Vitis vinifera",
    "status": "healthy",
    "condition": "Healthy Grapevine Foliage \u2014 Superior Vigor",
    "healthScore": 98,
    "badgeColor": "emerald",
    "imageType": "grape-healthy",
    "overview": "Flourishing palmate vine leaves with rich chlorophyll hue, intact cuticular integrity, and zero black rot or downy mildew lesions.",
    "healthyMaintenance": {
      "irrigation": "Regulated deficit drip irrigation (RDI) to control vigor and improve berry berry quality.",
      "preventiveBioSpray": "Spray prophylactic Neem oil (5ml/L) or Trichoderma viride (4g/L) every 14 days.",
      "nutrientPlan": "Foliar application of Potassium Nitrate (13-0-45) at 4g/L + Boron (1g/L) during berry softening (veraison).",
      "soilCare": "Maintain cover crops (cowpea/sunn hemp) in row middles to boost soil organic carbon."
    },
    "homemadeRemedies": [
      {
        "name": "Fermented Panchagavya & Seaweed Tonic",
        "ingredients": "300ml Panchagavya + 20ml liquid seaweed in 10L water.",
        "preparation": "Spray early morning.",
        "benefits": "Stimulates natural grapevine defense enzymes and berry sizing."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "0:52:34 (Monopotassium Phosphate)",
        "type": "Cane Maturation & Fruit Quality",
        "brands": "IFFCO / Mahadhan",
        "targetRole": "Accelerates cane maturity and enhances brix sugar percentage."
      }
    ],
    "dosageSchedule": {
      "frequency": "Apply once every 12 to 14 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "4 grams per 1 Liter of water.",
      "precautions": "Avoid foliar nitrogen sprays late in the season to prevent excessive vegetative vigor."
    },
    "voiceText": "Grape foliage is completely healthy with 98% health score! Continue drip irrigation and apply preventive neem spray once every 14 days."
  },
  {
    "id": "orange-greening",
    "modelIndex": 16,
    "cropKey": "Orange / Citrus",
    "cropName": "Orange (Citrus)",
    "scientificName": "Citrus sinensis",
    "status": "affected",
    "diseaseName": "Citrus Greening (Huanglongbing - HLB)",
    "pathogen": "Bacterial (Candidatus Liberibacter asiaticus) vectored by Asian Citrus Psyllid",
    "severity": "Critical (68% Phloem Blockage)",
    "healthScore": 32,
    "badgeColor": "red",
    "imageType": "orange-greening",
    "symptoms": "Asymmetrical blotchy foliar mottle crossing leaf veins, yellow shoots (yellow dragon), small lopsided bitter fruits that remain green at bottom.",
    "environmentalCause": "Warm subtropical weather allowing high populations of the vector Asian Citrus Psyllid (Diaphorina citri).",
    "homemadeRemedies": [
      {
        "name": "Neem Oil & Soap Psyllid Vector Repellent",
        "ingredients": "10ml cold-pressed neem oil + 3ml liquid soap in 1L water.",
        "preparation": "Spray on fresh vegetative flushes where psyllids feed and lay eggs.",
        "benefits": "Repels psyllid insect vectors and disrupts their reproductive cycle organically."
      },
      {
        "name": "Cow Urine & Turmeric Phloem Tonic",
        "ingredients": "1L cow urine + 50g wild turmeric powder in 10L water.",
        "preparation": "Drench root basin once a month.",
        "benefits": "Provides micronutrients and stimulates plant immune defenses."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Streptocycline (90% Streptomycin + 10% Tetracycline)",
        "type": "Systemic Bactericide",
        "brands": "Hindustan Antibiotics Streptocycline",
        "targetRole": "Reduces phloem bacterial titer in infected trees."
      },
      {
        "name": "Imidacloprid 17.8% SL (Confidor)",
        "type": "Systemic Neonicotinoid Insecticide",
        "brands": "Bayer Confidor / Tata",
        "targetRole": "Controls psyllid vectors responsible for spreading Liberibacter bacterium."
      },
      {
        "name": "Chelated Zinc (12% EDTA) + Iron (Fe-EDDHA)",
        "type": "Foliar Nutritional Therapy",
        "brands": "Multiplex Kranti / Agromin",
        "targetRole": "Alleviates severe phloem micronutrient deficiency caused by greening."
      }
    ],
    "dosageSchedule": {
      "frequency": "Psyllid control spray at flush emergence; foliar micronutrients every 15 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "0.5ml Confidor + 1g Streptocycline per 10 Liters of water.",
      "precautions": "Severely infected dying trees should be uprooted to protect neighboring trees from psyllid vector transmission."
    },
    "voiceText": "Citrus Greening Huanglongbing detected. Control psyllid vectors with Imidacloprid and apply Streptocycline with foliar zinc and iron."
  },
  {
    "id": "peach-bacterial-spot",
    "modelIndex": 17,
    "cropKey": "Peach",
    "cropName": "Peach",
    "scientificName": "Prunus persica",
    "status": "affected",
    "diseaseName": "Bacterial Spot",
    "pathogen": "Bacterial (Xanthomonas campestris pv. pruni)",
    "severity": "Moderate (42% Leaf Tissue Affected)",
    "healthScore": 58,
    "badgeColor": "amber",
    "imageType": "peach-bacterial-spot",
    "symptoms": "Angular water-soaked purple-black lesions on leaves that drop out, giving a 'shot-hole' appearance. Pitted, gum-oozing lesions on developing fruits.",
    "environmentalCause": "Warm, windy, wet spring conditions with sandy soils and abrasive wind-blown sand.",
    "homemadeRemedies": [
      {
        "name": "Bordeaux Mixture (0.5%) Protective Wash",
        "ingredients": "50g Copper Sulfate + 50g Lime in 10L clean water.",
        "preparation": "Spray on canopy after heavy rains.",
        "benefits": "Broad-spectrum copper bactericidal shield."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Copper Oxychloride 50% WP (Blitox 50)",
        "type": "Protective Bactericide",
        "brands": "Tata Blitox / Rallis",
        "targetRole": "Sterilizes leaf surfaces against Xanthomonas bacteria."
      },
      {
        "name": "Streptocycline (Streptomycin sulfate)",
        "type": "Systemic Bactericide",
        "brands": "Hindustan Antibiotics",
        "targetRole": "Eliminates bacterial colonies inside foliar stomata."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days during shuck-split through cover sprays.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.0 grams Blitox + 0.1g Streptocycline per 1 Liter of water.",
      "precautions": "Do not apply excessive copper in high heat (>30\u00b0C) to avoid phytotoxicity."
    },
    "voiceText": "Bacterial Spot detected on Peach foliage. Spray Copper Oxychloride at 2 grams per liter plus Streptocycline once a week in early morning."
  },
  {
    "id": "peach-healthy",
    "modelIndex": 18,
    "cropKey": "Peach",
    "cropName": "Peach",
    "scientificName": "Prunus persica",
    "status": "healthy",
    "condition": "Healthy Peach Tree \u2014 Optimal Growth",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "peach-healthy",
    "overview": "Lanceolate lustrous green peach foliage with clean margins, optimal petiole health, and zero bacterial shot-holes or leaf curl.",
    "healthyMaintenance": {
      "irrigation": "Irrigate every 7\u201310 days during pit hardening and final fruit swell.",
      "preventiveBioSpray": "Spray prophylactic Neem oil (5ml/L) every 14 days.",
      "nutrientPlan": "Foliar spray of Potassium Schoenite (3g/L) + Boron (1g/L) during fruit expansion.",
      "soilCare": "Organic mulch in tree basins to preserve moisture and suppress weeds."
    },
    "homemadeRemedies": [
      {
        "name": "Fermented Cow Urine & Panchagavya Tonic",
        "ingredients": "300ml Panchagavya in 10L water.",
        "preparation": "Spray in early morning.",
        "benefits": "Promotes vibrant shoot elongation and fruit sizing."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Water-Soluble NPK 19:19:19",
        "type": "Balanced Plant Nutrition",
        "brands": "IFFCO / Mahadhan",
        "targetRole": "Sustains healthy foliage canopy and fruit buds."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 14 days.",
      "timing": "Early morning.",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "3 grams per 1 Liter of water.",
      "precautions": "Keep tree basin weed-free."
    },
    "voiceText": "Peach foliage is completely healthy! Continue balanced nutrition and preventive neem spray once every 14 days."
  },
  {
    "id": "chilli-bacterial-spot",
    "modelIndex": 19,
    "cropKey": "Chilli / Pepper",
    "cropName": "Chilli / Bell Pepper",
    "scientificName": "Capsicum annuum",
    "status": "affected",
    "diseaseName": "Bacterial Spot",
    "pathogen": "Bacterial (Xanthomonas campestris pv. vesicatoria)",
    "severity": "Moderate (42% Leaf Tissue Affected)",
    "healthScore": 58,
    "badgeColor": "amber",
    "imageType": "chilli-bacterial-spot",
    "symptoms": "Small, irregular water-soaked circular lesions turning dark brown with pale yellow halos on leaves, resulting in premature leaf defoliation and blister-like scab lesions on peppers.",
    "environmentalCause": "Warm, wet weather (24\u00b0C\u201330\u00b0C) with overhead irrigation and wind-driven rain.",
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Fermented Cow Urine Bactericidal Spray",
        "ingredients": "1L 4-day fermented buttermilk + 1L cow urine + 10L water.",
        "preparation": "Dilute thoroughly, filter, and spray on both leaf surfaces.",
        "benefits": "Lactic acid bacteria and ammonia compounds inhibit Xanthomonas colonies organically."
      },
      {
        "name": "Turmeric & Garlic Extract Spray",
        "ingredients": "50g crushed garlic + 25g turmeric powder in 1L warm water.",
        "preparation": "Steep 24 hours, filter, dilute to 5L, spray.",
        "benefits": "Natural allicin and curcumin act as organic bactericides."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Copper Oxychloride 50% WP (Blitox 50)",
        "type": "Contact Protective Bactericide",
        "brands": "Tata Blitox / Indofil",
        "targetRole": "Forms a copper protective film on leaf surfaces suppressing bacterial multiplication."
      },
      {
        "name": "Streptocycline (90% Streptomycin + 10% Tetracycline)",
        "type": "Systemic Bactericide",
        "brands": "Hindustan Antibiotics Streptocycline",
        "targetRole": "Penetrates intercellular leaf spaces to destroy Xanthomonas bacteria."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days during rainy or high-humidity spells.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day (Never spray twice on the same day).",
      "waterRatio": "2.5 grams Blitox 50 + 0.1 gram Streptocycline per 1 Liter of water (500g Blitox + 20g Streptocycline per 200L water per acre).",
      "precautions": "Avoid overhead watering; switch strictly to drip irrigation. Do not work in fields when leaves are wet."
    },
    "voiceText": "Bacterial Spot detected on Pepper foliage. Spray Copper Oxychloride 50% WP at 2.5 grams per liter with Streptocycline once every 7 days in early morning."
  },
  {
    "id": "chilli-healthy",
    "modelIndex": 20,
    "cropKey": "Chilli / Pepper",
    "cropName": "Chilli / Bell Pepper",
    "scientificName": "Capsicum annuum",
    "status": "healthy",
    "condition": "Healthy Pepper / Chilli Crop \u2014 Optimal Health",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "chilli-healthy",
    "overview": "Deep glossy green foliage with uniform lamina, robust flowering nodes, active vegetative flush, and zero curling or bacterial spots.",
    "healthyMaintenance": {
      "irrigation": "Drip irrigation at 60\u201370% field capacity; maintain uniform moisture to prevent blossom end rot.",
      "preventiveBioSpray": "Foliar spray of cold-pressed Neem oil (5ml/L) or Panchagavya once every 14 days.",
      "nutrientPlan": "Balanced NPK 19:19:19 (3g/L) + Calcium Nitrate (2g/L) during active fruit setting.",
      "soilCare": "Silver-black plastic mulch or organic straw mulch to conserve moisture and suppress thrips."
    },
    "homemadeRemedies": [
      {
        "name": "Fermented Panchagavya & NSKE Prophylactic Tonic",
        "ingredients": "300ml Panchagavya + 50ml Neem Seed Kernel Extract (NSKE) in 10L clean water.",
        "preparation": "Spray early morning on both sides of foliage every 15 days.",
        "benefits": "Suppresses sucking pests naturally and enhances fruit pungency and gloss."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Water-Soluble 13:00:45 (Potassium Nitrate)",
        "type": "Fruit Quality Booster",
        "brands": "IFFCO / Mahadhan",
        "targetRole": "Increases pepper wall thickness, capsicum fruit size, and green color."
      }
    ],
    "dosageSchedule": {
      "frequency": "Nutrient spray every 10 to 12 days; preventive bio-spray every 14 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "3.0 grams per 1 Liter of water.",
      "precautions": "Keep soil uniformly moist; avoid moisture stress during flowering."
    },
    "voiceText": "Chilli Pepper crop is completely healthy with 99% vigor score! Continue optimal drip irrigation and apply preventive neem spray once every 14 days."
  },
  {
    "id": "potato-early-blight",
    "modelIndex": 21,
    "cropKey": "Potato",
    "cropName": "Potato",
    "scientificName": "Solanum tuberosum",
    "status": "affected",
    "diseaseName": "Early Blight",
    "pathogen": "Fungal (Alternaria solani)",
    "severity": "Moderate (42% Leaf Area Affected)",
    "healthScore": 58,
    "badgeColor": "amber",
    "imageType": "potato-early-blight",
    "symptoms": "Circular to irregular dark brown-black spots with concentric rings (target-board pattern) on older lower leaves, surrounded by a narrow chlorotic yellow halo.",
    "environmentalCause": "Warm temperatures (24\u00b0C\u201329\u00b0C) with alternating wet and dry periods, stressed plants, and low nitrogen.",
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Asafoetida (Hing) Spray",
        "ingredients": "5 Liters 4-day fermented buttermilk + 50g hing powder + 100 Liters clean water.",
        "preparation": "Dissolve hing in warm water, mix into buttermilk, dilute to 100L for 1 acre.",
        "benefits": "Lactic acid and sulfurous compounds inhibit Alternaria conidial germination within 48 hours."
      },
      {
        "name": "Baking Soda & Vegetable Oil Fungicidal Emulsion",
        "ingredients": "10g Baking Soda + 5ml Vegetable Oil + 2ml liquid soap in 1L water.",
        "preparation": "Emulsify and spray on lower leaves.",
        "benefits": "Creates an alkaline leaf film that desiccates fungal spores."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Mancozeb 75% WP (Indofil M-45)",
        "type": "Protective Contact Fungicide",
        "brands": "Indofil M-45 / UPL",
        "targetRole": "Broad-spectrum multi-site protective shield preventing spore attachment."
      },
      {
        "name": "Difenoconazole 25% EC (Score)",
        "type": "Systemic Curative Fungicide",
        "brands": "Syngenta Score / Tata",
        "targetRole": "Penetrates leaf tissue within 2 hours to cure established Alternaria lesions."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days starting at tuber initiation stage.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day (Never spray twice on the same day).",
      "waterRatio": "2.5 grams Mancozeb or 0.5ml Score per 1 Liter of clean water (500g per 200L water per acre).",
      "precautions": "Avoid sprinkler irrigation in the late afternoon. Hill up soil well to protect tubers."
    },
    "voiceText": "Potato Early Blight detected. Spray Mancozeb 75% WP at 2.5 grams per liter or Difenoconazole once every 8 days in early morning."
  },
  {
    "id": "potato-late-blight",
    "modelIndex": 22,
    "cropKey": "Potato",
    "cropName": "Potato",
    "scientificName": "Solanum tuberosum",
    "status": "affected",
    "diseaseName": "Late Blight",
    "pathogen": "Oomycete Pathogen (Phytophthora infestans)",
    "severity": "Critical (65% Rapid Canopy Destruction)",
    "healthScore": 35,
    "badgeColor": "red",
    "imageType": "potato-late-blight",
    "symptoms": "Water-soaked irregular blackish-brown lesions spreading rapidly from leaf margins and tips. Under humid conditions, a delicate white cottony mold appears on the underside of leaves.",
    "environmentalCause": "Cool, damp, overcast weather (12\u00b0C\u201320\u00b0C) with relative humidity >90% and continuous rain or heavy dews.",
    "homemadeRemedies": [
      {
        "name": "Wood Ash & Slaked Lime Foliar Dusting",
        "ingredients": "Fresh sifted wood ash (70%) + powdered slaked lime (30%).",
        "preparation": "Dust over damp morning foliage evenly.",
        "benefits": "Dehydrates Phytophthora sporangia and alters surface moisture pH."
      },
      {
        "name": "Fermented Cow Urine & Turmeric Tonic",
        "ingredients": "1L cow urine + 50g wild turmeric powder in 10L clean water.",
        "preparation": "Spray immediately across canopy.",
        "benefits": "Suppresses zoospore motility through natural biopesticidal alkaloids."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold)",
        "type": "Systemic & Contact Oomycete Specialist",
        "brands": "Syngenta Ridomil Gold / Krishi Rasayan",
        "targetRole": "Penetrates rapidly to halt internal mycelial expansion while shielding foliage."
      },
      {
        "name": "Cymoxanil 8% + Mancozeb 64% WP (Curzate)",
        "type": "Kickback Curative Fungicide",
        "brands": "DuPont Curzate / Dhanuka",
        "targetRole": "Provides up to 48 hours curative kickback action against incubating late blight."
      }
    ],
    "dosageSchedule": {
      "frequency": "Immediately upon detection; repeat once every 5 to 7 days during foggy/rainy weather.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.5 grams Ridomil Gold per 1 Liter of clean water (500g per 200L water per acre).",
      "precautions": "Inspect field daily. Destroy severely collapsed plants. Ensure high earthing-up to prevent tuber rot."
    },
    "voiceText": "Critical Late Blight detected on Potato crop! Spray Ridomil Gold immediately at 2.5 grams per liter strictly once per day in early morning."
  },
  {
    "id": "potato-healthy",
    "modelIndex": 23,
    "cropKey": "Potato",
    "cropName": "Potato",
    "scientificName": "Solanum tuberosum",
    "status": "healthy",
    "condition": "Healthy Potato Crop \u2014 Optimal Canopy Vigor",
    "healthScore": 98,
    "badgeColor": "emerald",
    "imageType": "potato-healthy",
    "overview": "Dense, lush green pinnate foliage with sturdy stems, turgid leaflets, uniform chlorophyll distribution, and zero fungal lesions or leaf roll.",
    "healthyMaintenance": {
      "irrigation": "Irrigate at 65\u201370% available soil moisture; cease irrigation 10\u201314 days prior to harvest for skin curing.",
      "preventiveBioSpray": "Prophylactic foliar spray of Trichoderma viride (4g/L) or 5ml/L Neem oil every 14 days.",
      "nutrientPlan": "Foliar application of Potassium Schoenite (3g/L) + Boron (1g/L) at 45 and 60 days to enhance tuber size.",
      "soilCare": "High earthing-up at 30 and 45 days after planting to prevent green tubers and tuber moth."
    },
    "homemadeRemedies": [
      {
        "name": "Panchagavya & NSKE Preventive Foliar Tonic",
        "ingredients": "300ml Panchagavya + 50ml Neem extract in 10L clean water.",
        "preparation": "Spray early morning once every 14 days.",
        "benefits": "Repels aphids, whiteflies, and builds natural systemic resistance against blight."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "0:0:50 (Potassium Sulfate - SOP)",
        "type": "Tuber Bulking Fertilizer",
        "brands": "IFFCO / Yara",
        "targetRole": "Maximizes tuber starch content, uniform sizing, and storage longevity."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 12 to 14 days during tuber bulking stage.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "4 grams per 1 Liter of water (800g per 200L water per acre).",
      "precautions": "Avoid excessive nitrogen late in season to prevent hollow heart."
    },
    "voiceText": "Potato crop is completely healthy with 98% health score! Continue proper earthing-up and apply preventive neem spray once every 14 days."
  },
  {
    "id": "raspberry-healthy",
    "modelIndex": 24,
    "cropKey": "Raspberry",
    "cropName": "Raspberry",
    "scientificName": "Rubus idaeus",
    "status": "healthy",
    "condition": "Healthy Raspberry Foliage \u2014 Superior Vigor",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "raspberry-healthy",
    "overview": "Vibrant compound foliage with healthy serrated margins, clean silvery-white undersides, robust cane vigor, and zero cane blight.",
    "healthyMaintenance": {
      "irrigation": "Drip irrigation at 25\u201335 mm water per week; keep cane crown dry to prevent root rot.",
      "preventiveBioSpray": "Spray prophylactic Neem oil (5ml/L) every 14 days.",
      "nutrientPlan": "Balanced NPK 19:19:19 (3g/L) during spring vegetative flush.",
      "soilCare": "Organic wood chip mulch to preserve cool, moist root zone conditions."
    },
    "homemadeRemedies": [
      {
        "name": "Fermented Cow Urine & Panchagavya Cane Tonic",
        "ingredients": "300ml Panchagavya in 10L clean water.",
        "preparation": "Spray early morning.",
        "benefits": "Enhances cane strength and flowering cluster development."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Chelated Micronutrient Complex",
        "type": "Foliar Nutrition",
        "brands": "Multiplex Kranti",
        "targetRole": "Prevents interveinal chlorosis and improves cane winter hardiness."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 14 days.",
      "timing": "Early morning.",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2 grams per 1 Liter of water.",
      "precautions": "Prune spent floricanes immediately after summer harvest."
    },
    "voiceText": "Raspberry foliage is completely healthy! Continue proper cane trellising and apply preventive neem spray once every 14 days."
  },
  {
    "id": "soybean-healthy",
    "modelIndex": 25,
    "cropKey": "Soybean",
    "cropName": "Soybean",
    "scientificName": "Glycine max",
    "status": "healthy",
    "condition": "Healthy Soybean Crop \u2014 Optimal Nodulation & Health",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "soybean-healthy",
    "overview": "Trifoliolate lush green leaves with optimal chlorophyll saturation, active nitrogen-fixing root nodulation, and zero frogeye leaf spots.",
    "healthyMaintenance": {
      "irrigation": "Irrigate at critical pod development and seed filling stages if rainfall is deficient.",
      "preventiveBioSpray": "Spray prophylactic Neem oil (5ml/L) or Panchagavya every 14 days.",
      "nutrientPlan": "Foliar spray of 19:19:19 (4g/L) + Boron (1g/L) at flower initiation stage.",
      "soilCare": "Maintain Bradyrhizobium bio-inoculant in soil to ensure high nodulation."
    },
    "homemadeRemedies": [
      {
        "name": "Fermented Buttermilk & Cow Urine Tonic",
        "ingredients": "1L sour buttermilk + 1L cow urine in 10L water.",
        "preparation": "Spray once a month.",
        "benefits": "Builds natural immunity against foliar fungal pathogens."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "0:52:34 (Monopotassium Phosphate)",
        "type": "Pod Filling Booster",
        "brands": "IFFCO / Mahadhan",
        "targetRole": "Maximizes pod seed count, oil percentage, and protein yield."
      }
    ],
    "dosageSchedule": {
      "frequency": "Every 12 to 14 days during flowering and pod development.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "3.5 grams per 1 Liter of water.",
      "precautions": "Do not spray in midday hot sun."
    },
    "voiceText": "Soybean crop is completely healthy with 99% vigor score! Keep soil moist during pod formation and apply balanced potassium."
  },
  {
    "id": "squash-powdery-mildew",
    "modelIndex": 26,
    "cropKey": "Squash",
    "cropName": "Squash / Pumpkin",
    "scientificName": "Cucurbita pepo",
    "status": "affected",
    "diseaseName": "Powdery Mildew",
    "pathogen": "Fungal (Erysiphe cichoracearum & Podosphaera xanthii)",
    "severity": "Moderate (46% Leaf Area Covered)",
    "healthScore": 54,
    "badgeColor": "amber",
    "imageType": "squash-powdery-mildew",
    "symptoms": "Prominent talcum-like white powdery fungal patches on both upper and lower leaf surfaces, petioles, and stems. Severely infected leaves turn yellow, brown, and senesce prematurely.",
    "environmentalCause": "Warm, dry days (20\u00b0C\u201328\u00b0C) accompanied by high humidity (>70%) at night and dense shade.",
    "homemadeRemedies": [
      {
        "name": "Baking Soda & Horticultural Oil Antifungal Spray",
        "ingredients": "10g Baking Soda + 5ml Vegetable Oil + 2ml liquid dish soap in 1L warm water.",
        "preparation": "Whisk thoroughly and spray on both leaf surfaces.",
        "benefits": "Alters leaf surface pH to alkaline, destroying fungal conidia and mycelium."
      },
      {
        "name": "Milk & Water Bio-Fungicidal Wash (1:9 ratio)",
        "ingredients": "100ml raw milk + 900ml water.",
        "preparation": "Spray in direct morning sunlight.",
        "benefits": "Sunlight activates milk proteins to produce antiseptic free radicals that kill powdery mildew."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Hexaconazole 5% SC (Contaf Plus)",
        "type": "Systemic Triazole Eradicant",
        "brands": "Tata Contaf / Syngenta",
        "targetRole": "Penetrates leaf cuticle to eliminate fungal hyphae within 48 hours."
      },
      {
        "name": "Wettable Sulfur 80% WDG (Sulfex)",
        "type": "Protective Contact Fungicide",
        "brands": "Sulfex / UPL",
        "targetRole": "Vapor phase contact action preventing spore germination across squash vines."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days until white powdery spots disappear.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.0 ml Contaf or 3.0g Sulfex per 1 Liter of clean water (400ml/600g per 200L water per acre).",
      "precautions": "Avoid spraying sulfur during midday temperatures above 30\u00b0C to prevent foliar scorching."
    },
    "voiceText": "Powdery Mildew detected on Squash foliage. Spray milk spray (1 to 9) or Hexaconazole 5% SC at 2ml per liter once a week in early morning."
  },
  {
    "id": "strawberry-leaf-scorch",
    "modelIndex": 27,
    "cropKey": "Strawberry",
    "cropName": "Strawberry",
    "scientificName": "Fragaria \u00d7 ananassa",
    "status": "affected",
    "diseaseName": "Leaf Scorch",
    "pathogen": "Fungal (Diplocarpon earlianum)",
    "severity": "Moderate (38% Leaf Surface Affected)",
    "healthScore": 62,
    "badgeColor": "amber",
    "imageType": "strawberry-leaf-scorch",
    "symptoms": "Numerous small, irregular dark purple to purplish-brown blotches on upper leaf surface. Unlike leaf spot, scorch lesions remain dark purple without white centers, causing leaf margins to curl and scorch brown.",
    "environmentalCause": "Warm, wet conditions with continuous leaf wetness from rain or overhead sprinklers.",
    "homemadeRemedies": [
      {
        "name": "Baking Soda & Neem Oil Foliar Spray",
        "ingredients": "5g Baking Soda + 5ml Neem Oil in 1L water.",
        "preparation": "Spray once every 8 days.",
        "benefits": "Halts fungal spore germination without affecting fruit taste."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Captan 50% WP (Captaf)",
        "type": "Broad-Spectrum Protectant",
        "brands": "Rallis Captaf / Dhanuka",
        "targetRole": "Forms a multi-site protective shield on strawberry foliage."
      },
      {
        "name": "Difenoconazole 25% EC (Score)",
        "type": "Curative Triazole Specialist",
        "brands": "Syngenta Score",
        "targetRole": "Eradicates incubating leaf scorch mycelium."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 8 to 10 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.0 grams Captan or 0.5ml Score per 1 Liter of water.",
      "precautions": "Remove and burn severely scorched dead strawberry runner leaves. Switch to drip irrigation."
    },
    "voiceText": "Strawberry Leaf Scorch detected. Spray Captan 50% WP at 2 grams per liter or Difenoconazole once every 8 days in early morning."
  },
  {
    "id": "strawberry-healthy",
    "modelIndex": 28,
    "cropKey": "Strawberry",
    "cropName": "Strawberry",
    "scientificName": "Fragaria \u00d7 ananassa",
    "status": "healthy",
    "condition": "Healthy Strawberry Crop \u2014 Excellent Foliar & Crown Vigor",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "strawberry-healthy",
    "overview": "Glossy dark green trifoliolate leaves with serrated margins, robust crown turgidity, clean fruit trusses, and zero foliar spots or powdery mildew.",
    "healthyMaintenance": {
      "irrigation": "Drip irrigation with 25\u201330 mm water per week; keep strawberry bed crowns clean and elevated.",
      "preventiveBioSpray": "Foliar spray of 5ml/L cold-pressed Neem oil or Trichoderma harzianum (4g/L) every 14 days.",
      "nutrientPlan": "Foliar spray of Calcium Nitrate (2g/L) + Boron (1g/L) during flowering for firm, fragrant berries.",
      "soilCare": "Silver-black plastic mulch to prevent fruit contact with soil and conserve moisture."
    },
    "homemadeRemedies": [
      {
        "name": "Fermented Panchagavya Fruit Enhancer",
        "ingredients": "300ml Panchagavya in 10L clean water.",
        "preparation": "Spray early morning.",
        "benefits": "Promotes fruit sweetness, anthocyanin pigment, and crown root health."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Water-Soluble 0:52:34 (Monopotassium Phosphate)",
        "type": "Flowering & Fruit Sizing Booster",
        "brands": "IFFCO / Mahadhan",
        "targetRole": "Strengthens cellular walls and increases brix sugar levels."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 10 to 12 days during fruiting.",
      "timing": "Early morning.",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "3.0 grams per 1 Liter of water.",
      "precautions": "Harvest ripe berries early morning when cool."
    },
    "voiceText": "Strawberry crop is completely healthy with 99% vigor! Continue drip irrigation and apply preventive neem spray once every 14 days."
  },
  {
    "id": "tomato-bacterial-spot",
    "modelIndex": 29,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "affected",
    "diseaseName": "Bacterial Spot",
    "pathogen": "Bacterial (Xanthomonas vesicatoria / perforans)",
    "severity": "Moderate (40% Leaf Area Affected)",
    "healthScore": 60,
    "badgeColor": "amber",
    "imageType": "tomato-bacterial-spot",
    "symptoms": "Small, dark, water-soaked circular to angular lesions (less than 3mm) on leaves, stems, and fruit. On leaves, spots develop yellow halos and dry into shot-holes.",
    "environmentalCause": "Warm temperatures (24\u00b0C\u201330\u00b0C) with frequent rainstorms, high humidity, and overhead irrigation.",
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Fermented Cow Urine Bactericidal Spray",
        "ingredients": "1L 4-day fermented chaas + 1L cow urine + 10L water.",
        "preparation": "Mix thoroughly, filter, and spray on both leaf surfaces.",
        "benefits": "Lactic acid bacteria and ammonia inhibit Xanthomonas bacterial colonies safely."
      },
      {
        "name": "Turmeric & Garlic Extract Spray",
        "ingredients": "50g crushed garlic + 25g wild turmeric powder in 1L warm water.",
        "preparation": "Steep 24 hours, filter, dilute to 5L, spray.",
        "benefits": "Natural allicin acts as a potent bio-bactericide."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Copper Oxychloride 50% WP (Blitox 50)",
        "type": "Contact Protective Bactericide",
        "brands": "Tata Blitox / Indofil",
        "targetRole": "Suppresses bacterial multiplication across foliar surfaces."
      },
      {
        "name": "Streptocycline (90% Streptomycin + 10% Tetracycline)",
        "type": "Systemic Bactericide",
        "brands": "Hindustan Antibiotics Streptocycline",
        "targetRole": "Penetrates plant tissue to destroy Xanthomonas bacteria."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days during rainy weather.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.5 grams Blitox 50 + 0.1g Streptocycline per 1 Liter of water (500g Blitox + 20g Streptocycline per 200L water per acre).",
      "precautions": "Avoid sprinkler irrigation. Do not enter field when foliage is wet to prevent spreading bacteria."
    },
    "voiceText": "Bacterial Spot detected on Tomato foliage. Spray Copper Oxychloride 50% WP at 2.5 grams per liter plus Streptocycline once a week in early morning."
  },
  {
    "id": "tomato-early-blight",
    "modelIndex": 30,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "affected",
    "diseaseName": "Early Blight",
    "pathogen": "Fungal (Alternaria solani)",
    "severity": "Moderate (42% Leaf Tissue Affected)",
    "healthScore": 58,
    "badgeColor": "amber",
    "imageType": "tomato-early-blight",
    "symptoms": "Distinct concentric circular brown-black lesions with yellow chlorotic halos, resembling a target-board pattern on older lower leaves. Causes premature defoliation and sunken stem cankers.",
    "environmentalCause": "Warm temperatures (24\u00b0C\u201329\u00b0C) combined with high relative humidity (>80%) and frequent leaf wetness from rain or overhead sprinkling.",
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Asafoetida (Hing) Antifungal Spray",
        "ingredients": "5 Liters 5-day fermented sour buttermilk (chaas) + 50g powdered asafoetida (hing) + 100 Liters water.",
        "preparation": "Dissolve hing in warm water, combine with sour buttermilk, filter through muslin cloth, dilute to 100L for 1 acre.",
        "benefits": "Lactic acid and sulfurous compounds in hing severely inhibit Alternaria spore germination within 48 hours."
      },
      {
        "name": "Baking Soda & Vegetable Oil Fungicidal Emulsion",
        "ingredients": "10g Sodium Bicarbonate (Baking Soda) + 5ml Vegetable Oil + 2ml liquid soap + 1 Liter warm water.",
        "preparation": "Whisk oil and soap into warm water, add baking soda, shake well, spray thoroughly on foliage.",
        "benefits": "Alters leaf surface pH to alkaline, dehydrating fungal mycelium and arresting target spots."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Mancozeb 75% WP (Indofil M-45)",
        "type": "Contact Protective Shield",
        "brands": "Indofil M-45 / UPL Saaf / Dhanuka",
        "targetRole": "Inactivates fungal enzymes and forms a resilient barrier preventing new spore germination."
      },
      {
        "name": "Difenoconazole 25% EC (Score / Diffen)",
        "type": "Systemic Curative Fungicide",
        "brands": "Syngenta Score / Tata Rallis",
        "targetRole": "Penetrates leaf cuticle within 2 hours to halt incubating Alternaria mycelium inside plant cells."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days until target spots dry up and new foliage emerges clean.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM) or late afternoon after 4:30 PM. Never spray in midday sun.",
      "sprayTimesPerDay": "Strictly 1 spray per day (Never spray twice on the same day).",
      "waterRatio": "2.5 grams Mancozeb or 0.5 ml Score per 1 Liter of clean water (approx. 500g per 200 Liters water per acre).",
      "precautions": "Prune infected lower leaves touching soil. Destroy diseased foliage away from the field. 7-day pre-harvest interval (PHI)."
    },
    "voiceText": "Tomato Early Blight detected with characteristic concentric target spots. Apply Indofil M-45 at 2.5 grams per liter or Difenoconazole once every 8 days in the early morning."
  },
  {
    "id": "tomato-late-blight",
    "modelIndex": 31,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "affected",
    "diseaseName": "Late Blight",
    "pathogen": "Oomycete Pathogen (Phytophthora infestans)",
    "severity": "Critical (68% Canopy Collapse Risk)",
    "healthScore": 32,
    "badgeColor": "red",
    "imageType": "tomato-late-blight",
    "symptoms": "Irregular water-soaked greasy olive-brown lesions rapidly expanding on leaf margins and tips. Under humid conditions, white fluffy cottony sporulation appears on the underside of leaves.",
    "environmentalCause": "Cool, overcast, foggy weather (12\u00b0C\u201321\u00b0C) with continuous relative humidity >90% and rain.",
    "homemadeRemedies": [
      {
        "name": "Wood Ash & Slaked Lime Dusting",
        "ingredients": "70% sifted hardwood ash + 30% slaked lime.",
        "preparation": "Dust over damp morning foliage evenly.",
        "benefits": "Dehydrates Phytophthora sporangia and arrests rapid blighting."
      },
      {
        "name": "Fermented Cow Urine & Turmeric Tonic",
        "ingredients": "1L cow urine + 50g wild turmeric powder in 10L clean water.",
        "preparation": "Spray immediately across canopy.",
        "benefits": "Natural biopesticidal alkaloids suppress zoospore motility."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold)",
        "type": "Systemic & Protective Oomycete Specialist",
        "brands": "Syngenta Ridomil Gold / Krishi Rasayan",
        "targetRole": "Systemic acropetal translocation eliminates internal Phytophthora mycelium."
      },
      {
        "name": "Dimethomorph 50% WP (Acrobat)",
        "type": "Oomycete Cell Wall Disruptor",
        "brands": "BASF Acrobat",
        "targetRole": "Destroys sporangial cell wall synthesis and arrests sporulation."
      }
    ],
    "dosageSchedule": {
      "frequency": "Immediately upon identification; repeat once every 5 to 7 days during continuous foggy or rainy periods.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.5 grams Ridomil Gold or 1.0g Acrobat per 1 Liter of clean water (500g per 200L water per acre).",
      "precautions": "Inspect crop daily. Stake and trellis vines to elevate foliage away from damp soil. Strict 7-day pre-harvest interval."
    },
    "voiceText": "Critical Late Blight detected on Tomato! Spray Ridomil Gold immediately at 2.5 grams per liter strictly once per day in early morning."
  },
  {
    "id": "tomato-leaf-mold",
    "modelIndex": 32,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "affected",
    "diseaseName": "Leaf Mold",
    "pathogen": "Fungal (Passalora fulva / Cladosporium fulvum)",
    "severity": "Moderate (40% Lower Foliage Affected)",
    "healthScore": 60,
    "badgeColor": "amber",
    "imageType": "tomato-leaf-mold",
    "symptoms": "Pale yellow chlorotic blotches on upper leaf surface, corresponding to dense olive-green to grayish-brown velvety mold growth on the lower leaf surface.",
    "environmentalCause": "High relative humidity (>85%) combined with warm greenhouse or polyhouse temperatures (22\u00b0C\u201326\u00b0C) and poor ventilation.",
    "homemadeRemedies": [
      {
        "name": "Baking Soda & Vegetable Oil Spray",
        "ingredients": "10g Baking Soda + 5ml oil + 1L water.",
        "preparation": "Spray under sides of leaves.",
        "benefits": "Alkalinizes leaf surface and dries out mold spores."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Copper Hydroxide 53.8% DF (Kocide 2000)",
        "type": "Protective Copper Fungicide",
        "brands": "DuPont Kocide / Certis",
        "targetRole": "Covers leaf underside with dense bactericidal/fungicidal copper ions."
      },
      {
        "name": "Difenoconazole 25% EC (Score)",
        "type": "Systemic Curative Fungicide",
        "brands": "Syngenta Score",
        "targetRole": "Halts Passalora fungal growth within leaf tissue."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days.",
      "timing": "Early morning.",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.0 grams Kocide or 0.5ml Score per 1 Liter of water.",
      "precautions": "Increase greenhouse ventilation; prune dense lower leaves to promote cross-airflow."
    },
    "voiceText": "Tomato Leaf Mold detected. Increase greenhouse air circulation and spray Copper Hydroxide or Difenoconazole at 2 grams per liter in early morning."
  },
  {
    "id": "tomato-septoria-leaf-spot",
    "modelIndex": 33,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "affected",
    "diseaseName": "Septoria Leaf Spot",
    "pathogen": "Fungal (Septoria lycopersici)",
    "severity": "Moderate (44% Leaf Area Affected)",
    "healthScore": 56,
    "badgeColor": "amber",
    "imageType": "tomato-septoria-leaf-spot",
    "symptoms": "Numerous small circular spots (2 to 3mm) with dark brown margins and sunken grayish-white centers containing tiny black specks (pycnidia). Starts on oldest bottom leaves.",
    "environmentalCause": "Warm, wet weather (20\u00b0C\u201325\u00b0C) with persistent leaf wetness from rain or overhead watering.",
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Hing Spray",
        "ingredients": "5L 4-day fermented buttermilk + 50g hing + 100L water per acre.",
        "preparation": "Filter and spray on lower canopy.",
        "benefits": "Suppresses Septoria pycnidiospore germination organically."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Chlorothalonil 75% WP (Kavach)",
        "type": "Broad-Spectrum Contact Protectant",
        "brands": "Syngenta Kavach / Tata",
        "targetRole": "Binds tightly to leaf cuticle, preventing spore entry even during heavy rain."
      },
      {
        "name": "Mancozeb 75% WP (Indofil M-45)",
        "type": "Multi-Site Protective Shield",
        "brands": "Indofil M-45 / UPL",
        "targetRole": "Protective barrier against recurring spore splashes."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.5 grams Kavach or Indofil M-45 per 1 Liter of clean water (500g per 200L water per acre).",
      "precautions": "Mulch soil around plants to prevent soil-splash of fungal spores onto lower leaves."
    },
    "voiceText": "Septoria Leaf Spot detected on Tomato. Prune bottom leaves and spray Chlorothalonil or Mancozeb at 2.5 grams per liter strictly once per day."
  },
  {
    "id": "tomato-spider-mites",
    "modelIndex": 34,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "affected",
    "diseaseName": "Two-Spotted Spider Mites",
    "pathogen": "Acarine Pest (Tetranychus urticae)",
    "severity": "Moderate (46% Leaf Area Stippled)",
    "healthScore": 54,
    "badgeColor": "amber",
    "imageType": "tomato-spider-mites",
    "symptoms": "Fine yellow or white stippling (speckling) across the upper leaf surface, accompanied by fine silky webbing on leaf undersides and terminal shoots. Leaves turn bronze and dry out.",
    "environmentalCause": "Hot, dry, dusty conditions (temperatures >30\u00b0C and low relative humidity <45%).",
    "homemadeRemedies": [
      {
        "name": "Neem Oil & Horticultural Soap Spray",
        "ingredients": "5ml pure cold-pressed neem oil + 2ml liquid soap + 1L water.",
        "preparation": "Emulsify vigorously; spray undersides of leaves thoroughly.",
        "benefits": "Suffocates spider mites and disrupts their reproductive hormones organically."
      },
      {
        "name": "High-Pressure Water Foliar Wash",
        "ingredients": "Clean water spray under leaf canopy in early morning.",
        "preparation": "Dislodges mite colonies and raises local micro-humidity.",
        "benefits": "Severely slows down spider mite population expansion."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Spiromesifen 22.9% SC (Oberon)",
        "type": "Lipid Biosynthesis Inhibitor Miticide",
        "brands": "Bayer Oberon / Tata",
        "targetRole": "Sterilizes adult female mites and eliminates mite nymphs and eggs."
      },
      {
        "name": "Propargite 57% EC (Omite)",
        "type": "Contact Acaricide",
        "brands": "Dhanuka Omite / UPL",
        "targetRole": "Rapid knockdown action against adult spider mite colonies."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 days; repeat in 5 days if mite pressure remains severe.",
      "timing": "Early morning or late evening.",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "1.0 ml Oberon or 2.0 ml Omite per 1 Liter of clean water (200ml/400ml per 200L water per acre).",
      "precautions": "Spray leaf undersides thoroughly where mites congregate. Do not use broad-spectrum pyrethroids which kill beneficial predatory mites."
    },
    "voiceText": "Spider Mite infestation detected on Tomato. Spray Neem oil or Spiromesifen at 1ml per liter on leaf undersides strictly once per day in early morning."
  },
  {
    "id": "tomato-target-spot",
    "modelIndex": 35,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "affected",
    "diseaseName": "Target Spot",
    "pathogen": "Fungal (Corynespora cassiicola)",
    "severity": "Moderate (40% Foliar Infection)",
    "healthScore": 60,
    "badgeColor": "amber",
    "imageType": "tomato-target-spot",
    "symptoms": "Brown circular lesions with faint concentric rings and light brown centers on leaves, stems, and fruits. Lesions expand rapidly, causing heavy defoliation.",
    "environmentalCause": "Warm, humid tropical conditions (24\u00b0C\u201332\u00b0C) with frequent rains and long canopy wetness.",
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Hing Antifungal Spray",
        "ingredients": "5L sour buttermilk + 50g hing + 100L clean water.",
        "preparation": "Filter and spray across tomato canopy.",
        "benefits": "Lactic acid inhibits Corynespora fungal hyphae growth."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top)",
        "type": "Broad-Spectrum Systemic Fungicide",
        "brands": "Syngenta Amistar Top",
        "targetRole": "Dual-mode action prevents spore germination and cures established lesions."
      },
      {
        "name": "Mancozeb 75% WP (Indofil M-45)",
        "type": "Protective Contact Fungicide",
        "brands": "Indofil M-45",
        "targetRole": "Protective surface barrier against spore penetration."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 8 to 10 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "1.0 ml Amistar Top or 2.5g Mancozeb per 1 Liter of water.",
      "precautions": "Ensure good plant spacing and stake tomatoes to improve airflow."
    },
    "voiceText": "Target Spot detected on Tomato. Spray Amistar Top at 1ml per liter or Mancozeb at 2.5 grams per liter in early morning."
  },
  {
    "id": "tomato-yellow-leaf-curl",
    "modelIndex": 36,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "affected",
    "diseaseName": "Tomato Yellow Leaf Curl Virus (TYLCV)",
    "pathogen": "Viral (Begomovirus) transmitted by Whiteflies (Bemisia tabaci)",
    "severity": "Critical (62% Stunting & Yield Halt)",
    "healthScore": 38,
    "badgeColor": "red",
    "imageType": "tomato-yellow-leaf-curl",
    "symptoms": "Severe upward rolling and cupping of leaflet margins, pronounced interveinal chlorosis (yellowing), extreme plant stunting with shortened internodes, and blossom drop leading to near total fruit loss.",
    "environmentalCause": "Warm, dry weather fostering massive populations of the whitefly vector (Bemisia tabaci).",
    "homemadeRemedies": [
      {
        "name": "Yellow Sticky Traps & Castor Oil Vector Trap",
        "ingredients": "Bright yellow plastic sheets coated with castor oil or grease.",
        "preparation": "Erect 15\u201320 traps per acre at crop canopy height.",
        "benefits": "Physically captures hundreds of viruliferous whiteflies daily without chemicals."
      },
      {
        "name": "Neem Seed Kernel Extract (NSKE 5%) & Soap Spray",
        "ingredients": "500g crushed neem seeds soaked in 10L water + 20g soap.",
        "preparation": "Filter and spray on leaf undersides every 5 days.",
        "benefits": "Repels whiteflies and disrupts their nymphal molting cycle organically."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Diafenthiuron 50% WP (Pegasus)",
        "type": "Whitefly & Nymph Eradicant",
        "brands": "Syngenta Pegasus / UPL",
        "targetRole": "Paralyzes sucking whitefly vectors within hours of feeding."
      },
      {
        "name": "Acetamiprid 20% SP (Pride / Manik)",
        "type": "Systemic Neonicotinoid Specialist",
        "brands": "Tata Manik / Dhanuka",
        "targetRole": "Systemic phloem mobility protects new flushing shoots against whitefly vectors."
      }
    ],
    "dosageSchedule": {
      "frequency": "Vector management spray every 7 days until whitefly population is suppressed below threshold.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM) when whiteflies are sluggish on leaf undersides.",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "1.25 grams Pegasus or 0.4g Acetamiprid per 1 Liter of water (250g Pegasus per 200L water per acre).",
      "precautions": "Immediately rogue out and bury severely stunted viral plants in early stages to prevent transmission to healthy plants."
    },
    "voiceText": "Tomato Yellow Leaf Curl Virus detected! Install yellow sticky traps immediately and spray Diafenthiuron or Acetamiprid to control whiteflies."
  },
  {
    "id": "tomato-mosaic-virus",
    "modelIndex": 37,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "affected",
    "diseaseName": "Tomato Mosaic Virus (ToMV)",
    "pathogen": "Viral (Tobamovirus) transmitted via mechanical contact, tools, and seeds",
    "severity": "High (55% Mottling & Stunting)",
    "healthScore": 45,
    "badgeColor": "red",
    "imageType": "tomato-mosaic-virus",
    "symptoms": "Mottled light and dark green pattern (mosaic) on foliage, shoestring-like narrow distorted leaves, and brown internal browning of fruits.",
    "environmentalCause": "Mechanically spread through workers' hands, tools, grafting knives, and infected seed stock.",
    "homemadeRemedies": [
      {
        "name": "Skim Milk Tool Sterilization Wash (20% solution)",
        "ingredients": "200ml powdered milk in 1L clean water.",
        "preparation": "Dip hands and pruning tools frequently when working among plants.",
        "benefits": "Milk proteins inactivate Tobamovirus particles on contact, preventing mechanical transmission."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Trisodium Phosphate (TSP 10%) Tool Disinfectant",
        "type": "Virucidal Disinfectant",
        "brands": "Laboratory Grade TSP",
        "targetRole": "Disinfects stakes, trellises, and pruning tools against viral transmission."
      },
      {
        "name": "Chelated Micronutrient Blend + Potassium Schoenite",
        "type": "Foliar Plant Immunity Booster",
        "brands": "Multiplex Kranti",
        "targetRole": "Alleviates foliar stress and sustains remaining healthy fruit development."
      }
    ],
    "dosageSchedule": {
      "frequency": "Disinfect tools before entering each row; apply foliar micronutrients every 12 days.",
      "timing": "Early morning.",
      "sprayTimesPerDay": "Strictly 1 application per day.",
      "waterRatio": "3 grams Potassium Schoenite per 1 Liter of water.",
      "precautions": "Wash hands with soap or 20% milk before handling tomato plants. Prohibit tobacco smoking near the field."
    },
    "voiceText": "Tomato Mosaic Virus detected. Disinfect hands and tools with milk solution immediately and rogue out severely distorted infected plants."
  },
  {
    "id": "tomato-healthy",
    "modelIndex": 38,
    "cropKey": "Tomato",
    "cropName": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "status": "healthy",
    "condition": "Healthy Tomato Crop \u2014 Optimal Vigor & Fruiting",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "tomato-healthy",
    "overview": "Lush green foliage with uniform chlorophyll distribution, healthy cellular turgidity, vigorous flowering clusters, and zero fungal or bacterial lesions.",
    "healthyMaintenance": {
      "irrigation": "Drip irrigate at 60\u201370% field capacity. Avoid wetting leaves to prevent fungal spores.",
      "preventiveBioSpray": "Cold-pressed Neem Oil (5ml/L of water) or 5% Panchagavya spray once every 14 days as a natural repellent.",
      "nutrientPlan": "Balanced NPK 19:19:19 at 3g/L every 10 days during vegetative growth. Add Calcium Nitrate (2g/L) during flowering to avoid blossom end rot.",
      "soilCare": "Maintain soil pH between 6.0 and 6.8 with good organic mulch to preserve soil moisture."
    },
    "homemadeRemedies": [
      {
        "name": "Prophylactic Neem Kernel Foliar Spray",
        "ingredients": "50ml Neem Seed Kernel Extract (NSKE) + 2ml liquid dish soap + 10L clean water.",
        "preparation": "Mix thoroughly and spray on both sides of leaves early in the morning every 15 days.",
        "benefits": "Repels whiteflies, aphids, and disrupts spore settling naturally at zero chemical cost."
      },
      {
        "name": "Sour Buttermilk & Fermented Cow Urine Tonic",
        "ingredients": "1L 4-day fermented sour buttermilk (chaas) + 1L cow urine + 10L water.",
        "preparation": "Dilute with clean water, stir well, and spray on crop foliage once a month.",
        "benefits": "Boosts plant immunity, provides bio-available nitrogen, and creates a protective lactic acid biofilm."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Water-Soluble NPK (19:19:19)",
        "type": "Primary Fertilizer Booster",
        "brands": "IFFCO 19:19:19 / Mahadhan / Nagarjuna",
        "targetRole": "Sustains vegetative growth, leaf chlorophyll, and root development."
      },
      {
        "name": "Chelated Micronutrient Blend (Zn, B, Fe, Cu)",
        "type": "Foliar Nutrient Supplement",
        "brands": "Multiplex Kranti / Agromin Max",
        "targetRole": "Prevents interveinal chlorosis and improves fruit set percentage."
      }
    ],
    "dosageSchedule": {
      "frequency": "Fertilizer application once every 10 to 12 days; preventive bio-spray once every 14 days.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM) or late afternoon after 4:30 PM.",
      "sprayTimesPerDay": "Strictly 1 spray per day (Never spray twice on the same day).",
      "waterRatio": "3 grams per 1 Liter of water (approx. 600 grams per 200 Liters of water per acre).",
      "precautions": "Do not spray in bright midday sunlight or windy conditions. Keep soil moist prior to foliar feeding."
    },
    "voiceText": "The Tomato crop is completely healthy with a 99% health score! Continue optimal drip irrigation and apply preventive Neem oil spray once every 14 days."
  },
  {
    "id": "rice-healthy",
    "cropKey": "Rice / Paddy",
    "cropName": "Rice / Paddy",
    "scientificName": "Oryza sativa",
    "status": "healthy",
    "condition": "Healthy Paddy Crop \u2014 Optimal Tillering & Chlorophyll",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "rice-healthy",
    "overview": "Erect, vibrant green flag leaves with optimal chlorophyll saturation, robust tillering capacity, and zero bacterial streaks or fungal blast lesions.",
    "healthyMaintenance": {
      "irrigation": "Maintain Alternate Wetting and Drying (AWD) with 2\u20135 cm water depth during panicle initiation; drain 10 days before harvest.",
      "preventiveBioSpray": "Spray Pseudomonas fluorescens (5g/L) or 5% Panchagavya at 30 and 50 days after transplanting.",
      "nutrientPlan": "Top-dress Urea (30 kg) + MOP (15 kg/acre) at panicle initiation stage. Zinc Sulfate (10 kg/acre) basal.",
      "soilCare": "Apply Azospirillum and Phosphobacteria biofertilizers to enhance rhizosphere nutrient uptake."
    },
    "homemadeRemedies": [
      {
        "name": "Fermented Cow Dung & Cow Urine Bio-Tonic (Jeevamrutha)",
        "ingredients": "10kg fresh cow dung + 10L cow urine + 2kg jaggery + 2kg pulse flour + 200L water per acre.",
        "preparation": "Ferment in shade for 48 hours, stir twice daily, apply via irrigation channel.",
        "benefits": "Multiplies billions of beneficial soil microbes, enhancing root nutrient uptake at zero chemical cost."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Zinc Sulfate Heptahydrate 21%",
        "type": "Primary Micronutrient",
        "brands": "IFFCO Zinc / Coromandel",
        "targetRole": "Prevents Khaira deficiency disease and enhances chlorophyll synthesis."
      }
    ],
    "dosageSchedule": {
      "frequency": "Apply during active tillering and panicle initiation.",
      "timing": "Early morning or late afternoon.",
      "sprayTimesPerDay": "Strictly 1 application per day.",
      "waterRatio": "5 grams per 1 Liter of water.",
      "precautions": "Ensure thin water film in field during fertilizer broadcasting."
    },
    "voiceText": "The Rice Paddy crop is completely healthy with a 99% health score! Maintain alternate wetting and drying and apply balanced potassium."
  },
  {
    "id": "rice-bacterial-blight",
    "cropKey": "Rice / Paddy",
    "cropName": "Rice / Paddy",
    "scientificName": "Oryza sativa",
    "status": "affected",
    "diseaseName": "Bacterial Leaf Blight (BLB)",
    "pathogen": "Bacterial (Xanthomonas oryzae pv. oryzae)",
    "severity": "High (56% Canopy Blighted)",
    "healthScore": 44,
    "badgeColor": "red",
    "imageType": "rice-bacterial-blight",
    "symptoms": "Water-soaked to yellowish-white wavy stripes starting from leaf tips and margins, progressing downward. Leaves dry out, turn grayish-white, and curl inward.",
    "environmentalCause": "Warm temperatures (25\u00b0C\u201334\u00b0C) with continuous high humidity (>90%), heavy rainstorms, and excessive nitrogen fertilizer application.",
    "homemadeRemedies": [
      {
        "name": "Fresh Cow Dung Slurry Supernatant Wash",
        "ingredients": "5kg fresh cow dung thoroughly stirred in 100 Liters of water, strained through fine cloth.",
        "preparation": "Filter twice and spray immediately on infected paddy crop early in the morning.",
        "benefits": "Antagonistic beneficial bacteria in fresh cow dung suppress Xanthomonas bacterial blight naturally."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Copper Oxychloride 50% WP (Blitox 50)",
        "type": "Contact Protective Bactericide",
        "brands": "Tata Blitox / Dhanuka",
        "targetRole": "Sterilizes leaf surfaces and arrests bacterial multiplication."
      },
      {
        "name": "Streptocycline (90% Streptomycin + 10% Tetracycline)",
        "type": "Systemic Bactericide",
        "brands": "Hindustan Antibiotics Streptocycline",
        "targetRole": "Systemic bactericide that destroys bacterial cells inside leaf vascular bundles."
      }
    ],
    "dosageSchedule": {
      "frequency": "Once every 7 to 10 days until yellowing stripes cease expanding.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "2.5 grams Blitox + 0.1 gram Streptocycline per 1 Liter of clean water (500g Blitox + 20g Streptocycline per 200L water per acre).",
      "precautions": "Immediately withhold all chemical nitrogen (Urea) applications. Drain stagnant water from the field and allow soil aeration."
    },
    "voiceText": "Bacterial Leaf Blight detected in Paddy. Stop urea application immediately and spray Copper Oxychloride plus Streptocycline in early morning."
  },
  {
    "id": "wheat-healthy",
    "cropKey": "Wheat",
    "cropName": "Wheat",
    "scientificName": "Triticum aestivum",
    "status": "healthy",
    "condition": "Healthy Wheat Crop \u2014 Vigorous Tillering & Flag Leaf",
    "healthScore": 99,
    "badgeColor": "emerald",
    "imageType": "wheat-healthy",
    "overview": "Robust upright flag leaves with deep blue-green waxy sheen, erect tillers, optimal crown root health, and zero rust pustules.",
    "healthyMaintenance": {
      "irrigation": "5 critical irrigations: CRI stage (21 days), Tillering (45 days), Late Jointing (65 days), Flowering (85 days), and Milking stage (105 days).",
      "preventiveBioSpray": "Spray prophylactic 5% Panchagavya or 5ml/L Neem oil at jointing stage.",
      "nutrientPlan": "Balanced basal NPK + Zinc Sulfate (10 kg/acre). Top-dress Urea in two splits at first and second irrigations.",
      "soilCare": "Zero-tillage sowing with Happy Seeder to preserve residual soil moisture and reduce weed flushes."
    },
    "homemadeRemedies": [
      {
        "name": "Fermented Chaas & Cow Urine Foliar Tonic",
        "ingredients": "5L 4-day fermented buttermilk + 2L cow urine + 100L water per acre.",
        "preparation": "Spray at tillering stage in early morning.",
        "benefits": "Provides organic foliar nitrogen and creates protective acidic film against rust spores."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "0:0:50 (Potassium Sulfate)",
        "type": "Grain Weight & Heat Resistance",
        "brands": "IFFCO / Yara",
        "targetRole": "Strengthens wheat straw against lodging and protects grain filling against terminal heat stress."
      }
    ],
    "dosageSchedule": {
      "frequency": "Spray at heading and milk stages.",
      "timing": "Early morning.",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "4 grams per 1 Liter of water.",
      "precautions": "Avoid flood irrigation when winds exceed 15 km/h to prevent crop lodging."
    },
    "voiceText": "Wheat crop is completely healthy with 99% vigor score! Ensure irrigation at critical CRI and flowering stages."
  },
  {
    "id": "wheat-yellow-rust",
    "cropKey": "Wheat",
    "cropName": "Wheat",
    "scientificName": "Triticum aestivum",
    "status": "affected",
    "diseaseName": "Yellow / Stripe Rust",
    "pathogen": "Fungal (Puccinia striiformis f. sp. tritici)",
    "severity": "Critical (60% Flag Leaf Compromised)",
    "healthScore": 40,
    "badgeColor": "red",
    "imageType": "wheat-yellow-rust",
    "symptoms": "Bright yellow to orange-yellow powdery pustules arranged in parallel stripes or rows along the leaf veins of the flag leaf and blades.",
    "environmentalCause": "Cool, humid weather (10\u00b0C\u201318\u00b0C) with persistent night dew and dense overcast skies in Northern & Hill plains.",
    "homemadeRemedies": [
      {
        "name": "Sour Buttermilk & Asafoetida (Hing) Antifungal Spray",
        "ingredients": "5L 5-day fermented sour buttermilk + 50g hing powder in 100L clean water per acre.",
        "preparation": "Mix thoroughly, filter through muslin cloth, spray across wheat canopy.",
        "benefits": "Halts urediniospore sporulation organically at zero chemical cost."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Propiconazole 25% EC (Tilt)",
        "type": "Systemic Triazole Eradicant",
        "brands": "Syngenta Tilt / Dhanuka / Bayer",
        "targetRole": "Rapid systemic xylem translocation halts rust pustules within 48 hours."
      },
      {
        "name": "Tebuconazole 25.9% EC (Folicur)",
        "type": "Broad-Spectrum Systemic Fungicide",
        "brands": "Bayer Folicur / Rallis",
        "targetRole": "Provides long-lasting curative protection against stripe rust."
      }
    ],
    "dosageSchedule": {
      "frequency": "Immediately upon spotting the first yellow rust stripe; repeat once in 10 to 14 days if cool weather persists.",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "1.0 ml Propiconazole 25% EC per 1 Liter of clean water (200ml in 200 Liters water per acre).",
      "precautions": "Act immediately upon detecting first focal points to prevent rapid airborne spore spread."
    },
    "voiceText": "Yellow Stripe Rust detected on Wheat! Spray Propiconazole 25% EC at 1ml per liter immediately strictly once per day in early morning."
  },
  {
    "id": "cotton-leaf-curl",
    "cropKey": "Cotton",
    "cropName": "Cotton",
    "scientificName": "Gossypium hirsutum",
    "status": "affected",
    "diseaseName": "Cotton Leaf Curl Virus (CLCuV)",
    "pathogen": "Viral (Begomovirus) transmitted by Whitefly (Bemisia tabaci)",
    "severity": "High (58% Stunting & Boll Loss)",
    "healthScore": 42,
    "badgeColor": "red",
    "imageType": "cotton-leaf-curl",
    "symptoms": "Upward or downward leaf curling, thick swollen dark green veins, leaf enations (cup-shaped leaf-like outgrowths) on lower leaf surface, and extreme plant stunting.",
    "environmentalCause": "Warm, dry weather fostering massive whitefly vector populations.",
    "homemadeRemedies": [
      {
        "name": "Yellow Sticky Traps & Neem Oil Vector Barrier",
        "ingredients": "15\u201320 bright yellow sticky sheets coated with castor oil per acre + 5ml/L Neem oil spray.",
        "preparation": "Install traps at canopy height; spray neem oil on leaf undersides every 7 days.",
        "benefits": "Mass-traps whitefly vectors and suppresses virus spread organically."
      }
    ],
    "fertilizersMedicines": [
      {
        "name": "Diafenthiuron 50% WP (Pegasus)",
        "type": "Whitefly Vector Specialist",
        "brands": "Syngenta Pegasus / UPL",
        "targetRole": "Provides rapid knockdown of adult and nymphal whitefly vectors."
      },
      {
        "name": "Potassium Schoenite (0-0-23 + 11% Mg)",
        "type": "Foliar Stress Alleviator",
        "brands": "IFFCO / Yara",
        "targetRole": "Strengthens cotton boll retention and foliar vigor."
      }
    ],
    "dosageSchedule": {
      "frequency": "Spray whitefly insecticide every 7 days until counts drop below economic threshold (6\u20138 whiteflies/leaf).",
      "timing": "Early morning (6:30 AM \u2013 8:30 AM).",
      "sprayTimesPerDay": "Strictly 1 spray per day.",
      "waterRatio": "1.25 grams Pegasus per 1 Liter of water (250g in 200L water per acre).",
      "precautions": "Destroy weeds around field borders (Kanghi / Sida cordifolia) that act as reservoir hosts for virus."
    },
    "voiceText": "Cotton Leaf Curl Virus detected! Install yellow sticky traps and spray Diafenthiuron at 1.25 grams per liter in early morning."
  }
];

export const DISEASE_TRANSLATIONS = {
  'Apple Scab': { hi: 'सेब का स्केब रोग (Apple Scab)', ta: 'ஆப்பிள் ஸ்கேப் நோய்', te: 'ఆపిల్ స్కాబ్ తెగులు', kn: 'ಸೇಬು ಸ್ಕ್ಯಾಬ್ ರೋಗ' },
  'Black Rot': { hi: 'काला सड़न रोग (Black Rot)', ta: 'கருப்பு அழுகல் நோய்', te: 'నల్ల కుళ్ళు తెగులు', kn: 'ಕಪ್ಪು ಕೊಳೆ ರೋಗ' },
  'Cedar Apple Rust': { hi: 'देवदार सेब रतुआ (Cedar Apple Rust)', ta: 'செடார் ஆப்பிள் துரு நோய்', te: 'సీడార్ ఆపిల్ తుప్పు తెగులు', kn: 'ದೇವದಾರು ಸೇಬು ತುಕ್ಕು ರೋಗ' },
  'Powdery Mildew': { hi: 'चूर्णिल आसिता (पाउडरी मिल्ड्यू)', ta: 'சாம்பல் நோய்', te: 'బూడిద తెగులు', kn: 'ಬೂದಿ ರೋಗ' },
  'Cercospora Leaf Spot (Gray Leaf Spot)': { hi: 'सर्कोस्पोरा धब्बा रोग (Gray Leaf Spot)', ta: 'சாம்பல் இலைப்புள்ளி நோய்', te: 'బూడిద ఆకు మచ్చ తెగులు', kn: 'ಬೂದು ಎಲೆ ಚುಕ್ಕೆ ರೋಗ' },
  'Common Rust': { hi: 'सामान्य रतुआ रोग (Common Rust)', ta: 'பொது துரு நோய்', te: 'సాధారణ తుప్పు తెగులు', kn: 'ಸಾಮಾನ್ಯ ತುಕ್ಕು ರೋಗ' },
  'Northern Corn Leaf Blight (NCLB)': { hi: 'उत्तरी मक्का झुलसा (Northern Leaf Blight)', ta: 'வடக்கு மக்காச்சோள கருகல் நோய்', te: 'ఉత్తర మొక్కజొన్న తెగులు', kn: 'ಉತ್ತರ ಮೆಕ್ಕೆಜೋಳ ಕರಕಲು ರೋಗ' },
  'Esca (Black Measles)': { hi: 'एस्का / ब्लैक मीजल्स रोग', ta: 'எஸ்கா கருப்பு அம்மை நோய்', te: 'ఎస్కా నల్ల తట్టు తెగులు', kn: 'ಎಸ್ಕಾ ಕಪ್ಪು ದಡಾರ ರೋಗ' },
  'Leaf Blight (Isariopsis Leaf Spot)': { hi: 'पत्ती झुलसा रोग (Leaf Blight)', ta: 'இலை கருகல் நோய்', te: 'ఆకు తెగులు', kn: 'ಎಲೆ ಕರಕಲು ರೋಗ' },
  'Citrus Greening (Huanglongbing - HLB)': { hi: 'सिट्रस ग्रीनिंग (ह्वॉन्गलोंगबिंग)', ta: 'எலுமிச்சை கிரீனிங் நோய்', te: 'సిట్రస్ గ్రీనింగ్ తెగులు', kn: 'ಕಿತ್ತಳೆ ಗ್ರೀನಿಂಗ್ ರೋಗ' },
  'Bacterial Spot': { hi: 'जीवाणु धब्बा रोग (Bacterial Spot)', ta: 'பாக்டீரியா புள்ளி நோய்', te: 'బాక్టీరియల్ మచ్చ తెగులు', kn: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಚುಕ್ಕೆ ರೋಗ' },
  'Early Blight': { hi: 'अगेती झुलसा रोग (Early Blight)', ta: 'ஆரம்பகால கருகல் நோய்', te: 'ముందస్తు తెగులు (Early Blight)', kn: 'ಆರಂಭಿಕ ಎಲೆ ಕರಕಲು ರೋಗ' },
  'Late Blight': { hi: 'पछेती झुलसा रोग (Late Blight)', ta: 'தாமதமான கருகல் நோய்', te: 'ఆలస్యపు తెగులు (Late Blight)', kn: 'ತಡವಾದ ಎಲೆ ಕರಕಲು ರೋಗ' },
  'Leaf Mold': { hi: 'पत्ती फफूंद रोग (Leaf Mold)', ta: 'இலை பூஞ்சை நோய்', te: 'ఆకు బూజు తెగులు', kn: 'ಎಲೆ ಶಿಲೀಂಧ್ರ ರೋಗ' },
  'Septoria Leaf Spot': { hi: 'सेप्टोरिया पत्ती धब्बा रोग', ta: 'செப்டோரியா இலைப்புள்ளி நோய்', te: 'సెప్టోరియా ఆకు మచ్చ తెగులు', kn: 'ಸೆಪ್ಟೋರಿಯಾ ಎಲೆ ಚುಕ್ಕೆ ರೋಗ' },
  'Two-Spotted Spider Mites': { hi: 'लाल मकड़ी कीट (Spider Mites)', ta: 'செம்பேன் சிலந்தி பூச்சி', te: 'ఎర్ర నల్లి పురుగులు', kn: 'ಕೆಂಪು ಜೇಡ ನುಸಿ' },
  'Target Spot': { hi: 'टारगेट स्पॉट रोग', ta: 'டார்கெட் ஸ்பாட் நோய்', te: 'టార్గెట్ స్పాట్ తెగులు', kn: 'ಟಾರ್ಗೆಟ್ ಸ್ಪಾಟ್ ರೋಗ' },
  'Tomato Yellow Leaf Curl Virus (TYLCV)': { hi: 'टमाटर पत्ती मरोड़ विषाणु (Leaf Curl)', ta: 'தக்காளி இலை சுருள் வைரஸ்', te: 'టమోటా ఆకు ముడుత వైరస్', kn: 'ಟೊಮೆಟೊ ಎಲೆ ಮುದುರುವ ವೈರಸ್' },
  'Tomato Mosaic Virus (ToMV)': { hi: 'टमाटर मोजेक विषाणु (Mosaic Virus)', ta: 'தக்காளி மொசைக் வைரஸ்', te: 'టమోటా మొజాయిక్ వైరస్', kn: 'ಟೊಮೆಟೊ ಮೊಸಾಯಿಕ್ ವೈರಸ್' },
  'Bacterial Leaf Blight (BLB)': { hi: 'जीवाणु पत्ती झुलसा रोग', ta: 'பாக்டீரியா இலை கருகல் நோய்', te: 'బాక్టీరియల్ ఆకు తెగులు', kn: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಎಲೆ ಕರಕಲು ರೋಗ' },
  'Yellow / Stripe Rust': { hi: 'पीला रतुआ रोग (Yellow Rust)', ta: 'மஞ்சள் துரு நோய்', te: 'పసుపు తుప్పు తెగులు', kn: 'ಹಳದಿ ತುಕ್ಕು ರೋಗ' },
  'Cotton Leaf Curl Virus (CLCuV)': { hi: 'कपास पत्ती मरोड़ विषाणु', ta: 'பருத்தி இலை சுருள் வைரஸ்', te: 'పత్తి ఆకు ముడుత తెగులు', kn: 'ಹತ್ತಿ ಎಲೆ ಮುದುರುವ ವೈರಸ್' }
};

export function getLocalizedCropName(cropKey, lang = 'en') {
  return CROP_NAMES_LOCALIZED[cropKey]?.[lang] || CROP_NAMES_LOCALIZED[cropKey]?.en || cropKey;
}

export function getLocalizedDiseaseName(diseaseName, lang = 'en') {
  return DISEASE_TRANSLATIONS[diseaseName]?.[lang] || diseaseName;
}

export function getDiseaseById(id) {
  return CROP_DISEASES.find((d) => d.id === id) || CROP_DISEASES[0];
}

export function getDiseaseByModelIndex(index) {
  return CROP_DISEASES.find((d) => d.modelIndex === index) || CROP_DISEASES[0];
}
