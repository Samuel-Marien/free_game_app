/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode
        myBg: '#393646',
        myText: '#F4EEE0',
        myOrange: '#ECAF38',
        myBrown: '#e6e1d8',
        myLightOrange: '#FAD285',
        myDarkOrange: '#B28E46',
        myLightViolet: '#EBCEED',
        myViolet: '#AB80AD',
        myDarkViolet: '#4F4557',
        myBlackDarkViolet: '#403549',
        //  Light mode
        myLightBg: '#F4EEE0',
        myLightText: '#AB80AD'
      },
      boxShadow: {
        customDown: '16px 8px 16px 0 rgba(0, 0, 0, 0.20)',
        customUp: '0px -4px 14px rgba(0, 0, 0, 0.30)',
        customRight: '8px 0px 16px -1px rgba(0, 0, 0, 0.20)'
      },
      fontFamily: {
        // myText: ['Ubuntu']
        myTitle: ['Ubuntu']
      }
    }
  },
  plugins: []
}
