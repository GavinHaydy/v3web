import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://106.13.171.218',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/ip': {
        target: 'http://pv.sohu.com',//这里是域名，不是完整地址
        changeOrigin: true,//是否跨域
        rewrite: (path => path.replace(/^\/ip/,'/'))
    },
    open: '/',
    port: '3000'
  }
},})
