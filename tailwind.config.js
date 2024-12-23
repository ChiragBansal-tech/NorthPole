/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    fontFamily: {
      'heading': ['Manrope', 'sans-serif']},
      'custom': ['Montserrat', 'sans'],
    extend: {
      colors: {
        'grayBox': '#243c5a',
        'Main60' : '#00AF52',
        'Metal100': '#191C25',
        'Metal70' : '#525D77',
        'Metal60': '#667394',
        'Metal50': '#828DA9',
        'Metal40': '#A3ABC0',
        'Metal30': '#C4C9D6',
        'Metal20': '#E2E4EB',
        'bg':'rgb(241,244,249)',
        'Neutral40': '#E0E0E0',
        'Neutral50': '#C2C2C2',
        'Neutral100': '#1A1A1A',
        'graphBorder': '#E2E4EB',
        'A': '#00B4D8',
        'b': '#F9F9F9',
        'growth': '#008000',
        'ScheduleBorder': '#F1F5F9 '
      },
      gridTempalateColumns:{
        'custom': '70% 30%',
      },
      backgroundImage: {
        'bg': 'url(../public/1.webp)'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none', 
          '-ms-overflow-style': 'none',  
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
}
