module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      'bright': '#7C3AED',
      'bright-contrastText': '#fff',
      'bright-bg': '#fafafa',
      'bright-text': '#000',
      
      'dark': '#555',
      'dark-contrastText': '#ffaa00',
      'dark-bg': '#888',
      'dark-text': '#fafafa',
    },
  },
  plugins: [],
  darkMode: 'class',
}
