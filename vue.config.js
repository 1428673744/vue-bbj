const path = require('path');
const resolve = (dir) => path.join(__dirname, dir); // 给public路径添加别名 
 
module.exports = {
  assetsDir: "static", // 打包后静态资源目录，注意public文件下目录（别名）配置，index.html的icon路径
  devServer: {
    open: true,
    host:"localhost",
    port: 8090,
    https: false,
    proxy: {
      "/api": {
        target: "http://localhost:8080", //目标主机
        changeOrigin: true, //需要虚拟主机站点
        pathRewrite: {
          "^/api": ""
        }
      }
    },

  }
}