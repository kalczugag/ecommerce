/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                "dark-primary": "#1e1f20",
                darker: "#171717",
                "light-primary": "#ffffff",
                "light-secondary": "#F9F9F9",
                lighter: "#ECECEC",

                "text-dark": "#e5e5e5",
                "text-light": "#28292b",
                "text-blue": "#115293",

                "hover-light-primary": "#272727",
                "hover-light-secondary": "#3D3D3D",
                "hover-dark": "#717171",
            },
        },
    },
    plugins: [],
};
