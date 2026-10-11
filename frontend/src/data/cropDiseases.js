// Comprehensive Database of Agricultural Crops, Diseases, Homemade Remedies, and Fertilizer Schedules
// Developed for Sudarshana Agri_Care Model (2026)

export const CROP_DISEASES = [
  {
    id: 'tomato-healthy',
    cropName: 'Tomato',
    cropLocal: 'टमाटर / தக்காளி / టమోటా',
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
      sprayTimesPerDay: 'Only 1 spray per application day (Never spray twice on the same day).',
      waterRatio: '3 grams per 1 Liter of water (approx. 600 grams per 200 Liters of water per acre).',
      precautions: 'Do not spray in bright midday sunlight or windy conditions. Keep soil moist prior to foliar feeding.'
    },
    voiceText: 'The Tomato crop is completely healthy with a 98% health score! No disease or pests detected. Continue optimal drip irrigation and apply preventive Neem oil spray once every 14 days to sustain healthy yield.'
  },
  {
    id: 'tomato-early-blight',
    cropName: 'Tomato',
    cropLocal: 'टमाटर / தக்காளி / టమోటా',
    scientificName: 'Solanum lycopersicum',
    status: 'affected',
    diseaseName: 'Early Blight',
    diseaseLocal: 'अगेती झुलसा (Early Blight) / ஆரம்பகால கருகல் நோய்',
    pathogen: 'Fungal (Alternaria solani)',
    severity: 'Moderate (42% Leaf Tissue Affected)',
    severityLevel: 'moderate',
    healthScore: 58,
    badgeColor: 'amber',
    imageType: 'tomato-early-blight',
    symptoms: 'Distinct concentric circular brown-black lesions with yellow chlorotic halos, resembling a target-board pattern on older lower leaves. Causes premature defoliation and sunken stem cankers.',
    environmentalCause: 'Warm temperatures (24°C–29°C) combined with high relative humidity (>80%) and frequent leaf wetness from rain or overhead sprinkling.',
    homemadeRemedies: [
      {
        name: 'Sour Buttermilk & Asafoetida (Hing) Antifungal Spray',
        ingredients: '5 Liters 5-day fermented sour buttermilk (chaas) + 50g powdered asafoetida (hing) + 100 Liters water.',
        preparation: 'Dissolve hing in warm water, combine with sour buttermilk, filter through a muslin cloth, and dilute to 100 liters for 1 acre.',
        benefits: 'Lactic acid and sulfurous compounds in hing severely inhibit Alternaria spore germination within 48 hours.'
      },
      {
        name: 'Baking Soda & Vegetable Oil Fungicidal Emulsion',
        ingredients: '10g Sodium Bicarbonate (Baking Soda) + 5ml Vegetable Oil + 2ml liquid soap + 1 Liter warm water.',
        preparation: 'Whisk oil and soap into warm water, add baking soda, shake well, and spray thoroughly on infected and neighboring leaves.',
        benefits: 'Alters leaf surface pH to alkaline, dehydrating fungal mycelium and arresting the spread of target spots.'
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
      frequency: 'Spray once every 7 days until new growth is free of lesions (usually 2 to 3 sprays).',
      timing: 'Early morning between 6:30 AM and 8:30 AM on dry leaves.',
      sprayTimesPerDay: 'Strictly 1 spray per day. Never apply twice on the same day.',
      waterRatio: '2.5 grams Mancozeb or 3 grams Copper Oxychloride per 1 Liter of water (500g to 600g per 200L water per acre).',
      precautions: 'Prune and destroy infected lower leaves touching the soil. Avoid overhead sprinklers. Pre-Harvest Interval (PHI): 7 days.'
    },
    voiceText: 'Warning: Tomato Early Blight fungal infection detected with 42% leaf severity. Spray Mancozeb at 2.5 grams per liter or use Sour Buttermilk and Hing remedy once every 7 days in the early morning. Prune affected lower leaves immediately.'
  },
  {
    id: 'tomato-late-blight',
    cropName: 'Tomato',
    cropLocal: 'टमाटर / தக்காளி / టమోటా',
    scientificName: 'Solanum lycopersicum',
    status: 'affected',
    diseaseName: 'Late Blight',
    diseaseLocal: 'पछेती झुलसा (Late Blight) / தாமதமான கருகல் நோய்',
    pathogen: 'Oomycete (Phytophthora infestans)',
    severity: 'High (68% Leaf Tissue Affected)',
    severityLevel: 'severe',
    healthScore: 32,
    badgeColor: 'rose',
    imageType: 'tomato-late-blight',
    symptoms: 'Rapidly expanding water-soaked greasy brown-black patches with white fuzzy fungal mold on the underside of leaves during humid mornings. Causes rapid vine collapse and brown rotting of green fruits within days.',
    environmentalCause: 'Cool wet weather (15°C–21°C) with persistent fog, dew, or humidity >90%.',
    homemadeRemedies: [
      {
        name: 'Garlic-Chilli-Cow Urine Bio-Fungicide Decoction',
        ingredients: '250g crushed garlic cloves + 250g green chillies + 2L aged cow urine + 15L water.',
        preparation: 'Grind garlic and chillies, steep in cow urine for 24 hours, strain through cloth, and dilute in 15L water.',
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
        name: 'Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold / Krilaxyl)',
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
      sprayTimesPerDay: '1 spray per day. Maximum 2 applications per season.',
      waterRatio: '2 grams Ridomil Gold per 1 Liter of clean water (400g per 200L water per acre).',
      precautions: 'Aggressive emergency condition! Do not wait. Avoid working in wet fields to prevent spore dispersion on clothing. Pre-Harvest Interval: 5 days.'
    },
    voiceText: 'Urgent Alert: Tomato Late Blight detected with 68% leaf damage. This is a severe threat. Spray Ridomil Gold at 2 grams per liter or apply Garlic-Cow Urine extract immediately once every 5 days. Ensure field drainage.'
  },
  {
    id: 'rice-healthy',
    cropName: 'Rice / Paddy',
    cropLocal: 'धान / நெல் / వరి (Rice)',
    scientificName: 'Oryza sativa',
    status: 'healthy',
    condition: 'Healthy Paddy Leaf — Clean Tillering Stage',
    healthScore: 97,
    badgeColor: 'emerald',
    imageType: 'rice-healthy',
    overview: 'Erect, deep-green linear leaves with pristine blade edges and active photosynthetic capacity. Tillering count and panicle initiation indicators are optimal.',
    healthyMaintenance: {
      irrigation: 'Maintain 2–3 cm shallow standing water during tillering, follow alternate wetting and drying (AWD) to save water.',
      preventiveBioSpray: 'Spray Trichoderma viride or Pseudomonas fluorescens (5g/L) at maximum tillering to build systemic acquired resistance.',
      nutrientPlan: 'Top-dress Nitrogen (Urea with neem coating) in 3 split doses (basal, active tillering, panicle initiation). Apply Zinc Sulphate 25kg/acre if soil is deficient.',
      soilCare: 'Incorporate blue-green algae or Azospirillum bio-fertilizers to fix atmospheric nitrogen naturally.'
    },
    homemadeRemedies: [
      {
        name: 'Panchagavya Organic Growth Elixir',
        ingredients: '300ml Panchagavya solution + 10L clean water.',
        preparation: 'Stir well, strain through fine mesh, and apply as foliar spray during panicle initiation.',
        benefits: 'Contains IAA, gibberellins, and beneficial mycorrhizae for heavy grain filling and pest resistance.'
      },
      {
        name: 'Fermented Rice Starch & Buttermilk Bio-Tonic',
        ingredients: '2L fermented cooked rice water + 1L buttermilk + 20L water.',
        preparation: 'Ferment for 48 hours in shade, dilute, and apply to paddy water inlet.',
        benefits: 'Enriches rhizosphere microflora and strengthens root silification.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Neem-Coated Urea (46% N) + MOP (60% K2O)',
        type: 'Basal / Split Macro-Nutrients',
        brands: 'IFFCO / KRIBHCO / NFL',
        targetRole: 'Provides balanced nitrogen for vigorous tillering and potassium for sturdy culm strength.'
      },
      {
        name: 'Zinc Sulphate Monohydrate (33% Zn)',
        type: 'Essential Micronutrient',
        brands: 'IFFCO Zinc / Aries Agro',
        targetRole: 'Prevents Khaira disease caused by zinc deficiency in calcareous and waterlogged paddy soils.'
      }
    ],
    dosageSchedule: {
      frequency: 'Split urea applications at 21 and 42 days after transplanting; bio-spray once every 15 days.',
      timing: 'Spray or broadcast in early morning after dew evaporates.',
      sprayTimesPerDay: '1 application per scheduled day.',
      waterRatio: 'Foliar sprays: 5 grams per 1 Liter; broadcast fertilizers: 45 kg Urea per acre per split.',
      precautions: 'Do not drain water immediately after applying urea. Keep field closed for 48 hours.'
    },
    voiceText: 'The Rice crop is vibrant and healthy with a 97% health score. Maintain alternate wetting and drying, apply split urea according to tillering stage, and spray Panchagavya once every 15 days for bumper grain harvest.'
  },
  {
    id: 'rice-bacterial-blight',
    cropName: 'Rice / Paddy',
    cropLocal: 'धान / நெல் / వరి (Rice)',
    scientificName: 'Oryza sativa',
    status: 'affected',
    diseaseName: 'Bacterial Leaf Blight (BLB)',
    diseaseLocal: 'जीवाणु पत्ती झुलसा (Bacterial Blight) / பாக்டீரியா இலை கருகல்',
    pathogen: 'Bacterial (Xanthomonas oryzae pv. oryzae)',
    severity: 'High (55% Leaf Area Affected)',
    severityLevel: 'severe',
    healthScore: 45,
    badgeColor: 'rose',
    imageType: 'rice-bacterial-blight',
    symptoms: 'Water-soaked translucent streaks starting from leaf tips and margins, progressing into wavy, straw-yellow to bleached white lesions. Amber-colored bacterial slime droplets visible on leaf surface in early morning dew.',
    environmentalCause: 'High humidity (>70%), temperature between 25°C–34°C, strong winds with rain, and excessive nitrogen fertilization.',
    homemadeRemedies: [
      {
        name: 'Fermented Cow Dung Slurry & Slaked Lime Supernatant',
        ingredients: '10kg fresh cow dung + 100g slaked lime (chuna) + 100L water.',
        preparation: 'Mix fresh cow dung in water, allow settling for 24 hours. Decant the clear amber supernatant liquid, add dissolved slaked lime, filter, and spray.',
        benefits: 'Provides antagonistic bacterial strains (Bacillus subtilis) and elevates pH to stop Xanthomonas multiplication.'
      },
      {
        name: 'Wild Tulsi (Holy Basil) & Garlic Antibacterial Extract',
        ingredients: '500g Tulsi leaves + 250g garlic cloves + 15L water.',
        preparation: 'Pound leaves and garlic, boil in 3L water for 20 minutes, cool, filter, and dilute to 15 liters.',
        benefits: 'Natural eugenol and allicin have strong proven bactericidal activity against Xanthomonas.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Plantomycin / Streptocycline (Streptomycin Sulphate 90% + Tetracycline 10%)',
        type: 'Agricultural Antibiotic / Bactericide',
        brands: 'Aries Plantomycin / Hindustan Antibiotics Streptocycline',
        targetRole: 'Systemic bactericide that directly eliminates bacterial cells inside vascular bundles.'
      },
      {
        name: 'Copper Oxychloride 50% WP (Blitox / Cupramar)',
        type: 'Contact Bactericidal Protectant',
        brands: 'Tata Blitox / Dhanuka',
        targetRole: 'Combined with Plantomycin to provide dual systemic and contact surface protection.'
      },
      {
        name: 'Muriate of Potash (MOP 0:0:60)',
        type: 'Immunity Fertilizer Supplement',
        brands: 'IFFCO MOP',
        targetRole: 'Temporarily stop all Nitrogen; apply 15kg/acre MOP to thicken leaf cell walls.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray immediately upon first symptom; repeat after 8 to 10 days if lesions advance.',
      timing: 'Spray in the morning between 7:00 AM and 9:00 AM.',
      sprayTimesPerDay: 'Strictly 1 spray per application day.',
      waterRatio: '6 grams Streptocycline (1 pouch) + 250 grams Copper Oxychloride per 150 Liters of water per acre.',
      precautions: 'CRITICAL: Immediately withhold all top-dress Urea/Nitrogen applications! Drain standing water and allow soil to aerate. Disinfect sickles and farm equipment.'
    },
    voiceText: 'Alert: Rice Bacterial Leaf Blight detected with 55% leaf damage. Immediately halt all urea nitrogen fertilizer. Spray Streptocycline at 6 grams plus Copper Oxychloride at 250 grams per 150 liters water per acre once every 8 days.'
  },
  {
    id: 'rice-brown-spot',
    cropName: 'Rice / Paddy',
    cropLocal: 'धान / நெல் / వரி (Rice)',
    scientificName: 'Oryza sativa',
    status: 'affected',
    diseaseName: 'Brown Spot',
    diseaseLocal: 'भूरा धब्बा रोग (Brown Spot) / பழுப்பு புள்ளி நோய்',
    pathogen: 'Fungal (Bipolaris oryzae / Helminthosporium oryzae)',
    severity: 'Moderate (36% Leaf Coverage)',
    severityLevel: 'moderate',
    healthScore: 64,
    badgeColor: 'amber',
    imageType: 'rice-brown-spot',
    symptoms: 'Small, oval to circular dark brown spots with a grey or whitish center and yellow margin scattered across the leaf blade. Highly associated with nutrient-deficient or water-stressed soils.',
    environmentalCause: 'Nutrient-exhausted sandy soils, potassium/silicon/zinc deficiency, and alternating dry-wet weather with temperatures between 25°C–30°C.',
    homemadeRemedies: [
      {
        name: 'Wood Ash & Fermented Cow Urine Foliar Wash',
        ingredients: '2kg filtered wood ash + 2L aged cow urine + 20L water.',
        preparation: 'Steep wood ash in water overnight, filter out particles, add cow urine, and spray.',
        benefits: 'Provides bio-available silica and potassium that physically fortifies the epidermis against fungal penetration.'
      },
      {
        name: 'Panchagavya with Neem Oil Emulsion',
        ingredients: '300ml Panchagavya + 30ml Neem oil + 10L water.',
        preparation: 'Emulsify with a drop of soap, spray on crop foliage.',
        benefits: 'Revitalizes depleted plant metabolism while restricting fungal proliferation.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Hexaconazole 5% SC (Contaf / Tata Taquat)',
        type: 'Systemic Triazole Fungicide',
        brands: 'Tata Contaf / Rallis / Dhanuka',
        targetRole: 'Inhibits fungal ergosterol synthesis, eradicating internal mycelia.'
      },
      {
        name: 'Mancozeb 75% WP + Micronutrient Zinc Booster',
        type: 'Contact Protective Fungicide',
        brands: 'Indofil M-45 + Zinc 12% EDTA',
        targetRole: 'Treats the underlying zinc deficiency while creating an anti-spore protective leaf shield.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray once every 10 to 12 days (maximum 2 applications).',
      timing: 'Morning or late afternoon on calm days.',
      sprayTimesPerDay: '1 spray per day.',
      waterRatio: '2 ml Hexaconazole 5% SC per 1 Liter of water (approx. 400ml per 200L water per acre).',
      precautions: 'Correction of soil fertility is essential. Apply balanced potash and zinc fertilizer to field.'
    },
    voiceText: 'Rice Brown Spot fungal disease identified with 36% leaf coverage. Spray Hexaconazole at 2ml per liter of water once every 10 days. Apply potassium and zinc fertilizers to restore depleted soil fertility.'
  },
  {
    id: 'potato-healthy',
    cropName: 'Potato',
    cropLocal: 'आलू / உருளைக்கிழங்கு / బంగాళాదుంప (Potato)',
    scientificName: 'Solanum tuberosum',
    status: 'healthy',
    condition: 'Healthy Potato Plant — Vigorous Tuber Bulking',
    healthScore: 99,
    badgeColor: 'emerald',
    imageType: 'potato-healthy',
    overview: 'Lush dark-green compound leaves, robust stem diameter, zero leaf curl, and active underground tuber enlargement.',
    healthyMaintenance: {
      irrigation: 'Uniform light irrigations at 5–7 day intervals. Stop watering 10 days before harvesting to harden tuber skin.',
      preventiveBioSpray: 'Prophylactic spray of Trichoderma viride (4g/L) or Neem oil (5ml/L) every 15 days.',
      nutrientPlan: 'Top-dress with Sulphate of Potash (0:0:50) at tuber bulking stage to maximize starch content and tuber size.',
      soilCare: 'Earthing up (hilling) around stems at 30 and 45 days after planting to prevent greening of tubers.'
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
      sprayTimesPerDay: '1 application per scheduled day.',
      waterRatio: '4 grams per 1 Liter of water.',
      precautions: 'Ensure proper soil earthing up to prevent sunlight exposure to growing tubers.'
    },
    voiceText: 'The Potato crop is in peak health with a 99% health score. Maintain uniform soil moisture without waterlogging, earth up the ridges, and apply potassium spray to support heavy tuber bulking.'
  },
  {
    id: 'potato-late-blight',
    cropName: 'Potato',
    cropLocal: 'आलू / உருளைக்கிழங்கு / బంగాళాదుంప (Potato)',
    scientificName: 'Solanum tuberosum',
    status: 'affected',
    diseaseName: 'Late Blight',
    diseaseLocal: 'आलू पछेती झुलसा (Potato Late Blight)',
    pathogen: 'Oomycete (Phytophthora infestans)',
    severity: 'High (62% Leaf Area Destroyed)',
    severityLevel: 'severe',
    healthScore: 38,
    badgeColor: 'rose',
    imageType: 'potato-late-blight',
    symptoms: 'Irregular dark water-soaked lesions that turn necrotic black rapidly, accompanied by white mildew growth on leaf undersides in morning fog. Emits a distinct decaying odor in infected fields.',
    environmentalCause: 'Prolonged cold, cloudy, damp weather with humidity exceeding 85% and temperatures around 12°C–20°C.',
    homemadeRemedies: [
      {
        name: 'Garlic-Chilli & Sour Buttermilk Anti-Oomycete Spray',
        ingredients: '500g crushed garlic + 250g green chillies + 5L sour buttermilk + 50L water.',
        preparation: 'Ferment crushed spices in buttermilk for 3 days, filter, and spray on entire crop canopy.',
        benefits: 'Allicin compounds rupture oomycete cell walls, halting rapid canopy blight.'
      },
      {
        name: 'Wood Ash & Agricultural Slaked Lime Dusting',
        ingredients: '5kg sifted dry wood ash + 1kg slaked lime.',
        preparation: 'Dust over moist foliage at dawn.',
        benefits: 'Dries out leaf moisture and creates hostile alkaline conditions for zoospores.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Cymoxanil 8% + Mancozeb 64% WP (Curzate / Sectin)',
        type: 'Curative + Preventive Oomycide',
        brands: 'Corteva Curzate / Bayer Sectin',
        targetRole: 'Penetrates leaf surface within 2 hours to halt active Phytophthora mycelium growth.'
      },
      {
        name: 'Dimethomorph 50% WP (Acrobat)',
        type: 'Oomycete Specialist',
        brands: 'BASF Acrobat',
        targetRole: 'Effective antisporulant preventing secondary field infection cycles.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray immediately upon detection; repeat after 6 days if foggy cold weather persists.',
      timing: 'Morning hours once leaf surface is free of dripping water.',
      sprayTimesPerDay: '1 spray per day. Maximum 2 consecutive applications of systemic chemical.',
      waterRatio: '2.5 grams Cymoxanil + Mancozeb per 1 Liter of water (500g per 200L water per acre).',
      precautions: 'Emergency protocol: Destroy severely blighted plants. Discontinue furrow flooding to lower field humidity. Pre-Harvest Interval: 7 days.'
    },
    voiceText: 'Critical Alert: Potato Late Blight fungal attack detected with 62% leaf damage. Spray Cymoxanil plus Mancozeb at 2.5 grams per liter immediately once every 6 days. Avoid evening irrigation to keep foliage dry.'
  },
  {
    id: 'wheat-healthy',
    cropName: 'Wheat',
    cropLocal: 'गेहूं / கோதுமை / గోధుమలు (Wheat)',
    scientificName: 'Triticum aestivum',
    status: 'healthy',
    condition: 'Healthy Wheat Crop — Active Booting / Heading',
    healthScore: 98,
    badgeColor: 'emerald',
    imageType: 'wheat-healthy',
    overview: 'Uniform emerald green erect flag leaves with healthy venation, strong tillers, and clean earheads free of rust pustules or smuts.',
    healthyMaintenance: {
      irrigation: 'Crucial irrigation stages: Crown Root Initiation (CRI at 21 days), Tillering (45 days), and Flowering/Milking (85 days). Avoid heavy irrigation during high winds to prevent lodging.',
      preventiveBioSpray: 'Spray Pseudomonas fluorescens (5g/L) during flag leaf emergence.',
      nutrientPlan: 'Top-dress Urea before 2nd irrigation. Foliar spray of Potassium Nitrate (13:0:45) at 1% concentration at booting stage.',
      soilCare: 'Ensure proper drainage; water stagnation damages wheat root aeration within 24 hours.'
    },
    homemadeRemedies: [
      {
        name: 'Jeevamrutha Bio-Nutrient Drench',
        ingredients: '10kg fresh cow dung + 10L cow urine + 2kg jaggery + 2kg pulse flour (besan) + handful of farm soil in 200L water.',
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
      sprayTimesPerDay: '1 application per day.',
      waterRatio: '10 grams per 1 Liter of water (2 kg per 200L water per acre).',
      precautions: 'Do not spray in frosty morning temperatures; wait for ambient warmth.'
    },
    voiceText: 'The Wheat crop is in prime healthy condition with a 98% health score. Maintain scheduled crown root irrigation and spray Potassium Nitrate at booting stage to ensure heavy grain development.'
  },
  {
    id: 'wheat-yellow-rust',
    cropName: 'Wheat',
    cropLocal: 'गेहूं / கோதுமை / గోధుమలు (Wheat)',
    scientificName: 'Triticum aestivum',
    status: 'affected',
    diseaseName: 'Yellow / Stripe Rust',
    diseaseLocal: 'पीला रतुआ (Yellow Rust) / மஞ்சள் துரு நோய்',
    pathogen: 'Fungal (Puccinia striiformis f. sp. tritici)',
    severity: 'Severe (70% Flag Leaf Coverage)',
    severityLevel: 'severe',
    healthScore: 30,
    badgeColor: 'rose',
    imageType: 'wheat-yellow-rust',
    symptoms: 'Parallel linear stripes of bright yellow-orange powdery pustules along leaf veins. When touched, yellow rust spores transfer onto farmer fingers or clothing like yellow turmeric powder.',
    environmentalCause: 'Cool temperatures (10°C–15°C) coupled with high humidity, night dew, and cloudy misty weather in Northern India wheat belts.',
    homemadeRemedies: [
      {
        name: 'Sour Buttermilk & Fermented Garlic-Cow Urine Spray',
        ingredients: '5L 5-day fermented sour buttermilk + 500g crushed garlic + 5L aged cow urine + 100L water.',
        preparation: 'Mix in barrel, leave for 24 hours, filter through fine mesh, spray over 1 acre.',
        benefits: 'Sulfur in garlic and lactic acid in buttermilk suppress Puccinia urediniospore germination.'
      },
      {
        name: 'Wood Ash & Sulfur Dusting',
        ingredients: '10kg finely sieved wood ash + 1kg wettable sulfur powder.',
        preparation: 'Dust evenly over moist wheat canopy at dawn.',
        benefits: 'Forms an inhospitable barrier that halts airborne spore deposition.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Propiconazole 25% EC (Tilt / Bumper / Result)',
        type: 'Systemic Triazole Specialty Fungicide',
        brands: 'Syngenta Tilt / Rallis / Dhanuka',
        targetRole: 'Gold standard fungicide for Yellow Rust; instantly halts fungal ergosterol synthesis.'
      },
      {
        name: 'Tebuconazole 25.9% EC (Folicur)',
        type: 'Broad-Spectrum Rust Eraser',
        brands: 'Bayer Folicur / Crystal',
        targetRole: 'Curative and translaminar systemic protection against virulent stripe rust races.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray immediately upon spotting yellow powder. Repeat after 12 to 14 days if rust persists.',
      timing: 'Clear morning after dew evaporates.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '1 ml Propiconazole 25% EC per 1 Liter of clean water (200 ml per 200 Liters of water per acre).',
      precautions: 'Urgent notification: Alert neighboring farmers as yellow rust spores travel miles on wind. Do not walk through wet infected fields.'
    },
    voiceText: 'Severe Alert: Wheat Yellow Rust detected with 70% flag leaf infestation. Yellow spores are actively spreading. Spray Propiconazole 25% EC at 1ml per liter of water immediately once every 12 days to safeguard grain yield.'
  },
  {
    id: 'cotton-leaf-curl',
    cropName: 'Cotton',
    cropLocal: 'कपास / பருத்தி / పత్తి (Cotton)',
    scientificName: 'Gossypium hirsutum',
    status: 'affected',
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    diseaseLocal: 'कपास पत्ती मरोड़ रोग (Leaf Curl Virus) / இலை சுருள் வைரஸ்',
    pathogen: 'Viral (Begomovirus) transmitted by Whitefly (Bemisia tabaci)',
    severity: 'Moderate (48% Canopy Curling)',
    severityLevel: 'moderate',
    healthScore: 52,
    badgeColor: 'amber',
    imageType: 'cotton-leaf-curl',
    symptoms: 'Upward or downward curling of leaf margins, severe thickening of veins on the underside, and formation of leaf-like enations (outgrowths). Plants become stunted with suppressed boll formation.',
    environmentalCause: 'High whitefly insect population during warm dry spells (30°C–38°C) that actively transmit the Begomovirus.',
    homemadeRemedies: [
      {
        name: 'Neem-Karanj-Garlic Botanical Insecticidal Wash',
        ingredients: '500ml cold-pressed Neem oil + 500ml Karanj oil + 250g crushed garlic + 50g soap in 100L water.',
        preparation: 'Blend oils with soap solution until milky white emulsion forms. Spray on underside of leaves.',
        benefits: 'Suffocates whitefly nymphs and adults, terminating the viral transmission cycle at zero residue.'
      },
      {
        name: 'Yellow Sticky Traps in Field',
        ingredients: 'Yellow plastic sheets coated with castor oil or grease.',
        preparation: 'Install 12 yellow sticky traps per acre at crop canopy height.',
        benefits: 'Physically catches thousands of vector whiteflies daily without chemical cost.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Diafenthiuron 50% WP (Pegasus / Tata Polo)',
        type: 'Insecticide for Whitefly Control',
        brands: 'Syngenta Pegasus / Tata Polo / Dhanuka',
        targetRole: 'Rapidly eliminates adult and nymph whiteflies transmitting the virus.'
      },
      {
        name: 'Potassium Nitrate (13:0:45) + Zinc 12% EDTA Booster',
        type: 'Cellular Recovery Foliar Spray',
        brands: 'IFFCO / Aries Agro',
        targetRole: 'Helps unaffected shoots recover metabolic vigour and retain square/boll formation.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray for whitefly vector control once every 7 to 10 days until pest population drops below threshold.',
      timing: 'Late afternoon (after 4:00 PM) when whiteflies are most settled on leaf undersides.',
      sprayTimesPerDay: '1 spray per day.',
      waterRatio: '1.25 grams Diafenthiuron per 1 Liter of water (250g per 200L water per acre).',
      precautions: 'Direct spray nozzle towards the undersides of leaves where whiteflies colonize. Eradicate alternative weed hosts along field boundaries.'
    },
    voiceText: 'Cotton Leaf Curl Virus identified with 48% leaf curling. The virus is spread by whiteflies. Install yellow sticky traps and spray Diafenthiuron or Neem-Karanj oil emulsion once every 7 days on leaf undersides to eliminate whiteflies.'
  },
  {
    id: 'corn-rust',
    cropName: 'Corn / Maize',
    cropLocal: 'मक्का / சோளம் / మొక్కజొన్న (Corn)',
    scientificName: 'Zea mays',
    status: 'affected',
    diseaseName: 'Common Rust',
    diseaseLocal: 'मक्का सामान्य रतुआ (Corn Rust) / மக்காச்சோள துரு நோய்',
    pathogen: 'Fungal (Puccinia sorghi)',
    severity: 'Moderate (40% Leaf Coverage)',
    severityLevel: 'moderate',
    healthScore: 60,
    badgeColor: 'amber',
    imageType: 'corn-rust',
    symptoms: 'Small, circular to elongated cinnamon-brown powdery pustules scattered across both upper and lower leaf surfaces. Pustules rupture the epidermis, releasing brownish spores.',
    environmentalCause: 'Moderate temperatures (16°C–25°C) with high relative humidity (>95%) and extended dew periods.',
    homemadeRemedies: [
      {
        name: 'Sour Buttermilk & Fermented Cow Urine Foliar Spray',
        ingredients: '5L sour buttermilk + 5L cow urine + 100L water.',
        preparation: 'Ferment for 4 days, filter, and spray on canopy.',
        benefits: 'Lactic acid creates a protective surface film that prevents Puccinia spore penetration.'
      },
      {
        name: 'Baking Soda Antifungal Wash',
        ingredients: '15g Sodium Bicarbonate + 5ml vegetable oil + 1L water.',
        preparation: 'Shake into emulsion and spray on corn leaves.',
        benefits: 'Alters leaf surface pH to suppress active pustule rupture.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top)',
        type: 'Broad-Spectrum Systemic Strobilurin + Triazole',
        brands: 'Syngenta Amistar Top / Godrej',
        targetRole: 'Provides robust preventive and curative control, keeping leaves green for grain filling.'
      },
      {
        name: 'Mancozeb 75% WP (Indofil M-45)',
        type: 'Contact Protective Fungicide',
        brands: 'Indofil M-45',
        targetRole: 'Cost-effective contact protectant for secondary spore suppression.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray once every 10 days (1 to 2 applications during tasseling stage).',
      timing: 'Morning hours.',
      sprayTimesPerDay: '1 spray per day.',
      waterRatio: '1 ml Amistar Top per 1 Liter of water (200 ml per 200L water per acre).',
      precautions: 'Protect the ear leaves and leaves above the ear, which contribute 80% to grain filling.'
    },
    voiceText: 'Corn Common Rust detected with 40% leaf coverage. Spray Amistar Top at 1ml per liter or use sour buttermilk spray once every 10 days to protect ear leaves during grain filling.'
  },
  {
    id: 'chilli-leaf-curl',
    cropName: 'Chilli / Pepper',
    cropLocal: 'मिर्च / மிளகாய் / మిరపకాయ (Chilli)',
    scientificName: 'Capsicum annuum',
    status: 'affected',
    diseaseName: 'Chilli Leaf Curl & Anthracnose',
    diseaseLocal: 'मिर्च मरोड़िया व श्याम वर्ण रोग / இலை சுருள் நோய்',
    pathogen: 'Complex Viral (Gemini Virus) + Fungal (Colletotrichum capsici)',
    severity: 'High (58% Foliage Affected)',
    severityLevel: 'severe',
    healthScore: 42,
    badgeColor: 'rose',
    imageType: 'chilli-leaf-curl',
    symptoms: 'Upward boat-shaped curling of leaves, crinkling, reduced leaf size with thickened veins, along with sunken circular lesions on maturing pods (anthracnose die-back).',
    environmentalCause: 'Heavy infestation of thrips and mites during hot dry spells, followed by high humidity during fruit set.',
    homemadeRemedies: [
      {
        name: 'Sour Buttermilk & Hing Antiviral Tonic (Chaas + Hing)',
        ingredients: '5L fermented sour buttermilk + 50g asafoetida (hing) + 100L water.',
        preparation: 'Dissolve hing in warm water, combine with sour buttermilk, dilute to 100L, and spray weekly.',
        benefits: 'One of the most trusted traditional Indian farmer remedies to relax leaf curling and boost plant enzymes.'
      },
      {
        name: 'Neem-Karanj Oil & Garlic Extract Emulsion',
        ingredients: '50ml Neem oil + 50ml Karanj oil + 100g garlic paste + 10L water.',
        preparation: 'Emulsify with 5ml liquid soap and spray on both leaf surfaces.',
        benefits: 'Controls thrips, whiteflies, and yellow mites which transmit the leaf curl virus.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Fipronil 5% SC (Regent / Prince)',
        type: 'Systemic Thripicide & Sucking Pest Controller',
        brands: 'Bayer Regent / Dhanuka / Rallis',
        targetRole: 'Eliminates vector thrips causing leaf curling.'
      },
      {
        name: 'Azoxystrobin 11% + Tebuconazole 18.3% SC (Custodia)',
        type: 'Anthracnose & Fruit Rot Specialist',
        brands: 'Adama Custodia / Syngenta',
        targetRole: 'Controls fruit rot lesions and protects emerging blooms.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray once every 7 to 8 days (total 2 to 3 sprays).',
      timing: 'Late afternoon after 4:30 PM.',
      sprayTimesPerDay: 'Strictly 1 spray per day.',
      waterRatio: '2 ml Fipronil + 1.5 ml Custodia per 1 Liter of water (300ml to 400ml per 200L water per acre).',
      precautions: 'Install blue sticky traps for thrips and yellow traps for whiteflies. Pre-Harvest Interval: 7 days.'
    },
    voiceText: 'Chilli Leaf Curl and Anthracnose detected with 58% foliage damage. Vector thrips and mites are active. Spray Fipronil at 2ml per liter or apply Sour Buttermilk with Hing once every 7 days in late afternoon.'
  },
  {
    id: 'apple-scab',
    cropName: 'Apple',
    cropLocal: 'सेब / ஆப்பிள் / ఆపిల్ (Apple)',
    scientificName: 'Malus domestica',
    status: 'affected',
    diseaseName: 'Apple Scab',
    diseaseLocal: 'सेब का स्केब रोग (Apple Scab)',
    pathogen: 'Fungal (Venturia inaequalis)',
    severity: 'Moderate (44% Leaf & Fruit Spotting)',
    severityLevel: 'moderate',
    healthScore: 56,
    badgeColor: 'amber',
    imageType: 'apple-scab',
    symptoms: 'Velvety olive-green to dull black spots with feathery edges on leaves, later becoming corky and raised on developing apple fruits.',
    environmentalCause: 'Cool wet spring weather with prolonged leaf wetness periods (>9 hours at 15°C–20°C).',
    homemadeRemedies: [
      {
        name: 'Baking Soda & Potassium Bicarbonate Foliar Wash',
        ingredients: '20g Potassium Bicarbonate + 5ml horticultural oil + 1L water.',
        preparation: 'Mix thoroughly and spray across canopy.',
        benefits: 'Alters leaf surface pH and halts spore penetration naturally.'
      },
      {
        name: 'Fermented Horsetail / Compost Tea',
        ingredients: '1kg wild horsetail herb steeped in 10L water for 10 days.',
        preparation: 'Filter and spray at 1:5 dilution.',
        benefits: 'Extremely rich in bio-available silica that hardens cuticle against scab hyphae.'
      }
    ],
    fertilizersMedicines: [
      {
        name: 'Difenoconazole 25% EC (Score / Tata Diffen)',
        type: 'Curative Triazole Specialist',
        brands: 'Syngenta Score / Tata',
        targetRole: 'Penetrates leaf cuticle to eliminate incubating scab fungus.'
      },
      {
        name: 'Dodine 65% WP (Ventura)',
        type: 'High Efficacy Protective & Eradicant Fungicide',
        brands: 'Indofil Ventura',
        targetRole: 'High performance during critical pink-bud and petal-fall stages.'
      }
    ],
    dosageSchedule: {
      frequency: 'Spray once every 10 to 12 days during rainy periods.',
      timing: 'Morning hours on dry foliage.',
      sprayTimesPerDay: '1 spray per day.',
      waterRatio: '0.5 ml Score per 1 Liter of water (100ml per 200L water per acre).',
      precautions: 'Prune dense orchard canopy to maximize air circulation. Rake and compost fallen leaves.'
    },
    voiceText: 'Apple Scab fungal infection detected with 44% leaf spotting. Spray Difenoconazole at 0.5ml per liter once every 10 days during wet periods. Ensure canopy pruning to improve airflow.'
  }
];
