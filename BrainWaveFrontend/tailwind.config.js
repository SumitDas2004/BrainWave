/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'backBlue': '#4a53b5',
        'frontBlue':'#97a4f7',
        'pink':'#ee7ab1'
      },
    },
  },
  plugins: [],
};
