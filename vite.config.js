import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from network
    strictPort: true, // Ensures the same port is used
    allowedHosts: ["29e6-2409-40e5-16d-97be-d85e-5cf1-2f46-fa84.ngrok-free.app"],
  },
});
