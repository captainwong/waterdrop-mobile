import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5174,
    cors: true,
    proxy: {
      '/graphql': 'http://192.168.50.162:3000'
    }
  },
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('./src') },
    ]
  },
})
