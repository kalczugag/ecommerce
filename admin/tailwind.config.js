/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                "dark-primary": "#1e1f20",

                "light-primary": "#ffffff",
                "light-secondary": "#F9F9F9",
                lighter: "#ECECEC",

                "text-dark": "#e5e5e5",

                "text-light": "#28292b",
            },
        },
    },
    plugins: [],
};
