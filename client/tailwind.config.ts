/** @type {import('tailwindcss').Config} */


export default {
    content: ["./src/**/*.{jsx,tsx}", "./*.html"],
    theme: {
        extend: {
            colors: {
                dark: "#212429", //background
                darkHover: "#1e1e39", //box
                light: "#000000",
                primary: "#FFCFBD", //join room box
                danger: "#ef4444",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            animation: {
                "up-down": "up-down 2s ease-in-out infinite alternate",
            },
        },
    },
    plugins: [],
}
