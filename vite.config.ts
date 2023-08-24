import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true
    })
  ]
});
