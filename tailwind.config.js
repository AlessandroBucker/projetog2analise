/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- Garante que ele leia seus arquivos React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}