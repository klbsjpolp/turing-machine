import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
/// <reference types="vitest" />

// https://vitejs.dev/config/
export default defineConfig(() => ({
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
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "game-image.svg",
        "icon-192.png",
        "icon-512.png",
        "icon-512-maskable.png",
      ],
      manifest: {
        name: "Turing Machine",
        short_name: "Turing Machine",
        description: "Jeu de deduction steampunk inspire de Turing Machine",
        theme_color: "#4a2f1a",
        background_color: "#f5ede1",
        display: "standalone",
        start_url: process.env.NODE_ENV === "production" ? "/turing-machine/" : "/",
        scope: process.env.NODE_ENV === "production" ? "/turing-machine/" : "/",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
  },
}));
