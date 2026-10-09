import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';
import { Network, Satellite, RadioTower } from 'lucide-react';

export default function DualOracleEngine({ currentScenario }) {
  const spaceColorClass = 
    currentScenario.spaceOracle.variant === 'warning' ? 'text-amberWarning border-amberWarning' : 
    currentScenario.spaceOracle.variant === 'danger' ? 'text-redCritical border-redCritical bg-redCritical/10' : 
    'text-secondaryText border-borderAccent';

  const groundColorClass = 
    currentScenario.groundOracle.variant === 'warning' ? 'text-amberWarning border-amberWarning' : 
    currentScenario.groundOracle.variant === 'danger' ? 'text-redCritical border-redCritical bg-redCritical/10' : 
    'text-secondaryText border-borderAccent';

  const statusColorClass = 
    currentScenario.dst <= -200 ? 'text-greenSuccess bg-greenSuccess/10 border-greenSuccess/30' :
    currentScenario.dst <= -100 ? 'text-amberWarning bg-amberWarning/10 border-amberWarning/30' :
    'text-secondaryText bg-secondaryBg border-borderAccent';

  return (
    <div className="bg-panelBg border border-borderAccent rounded-lg shadow-xl h-full flex flex-col p-6">
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Network className="text-cyanAccent" size={20} />
          <h3 className="text-sm font-bold text-mainText tracking-wider">DUAL-ORACLE SETTLEMENT ENGINE</h3>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario.sliderVal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`px-3 py-1 text-xs font-mono border rounded ${statusColorClass}`}
          >
            {currentScenario.oracleStatus}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="space-y-4 flex-1">
        <div className="bg-mainBg p-4 rounded border border-borderAccent flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Satellite className="text-secondaryText mt-1" size={20} />
            <div>
              <div className="text-sm font-bold text-mainText">1. Space Oracle (Kyoto WDC)</div>
              <div className="text-xs text-secondaryText mt-1">{currentScenario.spaceOracle.desc}</div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScenario.sliderVal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider border rounded ${spaceColorClass}`}
            >
              {currentScenario.spaceOracle.label}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="bg-mainBg p-4 rounded border border-borderAccent flex items-center justify-between">
          <div className="flex items-start gap-3">
            <RadioTower className="text-secondaryText mt-1" size={20} />
            <div>
              <div className="text-sm font-bold text-mainText">2. Ground Oracle (CORS RTK Network)</div>
              <div className="text-xs text-secondaryText mt-1">{currentScenario.groundOracle.desc}</div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScenario.sliderVal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider border rounded ${groundColorClass}`}
            >
              {currentScenario.groundOracle.label}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 bg-mainBg border border-borderAccent rounded-lg p-6 text-center">
        <div className="text-xs font-bold text-secondaryText tracking-widest uppercase mb-4">
          ESTIMATED PAYOUT PER POLICY
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario.sliderVal}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-4xl font-bold font-mono text-mainText mb-4"
          >
            {formatCurrency(currentScenario.payout)}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentScenario.sliderVal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-secondaryText max-w-sm mx-auto"
          >
            {currentScenario.description}
          </motion.p>
        </AnimatePresence>
      </div>

    </div>
  );
}