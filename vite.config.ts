import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // IMPORTANT: Set base path for GitHub Pages
  // Replace 'turing-machine' with your actual repository name
  base: process.env.NODE_ENV === 'production' ? '/turing-machine/' : '/',

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
