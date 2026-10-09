import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 1, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString().replace(/,/g, ''), 10);
    if (start === end) return;
    
    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;
    
    if(incrementTime < 1) incrementTime = 10;
    let step = end / (totalMilSecDur * 1000 / incrementTime);
    if(step < 1) step = 1;

    let timer = setInterval(() => {
      start += step;
      if(start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);

  const formattedCount = new Intl.NumberFormat('en-IN').format(count);

  return <span>{prefix}{formattedCount}{suffix}</span>;
}