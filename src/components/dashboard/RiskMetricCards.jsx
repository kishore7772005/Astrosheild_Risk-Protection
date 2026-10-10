import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, Activity, Timer, Ship } from 'lucide-react';
import AnimatedCounter from '../common/AnimatedCounter';

const cards = [
  { label: 'TARGET', value: 'Maritime Cargo', prefix: '', suffix: '', text: 'Autonomous Fleet Ops', icon: Ship, isString: true },
  { label: 'INDEX TRIGGER', value: '-100', prefix: 'Dst ≤ ', suffix: ' nT', text: 'Geomagnetic Index', icon: Activity, isString: true },
  { label: 'ASTROSHIELD PREMIUM', value: '17500', prefix: '₹', suffix: '', text: 'Add-on cover cost', icon: ShieldCheck },
  { label: 'ASTROSHIELD RESERVE', value: '5250', prefix: '₹', suffix: '', text: 'Additional tail reserve', icon: Database },
  { label: 'SETTLEMENT TIME', value: '15', prefix: '< ', suffix: ' Mins', text: 'Zero-Claim Verification', icon: Timer, isString: true },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function RiskMetricCards() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      {cards.map((c, i) => (
        <motion.div key={i} variants={item} className="bg-panelBg border border-borderAccent rounded-lg p-6 relative overflow-hidden group hover:border-cyanAccent/50 transition-colors flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyanAccent/20 transform -translate-y-full group-hover:translate-y-0 transition-transform"></div>
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs font-bold text-secondaryText tracking-wider">{c.label}</div>
              <c.icon className="text-cyanAccent" size={20} />
            </div>
            <div className="text-2xl lg:text-xl xl:text-3xl font-mono text-mainText mb-2 break-words leading-tight">
              {c.prefix}
              {c.isString ? c.value : <AnimatedCounter value={c.value} duration={1.5} />}
              {c.suffix}
            </div>
          </div>
          <div className="text-sm text-secondaryText mt-2">{c.text}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}