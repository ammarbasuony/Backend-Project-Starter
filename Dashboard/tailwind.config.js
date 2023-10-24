/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['Inter', 'Cairo-Regular'],
        inter: ['Inter', 'sans-serif'],
        'cairo-reg': ['Cairo-Regular', 'sans-serif'],
        'cairo-bold': ['Cairo-Bold', 'sans-serif'],
        'cairo-semibold': ['Cairo-SemiBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
