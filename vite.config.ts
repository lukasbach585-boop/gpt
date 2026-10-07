import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { appBasePath } from './scripts/app-path.mjs';

export default defineConfig({
  base: appBasePath(process.env.APP_BASE_PATH || '/'),
  plugins: [react()],
  server: { host: '0.0.0.0' },
  build: {
    rollupOptions: {
      output: { manualChunks: id => id.includes('node_modules') ? 'vendor' : undefined },
    },
  },
});
