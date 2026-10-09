/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg: '#080D16',
        secondaryBg: '#0D1421',
        panelBg: '#111B2B',
        elevatedPanel: '#162236',
        borderAccent: '#25344A',
        mainText: '#F0F4FA',
        secondaryText: '#9AAAC0',
        cyanAccent: '#52D5E8',
        blueAccent: '#719BFF',
        greenSuccess: '#4DD4A1',
        amberWarning: '#F0BB61',
        redCritical: '#FF6F79',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}