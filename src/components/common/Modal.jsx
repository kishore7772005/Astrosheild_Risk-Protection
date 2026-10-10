import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, sideContent }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />
          <div className="relative flex items-center gap-8 pointer-events-none max-w-7xl w-full justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-xl bg-elevatedPanel border border-borderAccent rounded-lg shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-borderAccent">
                <h3 className="text-lg font-semibold text-mainText">{title}</h3>
                <button onClick={onClose} className="text-secondaryText hover:text-mainText">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
                {children}
              </div>
            </motion.div>
            
            {sideContent && (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
                className="hidden lg:block pointer-events-auto max-w-lg"
              >
                {sideContent}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}