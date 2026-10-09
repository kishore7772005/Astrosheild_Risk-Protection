import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cargoPolicyData } from '../../data/cargoPolicyData';
import { calculateTotalPremium, calculateTotalReserve, calculateModifiedPremium, calculateModifiedReserve, calculateTotalAddon } from '../../utils/actuarialCalculations';
import { formatCurrency } from '../../utils/formatters';
import PolicyDetailsModal from './PolicyDetailsModal';

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
            </tr>
          </motion.tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => setModalOpen('existing')}
          className="flex-1 py-4 px-6 bg-panelBg border border-borderAccent rounded-lg text-mainText font-semibold hover:bg-elevatedPanel transition-colors text-center"
        >
          EXISTING POLICY
        </button>
        <button 
          onClick={() => setModalOpen('modified')}
          className="flex-1 py-4 px-6 bg-elevatedPanel border border-cyanAccent rounded-lg text-cyanAccent font-semibold shadow-[0_0_15px_rgba(82,213,232,0.1)] hover:shadow-[0_0_20px_rgba(82,213,232,0.2)] transition-all text-center"
        >
          EXISTING POLICY + ASTROSHIELD ADD-ON
        </button>
      </div>

      <PolicyDetailsModal type={modalOpen} onClose={() => setModalOpen(null)} totals={{ totalExistingPremium, totalExistingReserve, totalModifiedPremium, totalModifiedReserve, totalAddon }} />
    </div>
  );
}