/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // --- ADD THIS SECTION ---
      animation: {
        'border-pulse': 'border-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(6, 182, 212, 0.3)' }, // cyan-500/30
          '50%': { borderColor: 'rgba(6, 182, 212, 0.8)' }, // cyan-500/80
        }
      }
      // --- END ADDITION ---
    },
  },
  plugins: [],
}