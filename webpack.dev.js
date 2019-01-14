 

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const currentIp=require("./getIp.js");

module.exports = merge(common, {
  entry: {
    app:[
      "babel-polyfill", 
      path.resolve(__dirname,"./src/index.js")
    ]
  },
  output: {
    filename: "[name].[chunkhash:7].js",
    path: path.resolve(__dirname, "./dist/"), 
    publicPath: "/",
    pathinfo:true,
    chunkFilename: "[name].[chunkhash:7].js"
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "./dist/"),
    historyApiFallback: true,
    port:9090,
    open:true,
    host:currentIp(),
    compress: true , 
    proxy: { 
        
          '/web/php':{
            context:[`!/web/php/**`],
            secure: false,
            target:'http://192.168.3.114:8080', //'https://platform-test.mobilemd.cn',// 
            pathRewrite: {
              "^/$": ""
            },
            changeOrigin: true,
            cookieDomainRewrite:currentIp()
          }
        
    }
  },
   
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false, 
    splitChunks:false, 
  },
  plugins: [
    
    new webpack.DefinePlugin({
      "ENV": JSON.stringify("development"),
    }),
    
  ]
});
