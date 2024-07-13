import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      VITE_GOOGLE_MAPS_API_KEY: JSON.stringify(
        process.env.VITE_GOOGLE_MAPS_API_KEY
      ),
      VITE_MAPS_ID: JSON.stringify(process.env.VITE_MAPS_ID),
    },
  },
});
