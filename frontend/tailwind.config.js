/** @type {import('tailwindcss').Config} */
export default {
    content: ['./main.jsx', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#4AC6D2',
                secondary: '#9E15BF',
                logo: '#57D5C0',
            },
            borderColor: {
                'custom-primary': '#c375e3',
            },
            backgroundColor: {
                'input-background': '#ffffff', // Example background color for input fields
                'custom-hover': '#57D5C0',
            },
            boxShadow: {
                'input-focus': '0 0 0 2px rgba(0, 123, 255, 0.5)', // Example focus state for input fields
            }
        },
        fontFamily: {
        sans: ['Roboto', 'Open Sans', 'sans-serif'],
      },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ["cupcake", "dark"],
    },
}
