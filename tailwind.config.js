const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
            primary: '#AF9071',
            red: colors.red,
            gray: colors.slate,
            black: colors.black,
            white: colors.white,
            current: 'currentColor',
            transparent: 'transparent',
        },
        extend: {},
    },
    plugins: [],
}