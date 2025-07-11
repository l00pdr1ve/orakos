import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/orakos/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  // This define is optional if you use import.meta.env.VITE_... directly in your code
  // But it can be useful for clarity or for libraries that expect process.env
  define: {
    'process.env.VITE_GEMINI_API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY)
  }
});
