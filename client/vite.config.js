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
    // Ensure proper base path for deployment
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [react()],
  // Map '@' to the client directory. Use __dirname (the directory of this config file)
  // to avoid resolving to 'client/client' when running from inside the client folder.
  resolve: { alias: { "@": path.resolve(__dirname) } },
});