/** @type {import('tailwindcss').Config} */
// Tailwind theme used by this template. Extend here, then rebuild
// assets/css/tailwind.css with: npx tailwindcss -i assets/css/tailwind.input.css -o assets/css/tailwind.css --minify
module.exports = {
  content: ['./index.html', './assets/js/app.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        drive: {
          bg: '#235EE7',
          primary: '#1E5CE6',
          primaryDark: '#1749B8',
          lightBg: '#F3F5F9',
          rowHover: '#F5F8FF',
          rowSelected: '#EBF2FC',
          textDark: '#1E293B',
          textMuted: '#8C97A8'
        }
      }
    }
  }
};
