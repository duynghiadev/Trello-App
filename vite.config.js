import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  // Cho phép thằng Vite sử dụng được process.env, mặc định thì không mà sẽ phải dùng import.meta.env
  // Github issue: https://github.com/vitejs/vite/issues/1973

  // Deployment: https://vitejs.dev/guide/static-deploy#vercel
  define: {
    'process.env': process.env
  },
  plugins: [react(), svgr()],
  // base: "./",
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  }
})
