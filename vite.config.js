import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync('/home/tux/SslCertificates/10.244.101.196.key'),
      cert: fs.readFileSync('/home/tux/SslCertificates/10.244.101.196.crt'),
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
