import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import IstanbulPlugin from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    IstanbulPlugin({
      cypress: true,
      requireEnv: true,
      include: "src/**/*",
      extension: [".js", ".jsx", ".ts", ".tsx"]
    })
  ]
});
