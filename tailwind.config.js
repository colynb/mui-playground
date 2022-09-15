module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the MUI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [require('@tailwindcss/forms')],
}
