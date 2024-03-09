/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '325px',

            450: '450px',

            sm: '640px',

            md: '768px',

            lg: '1024px',

            xl: '1280px',

            '2xl': '1536px'
        },
        extend: {}
    },
    plugins: []
}
