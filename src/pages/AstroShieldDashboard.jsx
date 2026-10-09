import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import HeroSection from '../components/dashboard/HeroSection';
import RiskMetricCards from '../components/dashboard/RiskMetricCards';
import PolicyComparisonTable from '../components/dashboard/PolicyComparisonTable';
import RecommendedEnhancement from '../components/dashboard/RecommendedEnhancement';
import StormRiskSimulator from '../components/dashboard/StormRiskSimulator';
import HistoricalLossChart from '../components/dashboard/HistoricalLossChart';
import EventProcessAccordion from '../components/dashboard/EventProcessAccordion';
import { SpaceCanvas, THEMES } from '../components/common/SpaceBackground';

export default function AstroShieldDashboard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  
  const activeTheme = THEMES['cyan'];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  };

  return (
    <DashboardLayout>
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen w-full overflow-hidden"
      >
        <SpaceCanvas theme={activeTheme} speedMultiplier={0.5} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-24">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <HeroSection 
              activeTheme={activeTheme} 
              mousePos={mousePos} 
              isHovered={isHovered} 
              setHovered={setIsHovered} 
            />
          </motion.section>
          
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="bg-mainBg/80 backdrop-blur-md p-6 rounded-xl border border-borderAccent shadow-2xl"
          >
            <RiskMetricCards />
          </motion.section>
          
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="bg-mainBg/80 backdrop-blur-md p-6 rounded-xl border border-borderAccent shadow-2xl"
          >
            <PolicyComparisonTable />
            <RecommendedEnhancement />
          </motion.section>

          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="bg-mainBg/80 backdrop-blur-md p-6 rounded-xl border border-borderAccent shadow-2xl"
          >
            <StormRiskSimulator />
          </motion.section>

          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="bg-mainBg/80 backdrop-blur-md p-6 rounded-xl border border-borderAccent shadow-2xl"
          >
            <HistoricalLossChart />
          </motion.section>

          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="bg-mainBg/80 backdrop-blur-md p-6 rounded-xl border border-borderAccent shadow-2xl"
          >
            <EventProcessAccordion />
          </motion.section>
        </div>
      </div>
    </DashboardLayout>
  );
}