/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        myBg: '#393646',
        myText: '#F4EEE0',
        myOrange: '#ECAF38'
      },
      boxShadow: {
        customDown: '16px 8px 16px 0 rgba(0, 0, 0, 0.20)',
        customRight: '8px 0px 16px -1px rgba(0, 0, 0, 0.20)'
      }
    }
  },
  plugins: []
}
