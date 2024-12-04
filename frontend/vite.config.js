// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // You can specify your preferred port here
  },
  build: {
    outDir: 'build', // This should match your existing build output directory
  },
});
