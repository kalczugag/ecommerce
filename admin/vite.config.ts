/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: [
            "@emotion/react",
            "@emotion/styled",
            "@mui/material",
            "@mui/icons-material",
            "@mui/system",
            "@mui/lab",
            "@mui/styles",
        ],
    },
    plugins: [
        react({
            jsxImportSource: "@emotion/react",
            babel: {
                plugins: ["@emotion/babel-plugin"],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8080/",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/tests/setup.ts",
    },
});
