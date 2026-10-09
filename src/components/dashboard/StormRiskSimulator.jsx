import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { stormData } from '../../data/stormData';
import { formatCurrency } from '../../utils/formatters';
import DualOracleEngine from './DualOracleEngine';
import { Activity } from 'lucide-react';

const payoutChartData = [
  { dst: 0, payout: 0 },
  { dst: -30, payout: 0 },
  { dst: -50, payout: 0 },
  { dst: -100, payout: 25000 },
  { dst: -150, payout: 50000 },
  { dst: -200, payout: 100000 },
  { dst: -300, payout: 250000 }
];

export default function StormRiskSimulator() {
  const [sliderVal, setSliderVal] = useState(0);
  const currentScenario = stormData.find(d => d.sliderVal === sliderVal);

  return (
    <div className="bg-mainBg border border-borderAccent rounded-lg p-6 shadow-xl w-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-3">
            <Activity className="text-cyanAccent" size={24} />
            <h2 className="text-2xl font-bold text-mainText">Risk Timeline – Dst Value vs Expected Payout</h2>
            <span className="px-3 py-1 bg-amberWarning/20 text-amberWarning text-xs font-bold rounded-full border border-amberWarning/30">
              Interactive Parametric Engine
            </span>
          </div>
          <p className="text-secondaryText mt-2">
            Move slider to simulate geomagnetic storm intensity and trigger 15-minute smart settlement
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario.sliderVal}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap"
            style={{ backgroundColor: `${currentScenario.color}20`, color: currentScenario.color, border: `1px solid ${currentScenario.color}40` }}
          >
            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: currentScenario.color }}></span>
            {currentScenario.topBadge}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-panelBg border border-borderAccent rounded-lg p-6 mt-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-secondaryText tracking-widest uppercase">GEOMAGNETIC INDEX (DST VALUE):</span>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentScenario.sliderVal}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-xl font-mono bg-elevatedPanel px-4 py-2 rounded text-mainText border border-borderAccent"
              >
                {currentScenario.dst} NT
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="text-sm text-secondaryText">
            NOAA Storm Scale: <strong style={{ color: currentScenario.color }}>{currentScenario.stormScale}</strong>
          </div>
        </div>

        <div className="relative pt-4 pb-8">
          <input 
            type="range" 
            min="0" 
            max="6" 
            value={sliderVal} 
            onChange={(e) => setSliderVal(parseInt(e.target.value))}
            className="w-full h-3 bg-secondaryBg rounded-lg appearance-none cursor-pointer accent-cyanAccent"
            style={{ zIndex: 10, position: 'relative' }}
          />
          <div className="relative mt-4 text-xs h-12 w-[calc(100%-16px)] mx-auto">
            {stormData.map((data, idx) => (
              <div 
                key={idx} 
                className="absolute flex flex-col items-center transform -translate-x-1/2" 
                style={{ 
                  left: `${(idx / 6) * 100}%`,
                  opacity: data.dst === 0 ? 0 : 1 
                }}
              >
                <span className="font-mono font-bold mb-1" style={{ color: data.color }}>{data.dst} nT</span>
                <span className="text-secondaryText opacity-70 text-center whitespace-nowrap scale-90">{data.stormScale.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={payoutChartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <XAxis dataKey="dst" reversed stroke="#25344A" tick={{ fill: '#9AAAC0', fontSize: 12 }} tickFormatter={(val) => `${val} nT`} />
              <YAxis 
                stroke="#25344A" 
                tick={{ fill: '#9AAAC0', fontSize: 12 }}
                tickFormatter={(val) => val === 0 ? '₹0k' : `₹${val/1000}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111B2B', borderColor: '#25344A', color: '#F0F4FA' }}
                itemStyle={{ color: '#52D5E8' }}
                formatter={(val) => [formatCurrency(val), 'Modeled Payout']}
                labelFormatter={(label) => `Dst: ${label} nT`}
              />
              <Line 
                type="monotone" 
                dataKey="payout" 
                stroke="#52D5E8" 
                strokeWidth={3}
                dot={{ r: 6, fill: '#52D5E8', stroke: '#080D16', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: currentScenario.color, stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="lg:w-[450px]">
          <DualOracleEngine currentScenario={currentScenario} />
        </div>
      </div>
    </div>
  );
}