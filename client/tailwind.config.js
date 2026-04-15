/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'serif'],
      },
      colors: {
        bg: '#0a0a0f',
        surface: '#0f0f18',
        card: '#13131f',
        border: '#1e1e2e',
        text: '#e2e8f0',
        'text-dim': '#94a3b8',
        muted: '#475569',
        accent: '#00d4ff',
        accent2: '#7c3aed',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(0,212,255,0)' },
          '50%': { boxShadow: '0 0 20px rgba(0,212,255,0.4)' },
        },
      },
    },
  },
  plugins: [],
};
