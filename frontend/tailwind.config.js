import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "blue-primary": "#5146E7",
                "red-primary": "#80203D",
            },
        },
    },
    plugins: [typography],
};
