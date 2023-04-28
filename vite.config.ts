import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prismjsPlugin from "vite-plugin-prismjs";
import {visualizer} from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    prismjsPlugin({
      languages: 'all'
  }),
      // 打包分析工具
      visualizer()
  ],
  server: {
    open: '/',
    host:'0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/ip': {
        target: 'http://pv.sohu.com',//这里是域名，不是完整地址
        changeOrigin: true,//是否跨域
        rewrite: (path => path.replace(/^\/ip/,'/'))
    },
    port: '3000'
  }
},})
