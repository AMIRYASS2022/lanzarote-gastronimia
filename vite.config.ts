import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Safely expose API_KEY to the client-side code during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Polyfill other process.env checks
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});