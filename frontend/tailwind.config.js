/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#4AC6D2',
      secondary: '#9E15BF',
      logo: '#57D5C0'
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}
