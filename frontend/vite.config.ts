import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-expect-error
import fs from 'fs'
// @ts-expect-error
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      // @ts-expect-error import.meta.dirname is available at runtime in Node 18+
      key: fs.readFileSync(path.resolve(import.meta.dirname, 'certs/localhost-key.pem')),
      // @ts-expect-error import.meta.dirname is available at runtime in Node 18+
      cert: fs.readFileSync(path.resolve(import.meta.dirname, 'certs/localhost.pem')),
    },
    port: 1111, // or your preferred port
  },
})