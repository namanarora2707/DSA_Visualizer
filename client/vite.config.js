import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 4000,
  },
  build: { 
    outDir: "dist",
    sourcemap: false, // Disable source maps in production for smaller bundle
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname) } },
});