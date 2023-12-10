/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default ({ mode }) => {
process.env.VITE_API_URI = loadEnv(mode, process.cwd()).VITE_API_URI;
    return defineConfig({
        plugins: [react()],
        server: {
            port: 5173
        },
        base: "/erp",
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./src/tests/setup.ts",
        },
    });
}