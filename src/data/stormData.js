export const stormData = [
  {
    dst: 0,
    sliderVal: 0,
    topBadge: "IDEAL SPACE WEATHER (G0)",
    stormScale: "G0 (Baseline)",
    color: "#22c55e",
    oracleStatus: "Status: Monitoring Active",
    spaceOracle: { label: "MONITORING", variant: "neutral", desc: "Dst Index Trigger Threshold: ≤ -200 nT" },
    groundOracle: { label: "NORMAL", variant: "neutral", desc: "Ionospheric Scintillation & GNSS Outage" },
    payout: 0,
    description: "Perfect geomagnetic conditions. Maximum operational efficiency."
  },
  {
    dst: -30,
    sliderVal: 1,
    topBadge: "NORMAL SPACE WEATHER (G0)",
    stormScale: "G0 (Quiet)",
    color: "#4ade80", 
    oracleStatus: "Status: Monitoring Active",
    spaceOracle: { label: "MONITORING", variant: "neutral", desc: "Dst Index Trigger Threshold: ≤ -200 nT" },
    groundOracle: { label: "NORMAL", variant: "neutral", desc: "Ionospheric Scintillation & GNSS Outage" },
    payout: 0,
    description: "Geomagnetic activity within standard operational limits."
  },
  {
    dst: -50,
    sliderVal: 2,
    topBadge: "LOW RISK LEVEL",
    stormScale: "G0 (Low Risk)",
    color: "#14b8a6",
    oracleStatus: "Status: Monitoring Active",
    spaceOracle: { label: "MONITORING", variant: "neutral", desc: "Dst Index Trigger Threshold: ≤ -200 nT" },
    groundOracle: { label: "NORMAL", variant: "neutral", desc: "Ionospheric Scintillation & GNSS Outage" },
    payout: 0,
    description: "Minor magnetosphere fluctuations. Zero payout required."
  },
  {
    dst: -100,
    sliderVal: 3,
    topBadge: "MODERATE GEOMAGNETIC STORM (G1-G2)",
    stormScale: "G1/G2 Storm",
    color: "#eab308",
    oracleStatus: "Status: Partial Parametric Claim Triggered",
    spaceOracle: { label: "ELEVATED", variant: "warning", desc: "Dst Index Trigger Threshold: ≤ -200 nT" },
    groundOracle: { label: "MINOR SCINTILLATION", variant: "warning", desc: "Ionospheric Scintillation & GNSS Outage" },
    payout: 25000,
    description: "Minor GPS loss in coastal routes. Partial parametric payout unlocked."
  },
  {
    dst: -150,
    sliderVal: 4,
    topBadge: "STRONG GEOMAGNETIC STORM (G3)",
    stormScale: "G3 Strong Storm",
    color: "#f97316",
    oracleStatus: "Status: Partial Parametric Claim Triggered",
    spaceOracle: { label: "HIGH ALERT", variant: "warning", desc: "Dst Index Trigger Threshold: ≤ -200 nT" },
    groundOracle: { label: "SIGNAL DEGRADED", variant: "warning", desc: "Ionospheric Scintillation & GNSS Outage" },
    payout: 50000,
    description: "GNSS lock lost on vessel navigation. Intermediate claim activated."
  },
  {
    dst: -200,
    sliderVal: 5,
    topBadge: "HIGH RISK / SEVERE STORM (G4)",
    stormScale: "G4 Severe Storm",
    color: "#ef4444",
    oracleStatus: "Status: Smart Settlement Executed (<15 mins)",
    spaceOracle: { label: "TRIGGER BREACHED", variant: "danger", desc: "Dst Index Trigger Threshold: ≤ -200 nT" },
    groundOracle: { label: "GNSS OUTAGE CONFIRMED", variant: "danger", desc: "Ionospheric Scintillation & GNSS Outage" },
    payout: 100000,
    description: "Kyoto WDC Dst ≤ -200 nT threshold breached! Full payout triggered."
  },
  {
    dst: -300,
    sliderVal: 6,
    topBadge: "SUPERSTORM (G5)",
    stormScale: "G5 Superstorm",
    color: "#a855f7",
    oracleStatus: "Status: Smart Settlement Executed (<15 mins)",
    spaceOracle: { label: "CRITICAL BREACH", variant: "danger", desc: "Dst Index Trigger Threshold: ≤ -200 nT" },
    groundOracle: { label: "TOTAL GNSS BLACKOUT", variant: "danger", desc: "Ionospheric Scintillation & GNSS Outage" },
    payout: 250000,
    description: "Catastrophic space weather event. Maximum parametric payout disbursed."
  }
];