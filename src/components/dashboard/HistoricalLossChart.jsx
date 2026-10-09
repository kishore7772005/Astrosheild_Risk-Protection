import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { historicalSolarData } from '../../data/historicalSolarData';
import { formatUSD } from '../../utils/formatters';

export default function HistoricalLossChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-panelBg border border-borderAccent rounded-lg p-6 shadow-xl mt-16"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
          <h2 className="text-xl font-bold text-mainText mb-2">Historical Solar Events: Physical Claims vs. Downtime Loss Gap</h2>
          <p className="text-sm text-secondaryText max-w-2xl">
            The modeled comparison illustrates how operational interruption exposure may exceed the physical-damage component. Actual losses, insurance coverage, and historical claims require independent source verification.
          </p>
        </div>
        <div className="text-xs font-mono text-secondaryText mt-4 md:mt-0 whitespace-nowrap">
          Values in $ Millions (USD)
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={historicalSolarData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#25344A" vertical={false} />
            <XAxis dataKey="event" stroke="#9AAAC0" tick={{ fill: '#9AAAC0', fontSize: 12 }} />
            <YAxis 
              stroke="#9AAAC0" 
              tick={{ fill: '#9AAAC0', fontSize: 12 }}
              tickFormatter={(val) => `$${val}M`}
              domain={[0, 1500]}
            />
            <Tooltip 
              cursor={{ fill: '#162236' }}
              contentStyle={{ backgroundColor: '#111B2B', borderColor: '#25344A', color: '#F0F4FA', borderRadius: '8px' }}
              itemStyle={{ fontSize: '14px' }}
              formatter={(val) => [formatUSD(val), '']}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="physicalClaims" name="Physical Property Claims" fill="#818CF8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="uncompensatedDowntimeLoss" name="Uncompensated Downtime Loss" fill="#38BDF8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}