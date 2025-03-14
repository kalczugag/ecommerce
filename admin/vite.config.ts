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
            host: "0.0.0.0",
            port: 5000,
            watch: {
                usePolling: true,
            },
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
            setupFiles: "./coverage/tests/setup.ts",
        },
    };
});
