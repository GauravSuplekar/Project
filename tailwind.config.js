/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0A66C2',
          dark: '#004182',
          light: '#8AB4F8',
          hover: '#003270',
        },
        surface: '#F3F6F9',
        muted: '#5B7083',
      },
      fontFamily: {
        sans: ['LakesNeueRegular', 'system-ui', 'sans-serif'],
        heading: ['LakesNeueDemiBold', 'LakesNeueRegular', 'sans-serif'],
        LakesNeueRegular: ['LakesNeueRegular', 'system-ui', 'sans-serif'],
        LakesNeueDemiBold: ['LakesNeueDemiBold', 'system-ui', 'sans-serif'],
        TypewcondRegular: ['LakesNeueRegular', 'system-ui', 'sans-serif'],
        CinzelRegular: ['LakesNeueDemiBold', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 12px 34px rgba(10, 102, 194, 0.14)',
      },
    },
  },
  plugins: [],
}
