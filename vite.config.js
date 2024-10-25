import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [{ enforce: 'pre', ...mdx() },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }), svgr()],
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
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.js",
  },
  
});
