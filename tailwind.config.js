/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6faf8',
          100: '#ccf5f0',
          200: '#99ebe1',
          300: '#66e0d2',
          400: '#33d6c3',
          500: '#17DDC0',  // Main Findr color
          600: '#12b19d',
          700: '#0e8576',
          800: '#09584e',
          900: '#052c27',
        },
        // Alias 'teal' to use Findr color
        teal: {
          50: '#e6faf8',
          100: '#ccf5f0',
          200: '#99ebe1',
          300: '#66e0d2',
          400: '#33d6c3',
          500: '#17DDC0',
          600: '#12b19d',
          700: '#0e8576',
          800: '#09584e',
          900: '#052c27',
        },
        // Alias 'cyan' to use Findr color
        cyan: {
          50: '#e6faf8',
          100: '#ccf5f0',
          200: '#99ebe1',
          300: '#66e0d2',
          400: '#33d6c3',
          500: '#17DDC0',
          600: '#12b19d',
          700: '#0e8576',
          800: '#09584e',
          900: '#052c27',
        },
      },
    },
  },
  plugins: [],
}
