import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const AstroShieldTitle = ({ text = "AstroShield", theme, sweepIndex, floatIntensity, isHovered }) => {
  const letters = useMemo(() => text.split(''), [text]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center select-none py-4 px-2">
      <div 
        className="absolute inset-0 filter blur-3xl opacity-75 rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${theme.glow} 0%, rgba(15, 23, 42, 0) 70%)`,
          transform: `scale(${isHovered ? 1.3 : 1.05})`
        }}
      />
      <motion.div 
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex items-center tracking-widest sm:tracking-[0.16em] uppercase z-10"
      >
        {letters.map((char, index) => {
          const distance = Math.abs(index - sweepIndex);
          const isDirectHit = distance < 0.6;
          const isNear = distance < 1.7;

          let blurValue = '0px';
          let scaleValue = 1;
          let glowStrength = 0;
          let textColor = '#ffffff';

          if (isDirectHit) {
            blurValue = '0.5px';
            scaleValue = 1.15;
            glowStrength = 2;
            textColor = '#ffffff';
          } else if (isNear) {
            blurValue = `${(1.7 - distance) * 2.2}px`;
            scaleValue = 1.04;
            glowStrength = 1.2;
            textColor = theme.accent;
          } else {
            blurValue = '0px';
            scaleValue = 1;
            textColor = index >= 5 ? theme.primary : '#f8fafc';
          }

          return (
            <motion.span
              key={index}
              variants={child}
              className="relative inline-block transition-all duration-150 font-black"
              style={{
                fontFamily: "'Orbitron', monospace, sans-serif",
                transform: `scale(${scaleValue}) translateY(${Math.sin(index + Date.now() * 0.003) * (floatIntensity * 1.5)}px)`,
                filter: `blur(${blurValue}) drop-shadow(0 0 ${10 * glowStrength}px ${theme.primary}) drop-shadow(0 0 ${25 * glowStrength}px ${theme.secondary})`,
                color: textColor,
                zIndex: isDirectHit ? 20 : 10,
              }}
            >
              {char}
              {isDirectHit && (
                <span 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ animation: 'flashSpark 0.4s ease-out' }}
                >
                  <span 
                    className="absolute w-[2px] h-[160%] -top-[30%] opacity-90"
                    style={{
                      background: `linear-gradient(to bottom, transparent, #fff, ${theme.primary}, transparent)`,
                      boxShadow: `0 0 12px ${theme.primary}`,
                    }}
                  />
                  <span 
                    className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-white shadow-lg animate-ping"
                    style={{ boxShadow: `0 0 8px ${theme.coreColor}` }}
                  />
                </span>
              )}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default function HeroSection({ activeTheme, mousePos, isHovered, setHovered }) {
  const [sweepIndex, setSweepIndex] = useState(0);
  const sweepSpeed = 1;

  useEffect(() => {
    const textLength = 11;
    const intervalMs = Math.max(16, 120 / sweepSpeed);

    const interval = setInterval(() => {
      setSweepIndex((prev) => {
        const next = prev + 0.14 * sweepSpeed;
        return next > textLength + 1 ? -1 : next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [sweepSpeed]);

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-[90vh] py-20"
      onMouseEnter={() => setHovered && setHovered(true)}
      onMouseLeave={() => setHovered && setHovered(false)}
    >
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-slate-700/60 bg-slate-900/60 backdrop-blur-md shadow-inner text-[10px] tracking-[0.25em] text-slate-400 uppercase font-mono"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>ACTUARIAL INTELLIGENCE PLATFORM</span>
          </motion.div>

          <div className="text-5xl sm:text-7xl md:text-8xl cursor-pointer">
            <AstroShieldTitle 
              text="AstroShield" 
              theme={activeTheme}
              sweepIndex={sweepIndex}
              floatIntensity={0.5}
              isHovered={isHovered}
            />
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-6 text-sm sm:text-base md:text-lg font-semibold tracking-[0.35em] sm:tracking-[0.5em] uppercase text-center text-slate-300 max-w-2xl transition-colors duration-500"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              textShadow: `0 0 16px ${activeTheme.glow}`
            }}
          >
            Space-Weather Risk Protection
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-4 text-center text-secondaryText max-w-2xl text-base z-10"
          >
            Compare conventional maritime insurance against a modified policy with parametric protection for geomagnetic-storm-related operational downtime.
          </motion.p>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center justify-center animate-bounce" 
        style={{ animationDuration: '2s' }}
      >
        <p className="text-[10px] tracking-widest uppercase text-slate-400 font-mono mb-2">
          Initialize Settlement Simulation
        </p>
        <div className="w-5 h-8 border-2 border-slate-500 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDuration: '1.5s' }} />
        </div>
      </motion.div>
    </div>
  );
}