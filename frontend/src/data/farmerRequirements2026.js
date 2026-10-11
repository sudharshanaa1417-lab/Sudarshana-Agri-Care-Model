// 2026 Smart Agriculture — In-Depth Requirements of Farmers
// Responding directly to 2026 agrarian challenges, technological needs, and policy mandates

export const FARMER_REQUIREMENTS_2026 = [
  {
    id: 'req-climate',
    title: 'Climate-Resilient Agriculture & Hyperlocal Weather AI',
    priority: 'CRITICAL',
    badgeColor: 'rose',
    icon: 'CloudSunRain',
    farmerChallenge: 'Frequent unseasonal downpours, 45°C+ summer heatwaves, delayed monsoons, and hailstorms ruin mature standing crops without warning.',
    techSolution2026: 'Hyperlocal 72-hour micro-weather prediction powered by regional satellite feeds and field sensor telemetry. Provides 6-hour advance alert before hailstorms or sudden downpours, advising farmers whether to spray foliar chemicals or delay harvest.',
    actionableAdvisory: [
      'Shift towards climate-smart, drought-tolerant seed varieties (e.g. IRRI Direct Seeded Rice DSR-150, ICAR DBW-327 Wheat).',
      'Follow automated sensor-based pre-storm drainage alerts to protect root zones from waterlogging.',
      'Apply bio-stimulants (seaweed extract + potassium silicate) 48 hours prior to anticipated heat spikes to prevent flower dropping.'
    ],
    metricImpact: 'Reduces weather-induced crop loss by up to 38%.'
  },
  {
    id: 'req-water',
    title: 'Autonomous Precision Irrigation & Groundwater Conservation',
    priority: 'HIGH PRIORITY',
    badgeColor: 'blue',
    icon: 'Droplets',
    farmerChallenge: 'Drastic depletion of groundwater tables (dropping 2–4 meters annually in Punjab, Haryana, Tamil Nadu, Karnataka) and surging diesel/electricity pumping costs.',
    techSolution2026: 'Smart ESP32 Soil Moisture closed-loop automation. Solenoid valves open automatically when root-zone moisture drops below 35% and shut off when optimal field capacity (65%) is reached, preventing both deep percolation loss and root asphyxiation.',
    actionableAdvisory: [
      'Replace flood furrow irrigation with sub-surface drip irrigation (SDI) with fertigation venture injection.',
      'Avail 45% to 55% central + state capital subsidy under Pradhan Mantri Krishi Sinchayee Yojana (PMKSY).',
      'Schedule automated irrigation cycles between 10:00 PM and 4:00 AM to eliminate midday evaporative losses.'
    ],
    metricImpact: 'Saves 42% irrigation water and cuts farm electricity bills by 30%.'
  },
  {
    id: 'req-carbon',
    title: 'Soil Organic Carbon Restoration & Carbon Credit Monetization',
    priority: 'EMERGING IN 2026',
    badgeColor: 'emerald',
    icon: 'Sprout',
    farmerChallenge: 'Depleted soil organic carbon (<0.4% SOC in most intensive cropping tracts), leading to fertilizer fatigue, declining response ratios, and soil compaction.',
    techSolution2026: 'Regenerative Agriculture certification with digital MRV (Measurement, Reporting, and Verification). Farmers practicing zero-tillage, residue mulching, and green manuring (Dhaincha/Sunhemp) can log field health and earn ₹1,200 to ₹2,000 per acre in verified carbon credits annually.',
    actionableAdvisory: [
      'Stop stubble burning; incorporate crop residues using Happy Seeder or Super Seeder implements.',
      'Apply 5 tons/acre well-decomposed FYM (Farm Yard Manure) enriched with Trichoderma viride and mycorrhiza.',
      'Intercrop with legumes (chickpea, moong, black gram) to naturally fix 40–60 kg atmospheric nitrogen per hectare.'
    ],
    metricImpact: 'Increases soil water holding capacity by 25% and yields supplemental income.'
  },
  {
    id: 'req-mandi',
    title: 'Real-Time APMC Mandi Price Intelligence & Direct-to-Consumer e-NAM',
    priority: 'HIGH PRIORITY',
    badgeColor: 'amber',
    icon: 'TrendingUp',
    farmerChallenge: 'Exploitation by local commission agents (Arhtiyas/middlemen), lack of price discovery, and distress selling at 30–50% below Minimum Support Price (MSP) during peak harvest gluts.',
    techSolution2026: 'AI-driven Mandi Price Forecasting across the top 50 neighboring APMC markets via e-NAM (National Agriculture Market). Alerts farmers which district market is offering the highest price for their crop grade on any given day, including cold-storage holding advisory.',
    actionableAdvisory: [
      'Check daily modal prices on e-NAM before dispatching trucks to local wholesale markets.',
      'Aggregate output through local FPOs (Farmer Producer Organizations) for bulk bargaining power with food processing companies.',
      'Utilize negotiable warehouse receipts (e-NWRs) to obtain low-interest 7% loans from banks while storing produce until prices peak.'
    ],
    metricImpact: 'Increases net farmer realization by 18% to 26% per quintal.'
  },
  {
    id: 'req-iot-hardware',
    title: 'Ultra-Affordable, Solar-Powered IoT Field Nodes',
    priority: 'TECH ADOPTION',
    badgeColor: 'purple',
    icon: 'Cpu',
    farmerChallenge: 'Commercial industrial IoT telemetry stations cost ₹30,000–₹80,000, requiring expensive SIM subscriptions and fragile sensors that fail during monsoon storms.',
    techSolution2026: 'Open-source ESP32 & LoRaWAN field nodes costing under ₹2,000 ($25). Powered by a small 5W solar panel and lithium-ion 18650 cell, measuring soil moisture, ambient humidity, temperature, and irrigation water TDS with zero recurring fees over farm Wi-Fi or mesh radio.',
    actionableAdvisory: [
      'Deploy IP65 weatherproof junction boxes mounted on 1.5m bamboo or PVC poles.',
      'Calibrate capacitive soil probes for regional soil texture (Clay, Sandy Loam, Red Soil).',
      'Use the Sudharshana Agri_Care Model dashboard for real-time telemetry streaming and automatic solenoid valve control.'
    ],
    metricImpact: 'Democratizes precision sensor monitoring to small & marginal farmers.'
  },
  {
    id: 'req-schemes',
    title: '2026 Government Subsidies & Direct Financial Assistance Portals',
    priority: 'GOVERNMENT SCHEMES',
    badgeColor: 'cyan',
    icon: 'Landmark',
    farmerChallenge: 'Complex paperwork, lack of awareness of state vs central subsidies, and missed deadlines for crop insurance or drone hire subsidies.',
    techSolution2026: 'Unified 1-click eligibility check and document generator for 2026 welfare schemes directly from the digital farmer dashboard.',
    schemesList: [
      {
        name: 'PM-Kisan Samman Nidhi (2026)',
        amount: '₹6,000 per year (3 equal installments of ₹2,000 directly via DBT to Aadhaar bank account).',
        eligibility: 'All landholding farmer families across India.',
        portal: 'pmkisan.gov.in'
      },
      {
        name: 'PM Krishi Sinchayee Yojana (PMKSY - Per Drop More Crop)',
        amount: '45% to 55% direct financial subsidy on Drip and Sprinkler irrigation equipment.',
        eligibility: 'Small & marginal farmers (0.5 to 2 hectares landholding).',
        portal: 'pmksy.gov.in'
      },
      {
        name: 'Soil Health Card Scheme (SHC 2026 Digital)',
        amount: 'Free soil testing & customized NPK-micronutrient fertilizer recommendation card every 2 years.',
        eligibility: 'All active agricultural land parcels.',
        portal: 'soilhealth.dac.gov.in'
      },
      {
        name: 'PM Fasal Bima Yojana (PMFBY 2026 Satellite Claims)',
        amount: 'Comprehensive crop insurance covering non-preventable natural risks (flood, drought, pests) with claim settlement within 14 days based on satellite and drone yield estimation.',
        eligibility: 'All notified crops and loanee/non-loanee farmers (Nominal 1.5% - 2% premium).',
        portal: 'pmfby.gov.in'
      },
      {
        name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
        amount: 'Up to 50% subsidy on purchase of tractors, solar water pumps, laser land levelers, and Kisan Drones.',
        eligibility: 'Individual farmers, Custom Hiring Centers (CHCs), and FPOs.',
        portal: 'agrimachinery.nic.in'
      }
    ],
    metricImpact: 'Ensures 100% subsidy claim capture without paying bribes or middleman fees.'
  },
  {
    id: 'req-vernacular-voice',
    title: 'Vernacular Audio-First Interface & Digital Literacy Bridge',
    priority: 'ACCESSIBILITY',
    badgeColor: 'teal',
    icon: 'Mic',
    farmerChallenge: 'Over 65% of smallholder farmers face difficulty reading dense English technical manuals or scientific disease names on small mobile screens.',
    techSolution2026: 'Voice-enabled AI advisory in regional languages (Hindi, Tamil, Telugu, Kannada, Marathi, Bengali). Farmers can speak or listen to prescription dosage instructions, eliminating literacy barriers and preventing hazardous pesticide over-dilution.',
    actionableAdvisory: [
      'Click the "Listen to Digital Advice" button in Sudharshana Agri_Care to hear the complete advisory.',
      'Show the digital prescription QR code at your local Krishi Seva Kendra for exact chemical dispensing.',
      'Access 24/7 Kisan Call Center assistance directly at toll-free 1800-180-1551.'
    ],
    metricImpact: '100% usability for non-literate and elder farmers.'
  }
];

export const MANDI_PRICES_2026_SAMPLE = [
  { crop: 'Paddy (Basmati)', mandi: 'Karnal, Haryana', modalPrice: '₹3,850 / Qtl', msp: '₹2,320 / Qtl', trend: '+4.2%' },
  { crop: 'Paddy (Common)', mandi: 'Thanjavur, Tamil Nadu', modalPrice: '₹2,380 / Qtl', msp: '₹2,300 / Qtl', trend: '+1.8%' },
  { crop: 'Tomato (Hybrid)', mandi: 'Kolar, Karnataka', modalPrice: '₹1,950 / Qtl', msp: 'Market Driven', trend: '-2.5%' },
  { crop: 'Potato (Jyoti)', mandi: 'Agra, Uttar Pradesh', modalPrice: '₹1,420 / Qtl', msp: 'Market Driven', trend: '+3.1%' },
  { crop: 'Wheat (Sharbati)', mandi: 'Sehore, Madhya Pradesh', modalPrice: '₹2,680 / Qtl', msp: '₹2,275 / Qtl', trend: '+2.4%' },
  { crop: 'Cotton (Medium Staple)', mandi: 'Warangal, Telangana', modalPrice: '₹7,520 / Qtl', msp: '₹7,121 / Qtl', trend: '+1.5%' },
  { crop: 'Maize (Hybrid)', mandi: 'Davanagere, Karnataka', modalPrice: '₹2,290 / Qtl', msp: '₹2,090 / Qtl', trend: '+0.9%' },
  { crop: 'Chilli (Guntur Sannam)', mandi: 'Guntur, Andhra Pradesh', modalPrice: '₹16,400 / Qtl', msp: 'Market Driven', trend: '+5.8%' }
];
