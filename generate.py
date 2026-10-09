import os
import json

directories = [
    "src/routes",
    "src/layouts",
    "src/pages",
    "src/components/common",
    "src/components/dashboard",
    "src/data",
    "src/utils"
]

files = {
    "src/index.css": """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #080D16;
    color: #F0F4FA;
    font-family: 'Inter', sans-serif;
  }
}
""",
    "tailwind.config.js": """/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg: '#080D16',
        secondaryBg: '#0D1421',
        panelBg: '#111B2B',
        elevatedPanel: '#162236',
        borderAccent: '#25344A',
        mainText: '#F0F4FA',
        secondaryText: '#9AAAC0',
        cyanAccent: '#52D5E8',
        blueAccent: '#719BFF',
        greenSuccess: '#4DD4A1',
        amberWarning: '#F0BB61',
        redCritical: '#FF6F79',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
""",
    "src/main.jsx": """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
""",
    "src/App.jsx": """import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
""",
    "src/routes/AppRoutes.jsx": """import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AstroShieldDashboard from '../pages/AstroShieldDashboard'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AstroShieldDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
""",
    "src/pages/AstroShieldDashboard.jsx": """import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import HeroSection from '../components/dashboard/HeroSection'
import RiskMetricCards from '../components/dashboard/RiskMetricCards'
import PolicyComparisonTable from '../components/dashboard/PolicyComparisonTable'
import RecommendedEnhancement from '../components/dashboard/RecommendedEnhancement'
import StormRiskSimulator from '../components/dashboard/StormRiskSimulator'
import HistoricalLossChart from '../components/dashboard/HistoricalLossChart'
import EventProcessAccordion from '../components/dashboard/EventProcessAccordion'

export default function AstroShieldDashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        <section>
          <HeroSection />
          <RiskMetricCards />
        </section>
        
        <section>
          <PolicyComparisonTable />
          <RecommendedEnhancement />
        </section>

        <section>
          <StormRiskSimulator />
        </section>

        <section>
          <HistoricalLossChart />
        </section>

        <section>
          <EventProcessAccordion />
        </section>
      </div>
    </DashboardLayout>
  )
}
""",
    "src/pages/NotFound.jsx": """import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mainBg text-mainText">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <Link to="/" className="text-cyanAccent hover:underline">Return to Dashboard</Link>
      </div>
    </div>
  )
}
""",
    "src/layouts/DashboardLayout.jsx": """import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-mainBg flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-mainBg">
          {children}
        </main>
      </div>
    </div>
  )
}
""",
    "src/layouts/Sidebar.jsx": """import React from 'react'
import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-secondaryBg border-r border-borderAccent h-screen p-4">
      <Link to="/" className="flex items-center gap-3 mb-8">
        <Shield className="text-cyanAccent" size={32} />
        <span className="text-xl font-bold text-mainText tracking-wider">ASTROSHIELD</span>
      </Link>
      <nav className="flex-1 space-y-2">
        <Link to="/" className="block px-4 py-2 rounded bg-panelBg text-cyanAccent font-medium border border-borderAccent">
          Dashboard
        </Link>
      </nav>
      <div className="text-xs text-secondaryText mt-auto font-mono">
        v1.0.0-demo
      </div>
    </div>
  )
}
""",
    "src/layouts/Topbar.jsx": """import React from 'react'
import { Bell, User } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="h-16 bg-secondaryBg border-b border-borderAccent flex items-center justify-between px-6">
      <div className="text-sm font-mono text-secondaryText">MARITIME · AUTONOMOUS FLEET OPS</div>
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 text-xs font-bold bg-amberWarning/10 text-amberWarning border border-amberWarning/30 rounded">
          DEMO ENVIRONMENT
        </div>
        <button className="text-secondaryText hover:text-mainText"><Bell size={20} /></button>
        <button className="text-secondaryText hover:text-mainText"><User size={20} /></button>
      </div>
    </header>
  )
}
""",
    "src/utils/formatters.js": """export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value)
}

export const formatUSD = (value) => {
  return `$${value}M`
}
""",
    "src/utils/actuarialCalculations.js": """export function calculateTotalPremium(rows) {
  return rows.reduce((sum, row) => sum + row.existingPremium, 0);
}

export function calculateTotalReserve(rows) {
  return rows.reduce((sum, row) => sum + row.existingReserve, 0);
}

export function calculateModifiedPremium(rows) {
  return rows.reduce((sum, row) => sum + row.modifiedPremium, 0);
}

export function calculateModifiedReserve(rows) {
  return rows.reduce((sum, row) => sum + row.modifiedReserve, 0);
}

export function calculateTotalAddon(rows) {
  return rows.reduce((sum, row) => sum + row.addon, 0);
}

export function calculatePayout(dst, payoutTiers, sumInsured) {
  let payout = 0;
  for (const tier of payoutTiers) {
    if (dst <= tier.threshold) {
      payout = tier.payout;
    }
  }
  return Math.min(payout, sumInsured);
}

export function evaluateTriggerConditions(input) {
  const { dst, threshold, durationPassed, spaceOracleValid, groundOracleValid } = input;
  if (dst > threshold) return { eligible: false, reason: 'Below index threshold' };
  if (!durationPassed) return { eligible: false, reason: 'Duration requirement not met' };
  if (!spaceOracleValid) return { eligible: false, reason: 'Space Oracle unverifiable' };
  if (!groundOracleValid) return { eligible: false, reason: 'Ground Oracle unverifiable' };
  return { eligible: true, reason: 'All conditions satisfied' };
}
""",
    "src/data/cargoPolicyData.js": """export const cargoPolicyData = [
  { id: 1, cargoType: 'General Cargo', existingPremium: 10000, existingReserve: 3000, baselineDst: -48, modifiedPremium: 13500, modifiedReserve: 4050, addon: 3500 },
  { id: 2, cargoType: 'Container Cargo', existingPremium: 12000, existingReserve: 3600, baselineDst: -44, modifiedPremium: 15500, modifiedReserve: 4650, addon: 3500 },
  { id: 3, cargoType: 'Refrigerated Cargo', existingPremium: 15000, existingReserve: 4500, baselineDst: -48, modifiedPremium: 18500, modifiedReserve: 5550, addon: 3500 },
  { id: 4, cargoType: 'Bulk Cargo', existingPremium: 11000, existingReserve: 3300, baselineDst: -38, modifiedPremium: 14500, modifiedReserve: 4350, addon: 3500 },
  { id: 5, cargoType: 'High-Value Cargo', existingPremium: 20000, existingReserve: 6000, baselineDst: -35, modifiedPremium: 23500, modifiedReserve: 7050, addon: 3500 },
];
""",
    "src/data/stormData.js": """export const stormData = [
  {
    dst: -30,
    sliderVal: 0,
    topBadge: "NORMAL SPACE WEATHER",
    stormScale: "Quiet / Low Risk",
    color: "#22c55e",
    oracleStatus: "Monitoring Active",
    spaceOracle: { label: "MONITORING", variant: "neutral" },
    groundOracle: { label: "NORMAL", variant: "neutral" },
    payout: 0,
    description: "Geomagnetic activity is within the illustrative policy monitoring range."
  },
  {
    dst: -50,
    sliderVal: 1,
    topBadge: "LOW RISK LEVEL",
    stormScale: "Elevated Monitoring",
    color: "#14b8a6",
    oracleStatus: "Monitoring Active",
    spaceOracle: { label: "MONITORING", variant: "neutral" },
    groundOracle: { label: "NORMAL", variant: "neutral" },
    payout: 0,
    description: "The configured parametric threshold has not been reached."
  },
  {
    dst: -100,
    sliderVal: 2,
    topBadge: "PARAMETRIC THRESHOLD REACHED",
    stormScale: "Threshold Event",
    color: "#eab308",
    oracleStatus: "Pending Verification",
    spaceOracle: { label: "ELEVATED", variant: "warning" },
    groundOracle: { label: "CHECK REQUIRED", variant: "warning" },
    payout: 25000,
    description: "The configured Dst threshold has been reached. Eligibility remains subject to the policy's duration and verification requirements."
  },
  {
    dst: -150,
    sliderVal: 3,
    topBadge: "STRONG GEOMAGNETIC DISTURBANCE",
    stormScale: "Severe Activity",
    color: "#f97316",
    oracleStatus: "Pending Verification",
    spaceOracle: { label: "HIGH ALERT", variant: "warning" },
    groundOracle: { label: "SIGNAL CHECK", variant: "warning" },
    payout: 50000,
    description: "The modeled event qualifies for an intermediate payout tier, subject to the configured contract rules."
  },
  {
    dst: -200,
    sliderVal: 4,
    topBadge: "HIGH GEOMAGNETIC ACTIVITY",
    stormScale: "High-Severity Scenario",
    color: "#ef4444",
    oracleStatus: "Verification Required",
    spaceOracle: { label: "THRESHOLD BREACHED", variant: "danger" },
    groundOracle: { label: "VERIFICATION REQUIRED", variant: "danger" },
    payout: 100000,
    description: "The severe scenario activates a higher modeled payout tier. A Dst reading alone does not prove GNSS outage or authorize settlement."
  },
  {
    dst: -300,
    sliderVal: 5,
    topBadge: "EXTREME STORM SCENARIO",
    stormScale: "Extreme Scenario",
    color: "#a855f7",
    oracleStatus: "Verification Required",
    spaceOracle: { label: "CRITICAL", variant: "danger" },
    groundOracle: { label: "VERIFICATION REQUIRED", variant: "danger" },
    payout: 250000,
    description: "The extreme scenario reaches the maximum example payout. The final decision still depends on valid source data and the policy conditions."
  }
];
""",
    "src/data/historicalSolarData.js": """export const historicalSolarData = [
  { event: "Halloween 2003", physicalClaims: 70, uncompensatedDowntimeLoss: 1420 },
  { event: "Solar Storm 2013–14", physicalClaims: 0, uncompensatedDowntimeLoss: 320 },
  { event: "May Storm 2024", physicalClaims: 20, uncompensatedDowntimeLoss: 980 }
];
"""
}

for d in directories:
    os.makedirs(d, exist_ok=True)

for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("Files generated successfully!")
