module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        udsm: {
          blue: '#003366',
          gold: '#FFD700',
          statusOpen: '#28A745',
          statusClosed: '#DC3545',
          statusOcc: '#FFA500'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
