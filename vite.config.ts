import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {fileURLToPath} from 'node:url';
import esNodePolyfills from 'vite-plugin-node-stdlib-browser'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [esNodePolyfills(), react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    preserveSymlinks: false,
    extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx','.scss'],
  },
})
