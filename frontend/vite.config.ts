/// <reference types="vite/client" />

import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        server: {
            port: 3000,
            proxy: {
                "/api": {
                    target: env.VITE_BACKEND_SERVER,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    };
});
