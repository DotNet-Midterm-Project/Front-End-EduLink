/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite', // Custom slower bounce animation
      },
    },
    screens: {
      'xs': '400px', // Custom extra small breakpoint
      ...require('tailwindcss/defaultTheme').screens, // Include default breakpoints
    },
  },
  plugins: [],
};
