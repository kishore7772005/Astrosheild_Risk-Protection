import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cargoPolicyData } from '../../data/cargoPolicyData';
import { calculateTotalPremium, calculateTotalReserve, calculateModifiedPremium, calculateModifiedReserve, calculateTotalAddon } from '../../utils/actuarialCalculations';
import { formatCurrency } from '../../utils/formatters';
import PolicyDetailsModal from './PolicyDetailsModal';

// Hand pointer cursor with animated gliding 'come and click' motion matching user request
function HandClickIndicator({ theme = 'cyan', delay = 0 }) {
  const isCyan = theme === 'cyan';
  const ringColor = isCyan ? 'border-cyan-400 bg-cyan-400/30' : 'border-amber-400 bg-amber-400/30';
  const glowColor = isCyan ? 'rgba(82, 213, 232, 0.6)' : 'rgba(245, 158, 11, 0.6)';

  return (
    <div className="relative w-16 h-14 flex items-center justify-center select-none pointer-events-none">
      {/* Hand cursor traveling in to click */}
      <motion.div
        className="absolute"
        animate={{
          x: [18, 0, 0, -2, 0, 18],
          y: [16, 0, 0, 3, 0, 16],
          opacity: [0, 1, 1, 1, 1, 0],
          scale: [0.95, 1, 1, 0.82, 1, 0.95],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
          times: [0, 0.35, 0.5, 0.62, 0.74, 1]
        }}
      >
        <div className="relative">
          {/* Synchronized click ripple expanding on tap */}
          <motion.div
            className={`absolute -top-2 left-2 rounded-full border-2 ${ringColor}`}
            animate={{
              scale: [0, 0, 0.4, 2.2, 2.6, 0],
              opacity: [0, 0, 0.9, 0.5, 0, 0]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: delay,
              times: [0, 0.5, 0.6, 0.78, 0.9, 1]
            }}
            style={{ width: '28px', height: '28px', boxShadow: `0 0 14px ${glowColor}` }}
          />

          {/* Secondary flash dot at tip on contact */}
          <motion.span
            className="absolute top-0.5 left-4 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: isCyan ? '#52D5E8' : '#F59E0B' }}
            animate={{
              opacity: [0, 0, 1, 0, 0],
              scale: [0.5, 0.5, 1.8, 0.5, 0.5]
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: delay,
              times: [0, 0.55, 0.63, 0.75, 1]
            }}
          />

          {/* Classic Pointer Hand cursor */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] filter transform -rotate-6"
            fill="#ffffff"
            stroke="#090d16"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" fill="#ffffff" />
            <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" fill="#ffffff" />
            <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" fill="#ffffff" />
            <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" fill="#ffffff" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export default function PolicyComparisonTable() {
  const [modalOpen, setModalOpen] = useState(null);
  const totalExistingPremium = calculateTotalPremium(cargoPolicyData);
  const totalExistingReserve = calculateTotalReserve(cargoPolicyData);
  const totalModifiedPremium = calculateModifiedPremium(cargoPolicyData);
  const totalModifiedReserve = calculateModifiedReserve(cargoPolicyData);
  const totalAddon = calculateTotalAddon(cargoPolicyData);

  return (
    <div className="mb-8">
      <div className="mb-6">
        <div className="text-xs font-bold text-cyanAccent tracking-widest uppercase mb-2">MODELED ACTUARIAL BASELINE</div>
        <h2 className="text-2xl font-bold text-mainText mb-2">Actuarial Policy Comparison</h2>
        <h3 className="text-lg text-secondaryText mb-2">Actuarial breakdown across 5 coastal cargo categories</h3>
        <p className="text-secondaryText max-w-3xl">Compare existing policy premium and reserve assumptions with the modified policy that includes the AstroShield parametric add-on.</p>
      </div>

      <div className="overflow-x-auto custom-scrollbar border border-borderAccent rounded-lg mb-6 shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-elevatedPanel text-xs uppercase tracking-wider text-secondaryText border-b border-borderAccent">
              <th className="p-4 font-semibold">Cargo Type</th>
              <th className="p-4 font-semibold text-right">Existing Premium (₹)</th>
              <th className="p-4 font-semibold text-right">Existing Reserve (₹)</th>
              <th className="p-4 font-semibold text-right">Baseline Dst (nT)</th>
              <th className="p-4 font-semibold text-right text-cyanAccent">Modified Premium (₹)</th>
              <th className="p-4 font-semibold text-right text-cyanAccent">Modified Reserve (₹)</th>
              <th className="p-4 font-semibold text-right text-blueAccent">AstroShield Add-on (₹)</th>
              <th className="p-4 font-semibold text-right text-emerald-400">Loading Factor</th>
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {cargoPolicyData.map((row, i) => (
              <motion.tr 
                key={row.id} 
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className={`border-b border-borderAccent hover:bg-elevatedPanel/50 transition-colors ${i % 2 === 0 ? 'bg-panelBg' : 'bg-secondaryBg'}`}
              >
                <td className="p-4 font-medium text-mainText">{row.cargoType}</td>
                <td className="p-4 font-mono text-right text-secondaryText">{formatCurrency(row.existingPremium)}</td>
                <td className="p-4 font-mono text-right text-secondaryText">{formatCurrency(row.existingReserve)}</td>
                <td className="p-4 font-mono text-right text-secondaryText">{row.baselineDst}</td>
                <td className="p-4 font-mono text-right text-mainText">{formatCurrency(row.modifiedPremium)}</td>
                <td className="p-4 font-mono text-right text-mainText">{formatCurrency(row.modifiedReserve)}</td>
                <td className="p-4 font-mono text-right text-blueAccent">+{formatCurrency(row.addon)}</td>
                <td className="p-4 font-mono text-right text-emerald-400">0.2%</td>
              </motion.tr>
            ))}
            <tr className="bg-elevatedPanel border-t-2 border-borderAccent font-bold">
              <td className="p-4 text-mainText uppercase">TOTAL PORTFOLIO</td>
              <td className="p-4 font-mono text-right text-mainText">{formatCurrency(totalExistingPremium)}</td>
              <td className="p-4 font-mono text-right text-mainText">{formatCurrency(totalExistingReserve)}</td>
              <td className="p-4 font-mono text-right text-secondaryText">—</td>
              <td className="p-4 font-mono text-right text-cyanAccent">{formatCurrency(totalModifiedPremium)}</td>
              <td className="p-4 font-mono text-right text-cyanAccent">{formatCurrency(totalModifiedReserve)}</td>
              <td className="p-4 font-mono text-right text-blueAccent">{formatCurrency(totalAddon)}</td>
              <td className="p-4 font-mono text-right text-secondaryText">—</td>
            </tr>
          </motion.tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-5">
        <button 
          onClick={() => setModalOpen('existing')}
          className="flex-1 relative py-4 px-6 bg-panelBg border-2 rounded-xl text-mainText font-bold hover:bg-elevatedPanel transition-all duration-300 blink-box-amber group overflow-hidden cursor-pointer shadow-lg hover:shadow-amber-500/20"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-left flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <span className="tracking-wide text-base">EXISTING POLICY</span>
              </div>
              <span className="text-[11px] font-normal text-amber-300/90 tracking-wider uppercase block">
                Click to open baseline coverage breakdown modal
              </span>
            </div>
            
            {/* Hand indicator pointing and clicking */}
            <HandClickIndicator theme="amber" delay={0} />
          </div>
        </button>

        <button 
          onClick={() => setModalOpen('modified')}
          className="flex-1 relative py-4 px-6 bg-elevatedPanel border-2 rounded-xl text-cyanAccent font-bold transition-all duration-300 blink-box-cyan group overflow-hidden cursor-pointer shadow-lg hover:shadow-cyan-500/20"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-left flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyanAccent"></span>
                </span>
                <span className="tracking-wide text-base">EXISTING POLICY + ASTROSHIELD ADD-ON</span>
              </div>
              <span className="text-[11px] font-normal text-cyan-300/90 tracking-wider uppercase block">
                Click to open parametric add-on & trigger modal
              </span>
            </div>

            {/* Hand indicator pointing and clicking */}
            <HandClickIndicator theme="cyan" delay={0.8} />
          </div>
        </button>
      </div>

      <PolicyDetailsModal type={modalOpen} onClose={() => setModalOpen(null)} totals={{ totalExistingPremium, totalExistingReserve, totalModifiedPremium, totalModifiedReserve, totalAddon }} />
    </div>
  );
}