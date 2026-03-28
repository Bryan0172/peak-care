/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#f0faf8',
          100: '#d2f0eb',
          200: '#a8e0d8',
          300: '#6fc9be',
          400: '#3aad9f',
          500: '#1A7A6E',
          600: '#145F56',
          700: '#104a43',
          800: '#0d3835',
          900: '#0a2d2a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: { color: theme('colors.teal.500') },
            h1: { color: theme('colors.gray.900') },
            h2: { color: theme('colors.gray.900') },
            h3: { color: theme('colors.gray.900') },
          },
        },
      }),
    },
  },
  plugins: [],
}
