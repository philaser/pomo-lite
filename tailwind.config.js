/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#f8f9fa',
        surface: '#ffffff',
        primary: '#1a1a1a',
        secondary: '#6c757d',
        accent: '#212529',
      }
    },
  },
  plugins: [],
}
