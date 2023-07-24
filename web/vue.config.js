const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { // 反向代理 解决接口与网页路由跨域的问题
    proxy: {
      '/webapi': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})