import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
export default defineConfig({
  server: {
    host: "::",
    port: 4000,
    proxy: {
      "/api": {
        target: "https://dsa-visualizer-rh1k.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: { outDir: "dist" },
  plugins: [react()],
  // Map '@' to the client directory. Use __dirname (the directory of this config file)
  // to avoid resolving to 'client/client' when running from inside the client folder.
  resolve: { alias: { "@": path.resolve(__dirname) } },
});