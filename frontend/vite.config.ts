import path from "path";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rewrite: (path: any) => path,
        secure: false,
      },
    },
  },
} as UserConfig);
