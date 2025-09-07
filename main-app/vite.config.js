import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  server: {
    port: 5175,
    strictPort: true,
    cors: true,
    host: true
  },
  plugins: [
    react(),
    federation({
      name: 'mainApp',
      remotes: {
        musicLibrary: 'http://localhost:5174/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled']
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        format: 'esm',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  preview: {
    port: 5175,
    strictPort: true,
    cors: true,
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})