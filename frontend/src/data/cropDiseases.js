// Comprehensive Database of Agricultural Crops, Diseases, Homemade Remedies, and Fertilizer Schedules
// Multilingual support for: English (en), Hindi (hi), Tamil (ta), Telugu (te), Kannada (kn)

export const CROP_NAMES_LOCALIZED = {
  'Tomato': { en: 'Tomato', hi: 'टमाटर', ta: 'தக்காளி', te: 'టమోటా', kn: 'ಟೊಮೆಟೊ' },
  'Rice / Paddy': { en: 'Rice / Paddy', hi: 'धान (चावल)', ta: 'நெல்', te: 'వరి', kn: 'ಭತ್ತ' },
  'Potato': { en: 'Potato', hi: 'आलू', ta: 'உருளைக்கிழங்கு', te: 'బంగాళాదుంప', kn: 'ಆಲೂಗಡ್ಡೆ' },
  'Wheat': { en: 'Wheat', hi: 'गेहूं', ta: 'கோதுமை', te: 'గోధుమ', kn: 'ಗೋಧಿ' },
  'Cotton': { en: 'Cotton', hi: 'कपास', ta: 'பருத்தி', te: 'పత్తి', kn: 'ಹತ್ತಿ' },
  'Corn / Maize': { en: 'Corn / Maize', hi: 'मक्का', ta: 'மக்காச்சோளம்', te: 'మొక్కజొన్న', kn: 'ಮೆಕ್ಕೆಜೋಳ' },
  'Chilli / Pepper': { en: 'Chilli / Pepper', hi: 'मिर्च', ta: 'மிளகாய்', te: 'మిరపకాయ', kn: 'ಮೆಣಸಿನಕಾಯಿ' },
  'Apple': { en: 'Apple', hi: 'सेब', ta: 'ஆப்பிள்', te: 'ఆపిల్', kn: 'ಸೇಬು' }
};

export const CROP_DISEASES = [
  {
    id: 'tomato-healthy',
    cropKey: 'Tomato',
    cropName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    status: 'healthy',
    condition: 'Healthy Leaf — No Pathogen Detected',
    healthScore: 98,
    badgeColor: 'emerald',
    imageType: 'tomato-healthy',
    overview: 'Lush green foliage with uniform chlorophyll distribution, healthy cellular turgidity, and zero fungal or bacterial lesions detected.',
    healthyMaintenance: {
      irrigation: 'Drip irrigate at 60–70% field capacity. Avoid wetting leaves to prevent fungal spores.',
      preventiveBioSpray: 'Cold-pressed Neem Oil (5ml/L of water) or 5% Panchagavya spray once every 14 days as a natural repellent.',
      nutrientPlan: 'Balanced NPK 19:19:19 at 3g/L every 10 days during vegetative growth. Add Calcium Nitrate (2g/L) during flowering to avoid blossom end rot.',
      soilCare: 'Maintain soil pH between 6.0 and 6.8 with good organic mulch to preserve soil moisture.'
    },
    homemadeRemedies: [
      {
        name: 'Prophylactic Neem Kernel Foliar Spray',
        ingredients: '50ml Neem Seed Kernel Extract (NSKE) + 2ml liquid dish soap + 10L clean water.',
        preparation: 'Mix thoroughly and spray on both sides of leaves early in the morning every 15 days.',
        benefits: 'Repels whiteflies, aphids, and disrupts spore settling naturally at zero chemical cost.'
      },
      {
        name: 'Sour Buttermilk & Fermented Cow Urine Tonic',
        ingredients: '1L 4-day fermented sour buttermilk (chaas) + 1L cow urine + 10L water.',
        preparation: 'Dilute with clean water, stir well, and spray on crop foliage once a month.',
        benefits: 'Boosts plant immunity, provides bio-available nitrogen, and creates a protective lactic acid biofilm.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Water-Soluble NPK (19:19:19)',
        type: 'Primary Fertilizer Booster',
        brands: 'IFFCO 19:19:19 / Mahadhan / Nagarjuna',
        targetRole: 'Sustains vegetative growth, leaf chlorophyll, and root development.'
      },
      {
        name: 'Chelated Micronutrient Blend (Zn, B, Fe, Cu)',
        type: 'Foliar Nutrient Supplement',
        brands: 'Multiplex Kranti / Agromin Max',
        targetRole: 'Prevents interveinal chlorosis and improves fruit set percentage.'
      }
    ],
    dosageSchedule: {
      frequency: 'Fertilizer application once every 10 to 12 days; preventive bio-spray once every 14 days.',
      timing: 'Early morning (6:30 AM – 8:30 AM) or late afternoon after 4:30 PM.',
      sprayTimesPerDay: 'Strictly 1 spray per day (Never spray twice on the same day).',
      waterRatio: '3 grams per 1 Liter of water (approx. 600 grams per 200 Liters of water per acre).',
      precautions: 'Do not spray in bright midday sunlight or windy conditions. Keep soil moist prior to foliar feeding.'
    },
    voiceText: 'The Tomato crop is completely healthy with a 98% health score! No disease or pests detected. Continue optimal drip irrigation and apply preventive Neem oil spray once every 14 days to sustain healthy yield.'
  },
  {
    id: 'tomato-early-blight',
    cropKey: 'Tomato',
    cropName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    status: 'affected',
    diseaseName: 'Early Blight',
    pathogen: 'Fungal (Alternaria solani)',
    severity: 'Moderate (42% Leaf Tissue Affected)',
    healthScore: 58,
    badgeColor: 'amber',
    imageType: 'tomato-early-blight',
    symptoms: 'Distinct concentric circular brown-black lesions with yellow chlorotic halos, resembling a target-board pattern on older lower leaves. Causes premature defoliation and sunken stem cankers.',
    environmentalCause: 'Warm temperatures (24°C–29°C) combined with high relative humidity (>80%) and frequent leaf wetness from rain or overhead sprinkling.',
    homemadeRemedies: [
      {
        name: 'Sour Buttermilk & Asafoetida (Hing) Antifungal Spray',
        ingredients: '5 Liters 5-day fermented sour buttermilk (chaas) + 50g powdered asafoetida (hing) + 100 Liters water.',
        preparation: 'Dissolve hing in warm water, combine with sour buttermilk, filter through muslin cloth, dilute to 100L for 1 acre.',
        benefits: 'Lactic acid and sulfurous compounds in hing severely inhibit Alternaria spore germination within 48 hours.'
      },
      {
        name: 'Baking Soda & Vegetable Oil Fungicidal Emulsion',
        ingredients: '10g Sodium Bicarbonate (Baking Soda) + 5ml Vegetable Oil + 2ml liquid soap + 1 Liter warm water.',
        preparation: 'Whisk oil and soap into warm water, add baking soda, shake well, spray thoroughly on foliage.',
        benefits: 'Alters leaf surface pH to alkaline, dehydrating fungal mycelium and arresting target spots.'
      },
      {
        name: 'Fermented Neem Seed & Turmeric Extract (NSKE 5%)',
        ingredients: '500g crushed neem seeds + 100g wild turmeric powder + 10 Liters water.',
        preparation: 'Soak overnight, filter through cloth, spray immediately.',
        benefits: 'Azadirachtin and curcumin offer natural antimicrobial and fungistatic action.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Copper Oxychloride 50% WP (Blitox 50 / Cupramar)',
        type: 'Contact Protective Fungicide',
        brands: 'Rallis Blitox 50 / Tata / Dhanuka',
        targetRole: 'Creates a robust copper barrier on leaf surfaces that kills fungal spores upon contact.'
      },
      {
        name: 'Mancozeb 75% WP (Indofil M-45 / Dithane M-45)',
        type: 'Broad-Spectrum Dithiocarbamate Fungicide',
        brands: 'Indofil M-45 / UPL Saaf / Bayer',
        targetRole: 'Multisite enzyme inhibitor that rapidly arrests Alternaria blight.'
      },
      {
        name: 'Potassium Schoenite / SOP (0:0:50)',
        type: 'Immunity & Cell Wall Strengthening Fertilizer',
        brands: 'IFFCO SOP / Haifa Bonus K',
        targetRole: 'Thickens epidermal cell walls, preventing further pathogen hypha penetration.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray once every 7 to 10 days until new growth is free of lesions (total 2 to 3 sprays).',
      timing: 'Early morning between 6:30 AM and 8:30 AM on dry leaves.',
      sprayTimesPerDay: 'Strictly 1 spray per day. Never apply twice on the same day.',
      waterRatio: '2.5 grams Mancozeb or 3 grams Copper Oxychloride per 1 Liter of water (500g to 600g per 200L water per acre).',
      precautions: 'Prune and burn infected lower leaves touching soil. Avoid overhead sprinklers. Pre-Harvest Interval (PHI): 7 days.'
    },
    voiceText: 'Warning: Tomato Early Blight fungal infection detected with 42% leaf severity. Spray Mancozeb at 2.5 grams per liter or use Sour Buttermilk and Hing remedy once every 7 days in the early morning. Prune affected lower leaves immediately.'
  },
  {
    id: 'tomato-late-blight',
    cropKey: 'Tomato',
    cropName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    status: 'affected',
    diseaseName: 'Late Blight',
    pathogen: 'Oomycete (Phytophthora infestans)',
    severity: 'High (68% Leaf Tissue Affected)',
    healthScore: 32,
    badgeColor: 'rose',
    imageType: 'tomato-late-blight',
    symptoms: 'Rapidly expanding water-soaked greasy brown-black patches with white fuzzy fungal mold on the underside of leaves during humid mornings. Causes rapid vine collapse and brown fruit rot.',
    environmentalCause: 'Cool wet weather (15°C–21°C) with persistent fog, dew, or humidity >90%.',
    homemadeRemedies: [
      {
        name: 'Garlic-Chilli-Cow Urine Bio-Fungicide Decoction',
        ingredients: '250g crushed garlic cloves + 250g green chillies + 2L aged cow urine + 15L water.',
        preparation: 'Grind garlic and chillies, steep in cow urine for 24 hours, strain through cloth, dilute in 15L water.',
        benefits: 'Allicin and capsaicin destroy oomycete cell membranes while cow urine boosts foliar enzymes.'
      },
      {
        name: 'Hardwood Ash & Slaked Lime Dusting',
        ingredients: '4 parts sifted hardwood wood ash + 1 part agricultural slaked lime (chuna).',
        preparation: 'Mix thoroughly and dust lightly over dew-covered leaves early in the morning.',
        benefits: 'Absorbs moisture on leaf surfaces, creating a dry alkaline microclimate that stops zoospore motility.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold)',
        type: 'Systemic + Contact Oomycete Specialist',
        brands: 'Syngenta Ridomil Gold / UPL / Dhanuka',
        targetRole: 'Translocates inside plant tissue to eradicate existing mycelium while protecting new shoots.'
      },
      {
        name: 'Dimethomorph 50% WP (Acrobat / BASF)',
        type: 'Cell Wall Synthesis Inhibitor',
        brands: 'BASF Acrobat / Bayer',
        targetRole: 'High-efficacy curative medicine against aggressive Phytophthora strains.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray immediately, then repeat after 5 to 7 days if weather remains wet and cloudy.',
      timing: 'Morning hours as soon as dew dries.',
      sprayTimesPerDay: 'Strictly 1 spray per day. Maximum 2 applications per season.',
      waterRatio: '2 grams Ridomil Gold per 1 Liter of clean water (400g per 200L water per acre).',
      precautions: 'Aggressive emergency condition! Do not wait. Avoid working in wet fields to prevent spore dispersion on clothing. Pre-Harvest Interval: 5 days.'
    },
    voiceText: 'Urgent Alert: Tomato Late Blight detected with 68% leaf damage. Spray Ridomil Gold at 2 grams per liter or apply Garlic-Cow Urine extract immediately once every 5 days.'
  },
  {
    id: 'rice-healthy',
    cropKey: 'Rice / Paddy',
    cropName: 'Rice / Paddy',
    scientificName: 'Oryza sativa',
    status: 'healthy',
    condition: 'Healthy Paddy Leaf — Clean Tillering Stage',
    healthScore: 97,
    badgeColor: 'emerald',
    imageType: 'rice-healthy',
    overview: 'Erect, deep-green linear leaves with pristine blade edges and active photosynthetic capacity. Tillering count and panicle initiation indicators are optimal.',
    healthyMaintenance: {
      irrigation: 'Maintain 2–3 cm shallow standing water during tillering; follow alternate wetting and drying (AWD) to save water.',
      preventiveBioSpray: 'Spray Trichoderma viride or Pseudomonas fluorescens (5g/L) at maximum tillering to build systemic acquired resistance.',
      nutrientPlan: 'Top-dress Nitrogen (Urea with neem coating) in 3 split doses. Apply Zinc Sulphate 25kg/acre if soil is deficient.',
      soilCare: 'Incorporate blue-green algae or Azospirillum bio-fertilizers to fix atmospheric nitrogen naturally.'
    },
    homemadeRemedies: [
      {
        name: 'Panchagavya Organic Growth Elixir',
        ingredients: '300ml Panchagavya solution + 10L clean water.',
        preparation: 'Stir well, strain through fine mesh, and apply as foliar spray during panicle initiation.',
        benefits: 'Contains IAA, gibberellins, and beneficial mycorrhizae for heavy grain filling and pest resistance.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Neem-Coated Urea (46% N) + MOP (60% K2O)',
        type: 'Basal / Split Macro-Nutrients',
        brands: 'IFFCO / KRIBHCO / NFL',
        targetRole: 'Provides balanced nitrogen for vigorous tillering and potassium for sturdy culm strength.'
      }
    ],
    dosageSchedule: {
      frequency: 'Split urea applications at 21 and 42 days after transplanting; bio-spray once every 15 days.',
      timing: 'Spray or broadcast in early morning after dew evaporates.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: 'Foliar sprays: 5 grams per 1 Liter of clean water.',
      precautions: 'Do not drain water immediately after applying urea. Keep field closed for 48 hours.'
    },
    voiceText: 'The Rice crop is vibrant and healthy with a 97% health score. Maintain alternate wetting and drying, and spray Panchagavya once every 15 days.'
  },
  {
    id: 'rice-bacterial-blight',
    cropKey: 'Rice / Paddy',
    cropName: 'Rice / Paddy',
    scientificName: 'Oryza sativa',
    status: 'affected',
    diseaseName: 'Bacterial Leaf Blight (BLB)',
    pathogen: 'Bacterial (Xanthomonas oryzae)',
    severity: 'High (55% Leaf Area Affected)',
    healthScore: 45,
    badgeColor: 'rose',
    imageType: 'rice-bacterial-blight',
    symptoms: 'Water-soaked translucent streaks starting from leaf tips and margins, progressing into wavy, straw-yellow to bleached white lesions with amber bacterial slime droplets.',
    environmentalCause: 'High humidity (>70%), temperature between 25°C–34°C, strong winds with rain, and excessive nitrogen fertilization.',
    homemadeRemedies: [
      {
        name: 'Fermented Cow Dung Slurry & Slaked Lime Supernatant',
        ingredients: '10kg fresh cow dung + 100g slaked lime (chuna) + 100L water.',
        preparation: 'Mix fresh cow dung in water, allow settling for 24 hours. Decant clear supernatant, add dissolved slaked lime, filter, and spray.',
        benefits: 'Provides antagonistic bacterial strains (Bacillus subtilis) and elevates pH to stop Xanthomonas.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Plantomycin / Streptocycline (Streptomycin 90% + Tetracycline 10%)',
        type: 'Agricultural Antibiotic / Bactericide',
        brands: 'Aries Plantomycin / Hindustan Antibiotics Streptocycline',
        targetRole: 'Systemic bactericide that directly eliminates bacterial cells inside vascular bundles.'
      },
      {
        name: 'Copper Oxychloride 50% WP (Blitox 50)',
        type: 'Contact Bactericidal Protectant',
        brands: 'Tata Blitox / Dhanuka',
        targetRole: 'Combined with Streptocycline to provide dual systemic and contact surface protection.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray immediately upon first symptom; repeat after 8 to 10 days if lesions advance.',
      timing: 'Spray in the morning between 7:00 AM and 9:00 AM.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '6 grams Streptocycline (1 pouch) + 250 grams Copper Oxychloride per 150 Liters of water per acre.',
      precautions: 'CRITICAL: Immediately halt all top-dress Urea/Nitrogen applications! Drain standing water and allow soil to aerate.'
    },
    voiceText: 'Alert: Rice Bacterial Leaf Blight detected with 55% leaf damage. Immediately halt all urea fertilizer. Spray Streptocycline at 6 grams plus Copper Oxychloride at 250 grams per 150 liters water.'
  },
  {
    id: 'rice-brown-spot',
    cropKey: 'Rice / Paddy',
    cropName: 'Rice / Paddy',
    scientificName: 'Oryza sativa',
    status: 'affected',
    diseaseName: 'Brown Spot',
    pathogen: 'Fungal (Bipolaris oryzae)',
    severity: 'Moderate (36% Leaf Coverage)',
    healthScore: 64,
    badgeColor: 'amber',
    imageType: 'rice-brown-spot',
    symptoms: 'Small, oval to circular dark brown spots with a grey or whitish center and yellow margin scattered across the leaf blade. Highly associated with nutrient-exhausted soil.',
    environmentalCause: 'Nutrient-deficient soils, potassium and zinc deficiency, and dry-wet weather (25°C–30°C).',
    homemadeRemedies: [
      {
        name: 'Wood Ash & Fermented Cow Urine Foliar Wash',
        ingredients: '2kg filtered wood ash + 2L aged cow urine + 20L water.',
        preparation: 'Steep wood ash in water overnight, filter out particles, add cow urine, and spray.',
        benefits: 'Provides bio-available silica and potassium that physically fortifies epidermis against fungal penetration.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Hexaconazole 5% SC (Contaf / Tata Taquat)',
        type: 'Systemic Triazole Fungicide',
        brands: 'Tata Contaf / Rallis / Dhanuka',
        targetRole: 'Inhibits fungal ergosterol synthesis, eradicating internal mycelia.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray once every 10 to 12 days (maximum 2 applications).',
      timing: 'Morning or late afternoon on calm days.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '2 ml Hexaconazole 5% SC per 1 Liter of water (approx. 400ml per 200L water per acre).',
      precautions: 'Apply balanced potash and zinc fertilizer to field to correct soil exhaustion.'
    },
    voiceText: 'Rice Brown Spot fungal disease identified. Spray Hexaconazole at 2ml per liter once every 10 days.'
  },
  {
    id: 'potato-healthy',
    cropKey: 'Potato',
    cropName: 'Potato',
    scientificName: 'Solanum tuberosum',
    status: 'healthy',
    condition: 'Healthy Potato Plant — Vigorous Tuber Bulking',
    healthScore: 99,
    badgeColor: 'emerald',
    imageType: 'potato-healthy',
    overview: 'Lush dark-green compound leaves, robust stem diameter, zero leaf curl, and active underground tuber enlargement.',
    healthyMaintenance: {
      irrigation: 'Uniform light irrigations at 5–7 day intervals. Stop watering 10 days before harvesting.',
      preventiveBioSpray: 'Prophylactic spray of Trichoderma viride (4g/L) or Neem oil (5ml/L) every 15 days.',
      nutrientPlan: 'Top-dress with Sulphate of Potash (0:0:50) at tuber bulking stage.',
      soilCare: 'Earthing up around stems at 30 and 45 days after planting.'
    },
    homemadeRemedies: [
      {
        name: 'Cow Dung & Urine Bio-Fertilizer Drench',
        ingredients: '5kg fresh cow dung + 5L cow urine + 50L water.',
        preparation: 'Stir in drum, ferment for 4 days, apply as root drench along ridges.',
        benefits: 'Accelerates microbial decomposition and delivers balanced macronutrients directly to tuber zone.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Potassium Schoenite / SOP (0:0:50)',
        type: 'High Grade Potash Booster',
        brands: 'IFFCO SOP / Aries Potash',
        targetRole: 'Drives sugar translocation from leaves to bulking potato tubers.'
      }
    ],
    dosageSchedule: {
      frequency: 'Foliar nutrition once every 12 days; preventive bio-spray once every 14 days.',
      timing: 'Morning hours.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '4 grams per 1 Liter of water.',
      precautions: 'Ensure proper soil earthing up to prevent sunlight exposure to growing tubers.'
    },
    voiceText: 'The Potato crop is in peak health with a 99% health score. Maintain uniform soil moisture and earth up ridges.'
  },
  {
    id: 'potato-late-blight',
    cropKey: 'Potato',
    cropName: 'Potato',
    scientificName: 'Solanum tuberosum',
    status: 'affected',
    diseaseName: 'Late Blight',
    pathogen: 'Oomycete (Phytophthora infestans)',
    severity: 'High (62% Leaf Area Destroyed)',
    healthScore: 38,
    badgeColor: 'rose',
    imageType: 'potato-late-blight',
    symptoms: 'Irregular dark water-soaked lesions that turn necrotic black rapidly, accompanied by white mildew growth on leaf undersides in morning fog. Emits decaying odor.',
    environmentalCause: 'Prolonged cold, cloudy, damp weather with humidity >85% and temperatures around 12°C–20°C.',
    homemadeRemedies: [
      {
        name: 'Garlic-Chilli & Sour Buttermilk Anti-Oomycete Spray',
        ingredients: '500g crushed garlic + 250g green chillies + 5L sour buttermilk + 50L water.',
        preparation: 'Ferment crushed spices in buttermilk for 3 days, filter, and spray on entire crop canopy.',
        benefits: 'Allicin compounds rupture oomycete cell walls, halting rapid canopy blight.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Cymoxanil 8% + Mancozeb 64% WP (Curzate / Sectin)',
        type: 'Curative + Preventive Oomycide',
        brands: 'Corteva Curzate / Bayer Sectin',
        targetRole: 'Penetrates leaf surface within 2 hours to halt active Phytophthora mycelium growth.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray immediately upon detection; repeat after 6 days if foggy cold weather persists.',
      timing: 'Morning hours once leaf surface is free of dripping water.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '2.5 grams Cymoxanil + Mancozeb per 1 Liter of water (500g per 200L water per acre).',
      precautions: 'Emergency protocol: Destroy severely blighted plants. Discontinue evening flooding.'
    },
    voiceText: 'Critical Alert: Potato Late Blight detected with 62% leaf damage. Spray Cymoxanil plus Mancozeb at 2.5 grams per liter immediately.'
  },
  {
    id: 'wheat-healthy',
    cropKey: 'Wheat',
    cropName: 'Wheat',
    scientificName: 'Triticum aestivum',
    status: 'healthy',
    condition: 'Healthy Wheat Crop — Active Booting / Heading',
    healthScore: 98,
    badgeColor: 'emerald',
    imageType: 'wheat-healthy',
    overview: 'Uniform emerald green erect flag leaves with healthy venation, strong tillers, and clean earheads free of rust pustules.',
    healthyMaintenance: {
      irrigation: 'Crucial irrigation stages: Crown Root Initiation (CRI at 21 days), Tillering (45 days), and Flowering (85 days).',
      preventiveBioSpray: 'Spray Pseudomonas fluorescens (5g/L) during flag leaf emergence.',
      nutrientPlan: 'Foliar spray of Potassium Nitrate (13:0:45) at 1% concentration at booting stage.',
      soilCare: 'Ensure proper drainage; water stagnation damages wheat root aeration.'
    },
    homemadeRemedies: [
      {
        name: 'Jeevamrutha Bio-Nutrient Drench',
        ingredients: '10kg fresh cow dung + 10L cow urine + 2kg jaggery + 2kg pulse flour in 200L water.',
        preparation: 'Stir twice daily for 4 days in shade. Apply via irrigation water to 1 acre.',
        benefits: 'Multiplies billions of beneficial soil microbes, enhancing root nutrient uptake by 35%.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Potassium Nitrate (13:0:45)',
        type: 'Flag Leaf & Grain Weight Booster',
        brands: 'IFFCO 13:0:45 / Haifa Multi-K',
        targetRole: 'Maintains flag leaf greenness, increases grain weight, and builds drought tolerance.'
      }
    ],
    dosageSchedule: {
      frequency: 'Foliar spray at boot stage and milking stage (total 2 sprays across season).',
      timing: 'Sunny afternoon after 3:00 PM or early morning.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '10 grams per 1 Liter of water (2 kg per 200L water per acre).',
      precautions: 'Do not spray in frosty morning temperatures; wait for ambient warmth.'
    },
    voiceText: 'The Wheat crop is in prime healthy condition with a 98% health score. Spray Potassium Nitrate at booting stage.'
  },
  {
    id: 'wheat-yellow-rust',
    cropKey: 'Wheat',
    cropName: 'Wheat',
    scientificName: 'Triticum aestivum',
    status: 'affected',
    diseaseName: 'Yellow / Stripe Rust',
    pathogen: 'Fungal (Puccinia striiformis)',
    severity: 'Severe (70% Flag Leaf Coverage)',
    healthScore: 30,
    badgeColor: 'rose',
    imageType: 'wheat-yellow-rust',
    symptoms: 'Parallel linear stripes of bright yellow-orange powdery pustules along leaf veins. Spores transfer onto clothing like yellow turmeric powder.',
    environmentalCause: 'Cool temperatures (10°C–15°C) coupled with high humidity, night dew, and cloudy weather.',
    homemadeRemedies: [
      {
        name: 'Sour Buttermilk & Fermented Garlic-Cow Urine Spray',
        ingredients: '5L fermented sour buttermilk + 500g crushed garlic + 5L aged cow urine + 100L water.',
        preparation: 'Mix in barrel, leave for 24 hours, filter through fine mesh, spray over 1 acre.',
        benefits: 'Sulfur in garlic and lactic acid in buttermilk suppress Puccinia urediniospore germination.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Propiconazole 25% EC (Tilt / Bumper)',
        type: 'Systemic Triazole Specialty Fungicide',
        brands: 'Syngenta Tilt / Rallis / Dhanuka',
        targetRole: 'Gold standard fungicide for Yellow Rust; instantly halts fungal ergosterol synthesis.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray immediately upon spotting yellow powder. Repeat after 12 to 14 days if rust persists.',
      timing: 'Clear morning after dew evaporates.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '1 ml Propiconazole 25% EC per 1 Liter of clean water (200 ml per 200 Liters of water per acre).',
      precautions: 'Urgent: Alert neighboring farmers as yellow rust spores travel miles on wind.'
    },
    voiceText: 'Severe Alert: Wheat Yellow Rust detected with 70% flag leaf infestation. Spray Propiconazole 25% EC at 1ml per liter immediately.'
  },
  {
    id: 'cotton-leaf-curl',
    cropKey: 'Cotton',
    cropName: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    status: 'affected',
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    pathogen: 'Viral (Begomovirus) transmitted by Whitefly',
    severity: 'Moderate (48% Canopy Curling)',
    healthScore: 52,
    badgeColor: 'amber',
    imageType: 'cotton-leaf-curl',
    symptoms: 'Upward or downward curling of leaf margins, severe thickening of veins on underside, and enations (outgrowths). Plants stunted.',
    environmentalCause: 'High whitefly insect population during warm dry spells (30°C–38°C).',
    homemadeRemedies: [
      {
        name: 'Neem-Karanj-Garlic Botanical Insecticidal Wash',
        ingredients: '500ml Neem oil + 500ml Karanj oil + 250g crushed garlic + 50g soap in 100L water.',
        preparation: 'Blend oils with soap solution until milky emulsion forms. Spray on underside of leaves.',
        benefits: 'Suffocates whitefly nymphs and adults, terminating viral transmission cycle.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Diafenthiuron 50% WP (Pegasus / Polo)',
        type: 'Insecticide for Whitefly Control',
        brands: 'Syngenta Pegasus / Tata Polo / Dhanuka',
        targetRole: 'Rapidly eliminates adult and nymph whiteflies transmitting the virus.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray for whitefly vector control once every 7 to 10 days.',
      timing: 'Late afternoon (after 4:00 PM) when whiteflies are settled on leaf undersides.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '1.25 grams Diafenthiuron per 1 Liter of water (250g per 200L water per acre).',
      precautions: 'Direct spray nozzle towards undersides of leaves where whiteflies colonize.'
    },
    voiceText: 'Cotton Leaf Curl Virus identified. Whiteflies are transmitting the virus. Spray Diafenthiuron or Neem-Karanj oil once every 7 days.'
  },
  {
    id: 'corn-rust',
    cropKey: 'Corn / Maize',
    cropName: 'Corn / Maize',
    scientificName: 'Zea mays',
    status: 'affected',
    diseaseName: 'Common Rust',
    pathogen: 'Fungal (Puccinia sorghi)',
    severity: 'Moderate (40% Leaf Coverage)',
    healthScore: 60,
    badgeColor: 'amber',
    imageType: 'corn-rust',
    symptoms: 'Small, circular to elongated cinnamon-brown powdery pustules scattered across both upper and lower leaf surfaces.',
    environmentalCause: 'Moderate temperatures (16°C–25°C) with high relative humidity (>95%) and extended dew periods.',
    homemadeRemedies: [
      {
        name: 'Sour Buttermilk & Fermented Cow Urine Foliar Spray',
        ingredients: '5L sour buttermilk + 5L cow urine + 100L water.',
        preparation: 'Ferment for 4 days, filter, and spray on canopy.',
        benefits: 'Lactic acid creates a protective surface film that prevents Puccinia spore penetration.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top)',
        type: 'Broad-Spectrum Systemic Strobilurin + Triazole',
        brands: 'Syngenta Amistar Top / Godrej',
        targetRole: 'Provides robust preventive and curative control, keeping leaves green for grain filling.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray once every 10 days (1 to 2 applications during tasseling stage).',
      timing: 'Morning hours.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '1 ml Amistar Top per 1 Liter of water (200 ml per 200L water per acre).',
      precautions: 'Protect ear leaves and leaves above the ear, which contribute 80% to grain filling.'
    },
    voiceText: 'Corn Common Rust detected. Spray Amistar Top at 1ml per liter once every 10 days.'
  },
  {
    id: 'chilli-leaf-curl',
    cropKey: 'Chilli / Pepper',
    cropName: 'Chilli / Pepper',
    scientificName: 'Capsicum annuum',
    status: 'affected',
    diseaseName: 'Chilli Leaf Curl & Anthracnose',
    pathogen: 'Complex Viral + Fungal (Colletotrichum)',
    severity: 'High (58% Foliage Affected)',
    healthScore: 42,
    badgeColor: 'rose',
    imageType: 'chilli-leaf-curl',
    symptoms: 'Upward boat-shaped curling of leaves, crinkling, reduced leaf size, and sunken circular fruit rot lesions.',
    environmentalCause: 'Heavy infestation of thrips and mites during hot dry spells, followed by high humidity.',
    homemadeRemedies: [
      {
        name: 'Sour Buttermilk & Hing Antiviral Tonic',
        ingredients: '5L fermented sour buttermilk + 50g asafoetida (hing) + 100L water.',
        preparation: 'Dissolve hing in warm water, combine with sour buttermilk, dilute to 100L, spray weekly.',
        benefits: 'Trusted traditional remedy to relax leaf curling and boost plant enzymes.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Fipronil 5% SC (Regent / Prince)',
        type: 'Systemic Thripicide & Sucking Pest Controller',
        brands: 'Bayer Regent / Dhanuka / Rallis',
        targetRole: 'Eliminates vector thrips causing leaf curling.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray once every 7 to 8 days (total 2 to 3 sprays).',
      timing: 'Late afternoon after 4:30 PM.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '2 ml Fipronil per 1 Liter of water (400ml per 200L water per acre).',
      precautions: 'Install blue sticky traps for thrips and yellow traps for whiteflies.'
    },
    voiceText: 'Chilli Leaf Curl and Anthracnose detected. Vector thrips are active. Spray Fipronil at 2ml per liter once every 7 days.'
  },
  {
    id: 'apple-scab',
    cropKey: 'Apple',
    cropName: 'Apple',
    scientificName: 'Malus domestica',
    status: 'affected',
    diseaseName: 'Apple Scab',
    pathogen: 'Fungal (Venturia inaequalis)',
    severity: 'Moderate (44% Leaf & Fruit Spotting)',
    healthScore: 56,
    badgeColor: 'amber',
    imageType: 'apple-scab',
    symptoms: 'Velvety olive-green to dull black spots with feathery edges on leaves, becoming corky and raised on developing fruits.',
    environmentalCause: 'Cool wet spring weather with prolonged leaf wetness (>9 hours at 15°C–20°C).',
    homemadeRemedies: [
      {
        name: 'Baking Soda & Potassium Bicarbonate Foliar Wash',
        ingredients: '20g Potassium Bicarbonate + 5ml horticultural oil + 1L water.',
        preparation: 'Mix thoroughly and spray across canopy.',
        benefits: 'Alters leaf surface pH and halts spore penetration naturally.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Difenoconazole 25% EC (Score / Diffen)',
        type: 'Curative Triazole Specialist',
        brands: 'Syngenta Score / Tata',
        targetRole: 'Penetrates leaf cuticle to eliminate incubating scab fungus.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray once every 10 to 12 days during rainy periods.',
      timing: 'Morning hours on dry foliage.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '0.5 ml Score per 1 Liter of water (100ml per 200L water per acre).',
      precautions: 'Prune dense orchard canopy to maximize air circulation. Rake and compost fallen leaves.'
    },
    voiceText: 'Apple Scab fungal infection detected. Spray Difenoconazole at 0.5ml per liter once every 10 days.'
  }
];

/**
 * Returns localized name and disease title for any item based on active language
 */
export function getLocalizedCropName(cropKey, lang = 'en') {
  return CROP_NAMES_LOCALIZED[cropKey]?.[lang] || CROP_NAMES_LOCALIZED[cropKey]?.en || cropKey;
}

export function getLocalizedDiseaseName(diseaseName, lang = 'en') {
  const dict = {
    'Early Blight': { hi: 'अगेती झुलसा रोग (Early Blight)', ta: 'ஆரம்பகால கருகல் நோய்', te: 'ముందస్తు తెగులు (Early Blight)', kn: 'ಆರಂಭಿಕ ಎಲೆ ಕರಕಲು ರೋಗ' },
    'Late Blight': { hi: 'पछेती झुलसा रोग (Late Blight)', ta: 'தாமதமான கருகல் நோய்', te: 'ఆలస్యపు తెగులు (Late Blight)', kn: 'ತಡವಾದ ಎಲೆ ಕರಕಲು ರೋಗ' },
    'Bacterial Leaf Blight (BLB)': { hi: 'जीवाणु पत्ती झुलसा रोग', ta: 'பாக்டீரியா இலை கருகல் நோய்', te: 'బాక్టీరియల్ ఆకు తెగులు', kn: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಎಲೆ ಕರಕಲು ರೋಗ' },
    'Brown Spot': { hi: 'भूरा धब्बा रोग', ta: 'பழுப்பு புள்ளி நோய்', te: 'గోధుమ మచ్చ తెగులు', kn: 'ಕಂದು ಚುಕ್ಕೆ ರೋಗ' },
    'Yellow / Stripe Rust': { hi: 'पीला रतुआ रोग (Yellow Rust)', ta: 'மஞ்சள் துரு நோய்', te: 'పసుపు తుప్పు తెగులు', kn: 'ಹಳದಿ ತುಕ್ಕು ರೋಗ' },
    'Cotton Leaf Curl Virus (CLCuV)': { hi: 'कपास पत्ती मरोड़ विषाणु', ta: 'இலை சுருள் வைரஸ் நோய்', te: 'పత్తి ఆకు ముడుత తెగులు', kn: 'ಹತ್ತಿ ಎಲೆ ಮುದುರುವ ವೈರಸ್' },
    'Common Rust': { hi: 'मक्का सामान्य रतुआ रोग', ta: 'மக்காச்சோள துரு நோய்', te: 'సాధారణ తుప్పు తెగులు', kn: 'ಸಾಮಾನ್ಯ ತುಕ್ಕು ರೋಗ' },
    'Chilli Leaf Curl & Anthracnose': { hi: 'मिर्च मरोड़िया व श्याम वर्ण रोग', ta: 'இலை சுருள் மற்றும் ஆந்த்ராக்னோஸ்', te: 'మిరప ఆకు ముడుత & ఆంత్రాక్నోస్', kn: 'ಮೆಣಸಿನಕಾಯಿ ಎಲೆ ಮುದುರು & ಆಂಥ್ರಾಕ್ನೋಸ್' },
    'Apple Scab': { hi: 'सेब का स्केब रोग', ta: 'ஆப்பிள் ஸ்கேப் நோய்', te: 'ఆపిల్ స్కాబ్ తెగులు', kn: 'ಸೇಬು ಸ್ಕ್ಯಾಬ್ ರೋಗ' }
  };
  return dict[diseaseName]?.[lang] || diseaseName;
}
