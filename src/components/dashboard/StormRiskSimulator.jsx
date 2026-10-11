import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot, CartesianGrid, Cell } from 'recharts';
import { stormData } from '../../data/stormData';
import { formatCurrency } from '../../utils/formatters';
import DualOracleEngine from './DualOracleEngine';
import { Activity, Play, Pause, RotateCcw } from 'lucide-react';

export default function StormRiskSimulator() {
  const [sliderVal, setSliderVal] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentScenario = stormData.find(d => d.sliderVal === sliderVal) || stormData[0];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSliderVal((prev) => {
        if (prev >= 6) {
          setIsPlaying(false);
          return 6;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayToggle = () => {
    if (sliderVal >= 6 && !isPlaying) {
      setSliderVal(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSliderVal(0);
  };

  // Synchronized chart data:
  // Starts at 0 when slider is 0; as slider increases, line & bar grow simultaneously
  const chartData = stormData.map((d, idx) => ({
    dst: d.dst,
    stormScale: d.stormScale,
    color: d.color,
    projectedPayout: d.payout,
    barPayout: idx <= sliderVal ? d.payout : 0,
    linePayout: idx <= sliderVal ? d.payout : null,
  }));

  return (
    <div className="bg-mainBg border border-borderAccent rounded-lg p-6 shadow-xl w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <div className="flex items-center gap-3">
            <Activity className="text-cyanAccent" size={24} />
            <h2 className="text-2xl font-bold text-mainText">Risk Timeline – Dst Value vs Expected Payout</h2>
            <span className="px-3 py-1 bg-amberWarning/20 text-amberWarning text-xs font-bold rounded-full border border-amberWarning/30">
              Interactive Parametric Engine
            </span>
          </div>
          <p className="text-secondaryText mt-2">
            Move slider or run simulation to track geomagnetic storm intensity and synchronized parametric payout
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayToggle}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              isPlaying
                ? 'bg-amberWarning/20 border-amberWarning text-amberWarning hover:bg-amberWarning/30'
                : 'bg-cyanAccent/10 border-cyanAccent/50 text-cyanAccent hover:bg-cyanAccent/20 shadow-[0_0_12px_rgba(82,213,232,0.25)]'
            }`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'Pause Simulation' : sliderVal === 6 ? 'Replay Simulation' : 'Play Timeline'}
          </button>
          
          <button
            onClick={handleReset}
            title="Reset to 0 nT baseline"
            className="p-2 rounded-lg bg-panelBg border border-borderAccent text-secondaryText hover:text-mainText hover:border-cyanAccent transition-all cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>

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
                {currentScenario.dst} nT
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-4 text-sm text-secondaryText">
            <span>Expected Payout: <strong className="text-cyanAccent font-mono">{formatCurrency(currentScenario.payout)}</strong></span>
            <span>•</span>
            <span>NOAA Storm Scale: <strong style={{ color: currentScenario.color }}>{currentScenario.stormScale}</strong></span>
          </div>
        </div>

        <div className="relative pt-4 pb-8">
          <input 
            type="range" 
            min="0" 
            max="6" 
            value={sliderVal} 
            onChange={(e) => {
              setIsPlaying(false);
              setSliderVal(parseInt(e.target.value));
            }}
            className="w-full h-3 bg-secondaryBg rounded-lg appearance-none cursor-pointer accent-cyanAccent"
            style={{ zIndex: 10, position: 'relative' }}
          />
          <div className="relative mt-4 text-xs h-12 w-[calc(100%-16px)] mx-auto">
            {stormData.map((data, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  setIsPlaying(false);
                  setSliderVal(idx);
                }}
                className="absolute flex flex-col items-center transform -translate-x-1/2 cursor-pointer transition-all hover:scale-105" 
                style={{ 
                  left: `${(idx / 6) * 100}%`,
                  opacity: idx <= sliderVal ? 1 : 0.65
                }}
              >
                <span className="font-mono font-bold mb-1" style={{ color: data.color }}>{data.dst} nT</span>
                <span className="text-secondaryText text-center whitespace-nowrap scale-90">{data.stormScale.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-h-[360px]">
          <div className="flex justify-between items-center mb-2 px-2 text-xs text-secondaryText">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-cyanAccent/70"></span>
                <span>Bar Volume (Simultaneous)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-0.5 bg-cyanAccent"></span>
                <span>Gradual Payout Line</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full border border-white" style={{ backgroundColor: currentScenario.color }}></span>
                <span>Pointer: {currentScenario.dst} nT ({formatCurrency(currentScenario.payout)})</span>
              </span>
            </div>
            <span className="font-mono text-cyanAccent/80">
              Timeline Step: {sliderVal} / 6
            </span>
          </div>

          <ResponsiveContainer width="100%" height={340}>
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="dst" 
                stroke="#25344A" 
                tick={{ fill: '#9AAAC0', fontSize: 12 }} 
                tickFormatter={(val) => `${val} nT`} 
              />
              <YAxis 
                domain={[0, 260000]}
                stroke="#25344A" 
                tick={{ fill: '#9AAAC0', fontSize: 12 }}
                tickFormatter={(val) => val === 0 ? '₹0' : `₹${val/1000}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111B2B', borderColor: '#25344A', color: '#F0F4FA', borderRadius: '8px' }}
                itemStyle={{ color: '#52D5E8' }}
                formatter={(val, name) => [formatCurrency(val || 0), name === 'linePayout' ? 'Payout Line' : 'Payout Bar Volume']}
                labelFormatter={(label) => `Dst Index: ${label} nT`}
              />
              
              {/* Reference guide path */}
              <Line 
                type="monotone" 
                dataKey="projectedPayout" 
                stroke="rgba(82, 213, 232, 0.18)" 
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={false}
              />

              {/* Bar graph increasing simultaneously with timeline */}
              <Bar 
                dataKey="barPayout" 
                radius={[6, 6, 0, 0]} 
                barSize={32}
                isAnimationActive={true}
                animationDuration={600}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index <= sliderVal && entry.barPayout > 0 ? entry.color : index <= sliderVal ? 'rgba(82, 213, 232, 0.2)' : 'rgba(37, 52, 74, 0.3)'} 
                  />
                ))}
              </Bar>

              {/* Line graph starting at zero and moving upward gradually */}
              <Line 
                type="monotone" 
                dataKey="linePayout" 
                stroke="#52D5E8" 
                strokeWidth={3.5}
                connectNulls={false}
                dot={{ r: 5, fill: '#52D5E8', stroke: '#080D16', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={600}
                animationEasing="ease-out"
              />

              {/* Graph pointer at current timeline step starting at zero */}
              <ReferenceDot 
                x={currentScenario.dst} 
                y={currentScenario.payout} 
                r={7} 
                fill={currentScenario.color} 
                stroke="#ffffff" 
                strokeWidth={2.5} 
                isFront={true}
              />
              <ReferenceDot 
                x={currentScenario.dst} 
                y={currentScenario.payout} 
                r={13} 
                fill="none" 
                stroke={currentScenario.color} 
                strokeWidth={1.5}
                strokeDasharray="3 3"
                isFront={true}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="lg:w-[450px]">
          <DualOracleEngine currentScenario={currentScenario} />
        </div>
      </div>
    </div>
  );
}