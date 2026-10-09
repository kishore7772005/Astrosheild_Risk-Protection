import React from 'react';

export default function StatusBadge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-panelBg text-secondaryText border-borderAccent',
    success: 'bg-greenSuccess/10 text-greenSuccess border-greenSuccess/30',
    warning: 'bg-amberWarning/10 text-amberWarning border-amberWarning/30',
    danger: 'bg-redCritical/10 text-redCritical border-redCritical/30',
    info: 'bg-cyanAccent/10 text-cyanAccent border-cyanAccent/30',
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded border ${variants[variant]}`}>
      {children}
    </span>
  );
}