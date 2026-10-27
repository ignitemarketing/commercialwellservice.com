// Build: npx --yes tailwindcss@3.4.17 -i src/input.css -o style.css --minify
// Commit the regenerated style.css; the Pages deploy runs no build step.
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        steel:   { 100: '#E5E9F0', 200: '#C5CCD9', 700: '#334155', 800: '#1E293B', 900: '#0F172A' },
        deep:    { 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8', 800: '#1E40AF', 900: '#1E3A8A' },
        amber:   { 400: '#FBBF24', 500: '#F59E0B' },
        sand:    { 50: '#FAFAF7', 100: '#F5F4ED' }
      }
    }
  }
}
