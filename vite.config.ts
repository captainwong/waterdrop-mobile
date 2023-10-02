import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';
import postCssPxToViewport from 'postcss-px-to-viewport';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5174,
    cors: true,
    proxy: {
      //'/graphql': 'http://192.168.50.162:3000',
      '/graphql': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
    }
  },
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('./src') },
    ]
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToViewport({
          unitToConvert: 'px', // 需要转换的单位，默认为"px"
          viewportWidth: 400, // 视窗的宽度，对应的是我们设计稿的宽度
          unitPrecision: 3, // 单位转换后保留的精度
          propList: ['*'], // 能转化为vw的属性列表
          viewportUnit: 'vw', // 希望使用的视口单位
          fontViewportUnit: 'vw', // 字体使用的视口单位
          selectorBlackList: ['.ignore', '.hairlines'], // 需要忽略的CSS选择器
          minPixelValue: 1, // 设置最小的转换数值
          mediaQuery: true, // 媒体查询里的单位是否需要转换单位
          replace: true, // 是否直接更换属性值，而不添加备用属性
          exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件
          landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
        })
      ]
    }
  }
})
