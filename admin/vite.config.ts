/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        optimizeDeps: {
            include: [
                "@emotion/react",
                "@emotion/styled",
                "@mui/material",
                "@mui/icons-material",
                "@mui/system",
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
            port: 5165,
            proxy: {
                "/api": {
                    target: env.VITE_BACKEND_SERVER,
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
    };
});
