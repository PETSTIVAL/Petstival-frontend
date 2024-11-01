import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    // include: ['chunk-HQKIOHVU.js'], // vite 종속성 오류
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:54321/functions/v1', // edge function local 주소
        target: 'https://hfnchwvpqruwmlehusbs.supabase.co/functions/v1', // edge function 배포 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
