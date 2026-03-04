import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/oricen-webapp/',
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true
  },
  build: {
    target: 'es2022'
  }
})
