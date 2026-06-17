/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: { center: true, padding: '1.25rem', screens: { '2xl': '1320px' } },
    extend: {
      colors: {
        cream: '#F5E6D3',
        ink: '#1A1A1A',
        gold: '#C9A227',
        sand: '#EFE3D2',
        champagne: '#F9F2E8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(26,26,26,0.18)',
        glass: '0 8px 32px rgba(26,26,26,0.08)',
        lift: '0 24px 60px -20px rgba(26,26,26,0.35)',
      },
      backdropBlur: { xs: '2px' },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [],
}
