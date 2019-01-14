const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const currentIp = require("./getIp.js");

module.exports = merge(common, {
  entry: {
    app: ["babel-polyfill", path.resolve(__dirname, "./src/index.js")]
  },
  output: {
    filename: "[name].[chunkhash:7].js",
    path: path.resolve(__dirname, "./dist/"),
    publicPath: "/",
    pathinfo: true,
    chunkFilename: "[name].[chunkhash:7].js"
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    historyApiFallback: true,
    port: 9090,
    open: true,
    host: currentIp(),
    compress: true,
    noInfo:true,
    allowedHosts: ["http://192.168.3.114", "http://192.168.1.6"],
    proxy: {
      "/php/": { //匹配php开头的  把后面跟的地址一并连接到target后面  转发到后端
        // secure: false, //不需要ssl文件
        target: "http://192.168.1.6:8080", //'https://platform-test.mobilemd.cn',//请求后端地址 接口的域名
        // pathRewrite: {
        //   "^/$": ""
        // },
        changeOrigin: true,
        cookieDomainRewrite: currentIp()
      }
    }
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify("development")
    })
  ]
});
