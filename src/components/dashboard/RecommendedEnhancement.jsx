import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, TrendingUp, Settings, ActivitySquare } from 'lucide-react';

const cards = [
  { title: "Additional Risk Coverage", desc: "Covers eligible non-physical operational losses associated with qualifying space-weather events.", icon: ShieldAlert },
  { title: "Higher Expected Claims", desc: "The expanded coverage introduces potential parametric payouts during qualifying severe events.", icon: TrendingUp },
  { title: "Operating & Reinsurance", desc: "Accounts for additional monitoring, verification, operational processing, and reinsurance-related assumptions.", icon: Settings },
  { title: "Risk Margin", desc: "Provides an allowance intended to support the insurer's financial stability and uncertainty management.", icon: ActivitySquare },
];

export default function RecommendedEnhancement() {
  return (
    <div className="mt-16">
      <div className="mb-6">
        <div className="text-xs font-bold text-cyanAccent tracking-widest uppercase mb-2">RECOMMENDED ENHANCEMENT</div>
        <h2 className="text-xl font-bold text-mainText mb-1">Existing Policy + AstroShield Add-on</h2>
        <h3 className="text-secondaryText">Why the Increase?</h3>
      </div>
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {cards.map((c, i) => (
          <motion.div 
            key={i}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="bg-panelBg border border-borderAccent rounded-lg p-5 hover:bg-elevatedPanel transition-colors group"
          >
            <c.icon className="text-cyanAccent mb-4 opacity-70 group-hover:opacity-100 transition-opacity" size={24} />
            <h4 className="text-mainText font-semibold mb-2">{c.title}</h4>
            <p className="text-sm text-secondaryText leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}