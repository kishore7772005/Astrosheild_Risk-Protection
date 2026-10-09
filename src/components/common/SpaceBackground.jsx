import React, { useRef, useEffect } from 'react';

export const THEMES = {
  cyan: {
    id: 'cyan',
    name: 'Cyan Nebula',
    primary: '#00f0ff',
    secondary: '#7000ff',
    accent: '#38bdf8',
    glow: 'rgba(0, 240, 255, 0.45)',
    ambientHsl: '185, 100%, 50%',
    gradient: 'from-cyan-400 via-sky-300 to-indigo-500',
    ringColor: '#00f0ff88',
    coreColor: '#38bdf8'
  }
};

export const SpaceCanvas = ({ theme, speedMultiplier = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create a network of data nodes
    const NODE_COUNT = Math.floor(Math.min(window.innerWidth / 15, 80));
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5 * speedMultiplier,
      vy: (Math.random() - 0.5) * 0.5 * speedMultiplier,
      size: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = (1 - dist / 150) * 0.2;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      ctx.fillStyle = theme.primary;
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a subtle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = theme.primary;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, speedMultiplier]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 bg-[#030712]" />;
};
