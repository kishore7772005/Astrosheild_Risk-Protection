import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const steps = [
  { id: '01', title: 'Dst Value Drops', desc: 'Solar activity can intensify geomagnetic disturbances, which are tracked using the Kyoto WDC Dst index. The selected policy threshold is evaluated against the configured measurement window.' },
  { id: '02', title: 'GNSS Disruption Verification', desc: 'Ground GNSS or CORS station measurements may be used to assess navigation-signal degradation. A Dst threshold alone does not establish that a specific vessel or fleet experienced a GNSS outage.' },
  { id: '03', title: 'Trigger Evaluation', desc: 'The system evaluates the configured index threshold, event duration, source validity, and other contractual conditions. Failed verification results in a review or blocked decision rather than automatic authorization.' },
  { id: '04', title: 'Payout Calculation', desc: 'When all required policy conditions are satisfied, the engine calculates the predefined parametric payout and records the decision. The under-15-minute target is illustrative and depends on actual system integrations and operational controls.' },
];

export default function EventProcessAccordion() {
  const [openId, setOpenId] = useState('01');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mt-16 mb-24 max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-mainText mb-3">What Happens During a Space-Weather Event?</h2>
        <p className="text-secondaryText text-lg">From geomagnetic disturbance to a contract-defined payout decision.</p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => {
          const isOpen = openId === step.id;
          return (
            <div 
              key={step.id} 
              className={`border rounded-lg transition-colors overflow-hidden ${isOpen ? 'bg-elevatedPanel border-cyanAccent' : 'bg-panelBg border-borderAccent'}`}
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenId(isOpen ? null : step.id)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-xl ${isOpen ? 'text-cyanAccent' : 'text-secondaryText'}`}>{step.id}</span>
                  <span className={`font-semibold text-lg ${isOpen ? 'text-mainText' : 'text-secondaryText'}`}>{step.title}</span>
                </div>
                <ChevronDown 
                  className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyanAccent' : 'text-secondaryText'}`} 
                  size={20} 
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pt-2 ml-10 text-secondaryText leading-relaxed">
                      {step.desc}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}