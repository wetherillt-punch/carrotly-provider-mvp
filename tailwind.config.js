/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f0',
          100: '#ffe8de',
          200: '#ffd4bd',
          300: '#ffb89b',
          400: '#ff9d7a',
          500: '#ff6b35',
          600: '#e65620',
          700: '#cc4318',
          800: '#b33310',
          900: '#992508',
        },
        secondary: {
          50: '#e6f1f9',
          100: '#cce3f3',
          200: '#99c7e7',
          300: '#66abdb',
          400: '#338fcf',
          500: '#004e89',
          600: '#003d6d',
          700: '#002d51',
          800: '#001f37',
          900: '#00101c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
