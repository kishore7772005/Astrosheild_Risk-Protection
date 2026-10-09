import React from 'react';

export default function SectionHeader({ title, subtitle, label, description }) {
  return (
    <div className="mb-8">
      {label && <div className="text-xs font-bold text-cyanAccent tracking-widest uppercase mb-2">{label}</div>}
      <h2 className="text-2xl font-bold text-mainText mb-2">{title}</h2>
      {subtitle && <h3 className="text-lg text-secondaryText mb-4">{subtitle}</h3>}
      {description && <p className="text-secondaryText max-w-3xl leading-relaxed">{description}</p>}
    </div>
  );
}