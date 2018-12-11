 

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
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",   
    pathinfo:false,
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "./src"),
    historyApiFallback: true,
    port:8080,
    host:currentIp(),
    compress: true ,
    quiet: true ,
    noInfo: true ,
    clientLogLevel: 'none' ,
    proxy: { 
        context: [`!/ccp-web/**`],
        target:'https://platform-test.mobilemd.cn',// 'http://localhost:3000',
        pathRewrite: {
          "^/$": ""
        },
        changeOrigin: true,
        cookieDomainRewrite:currentIp()
      
    }
  },
   
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false, 
    splitChunks:false
  },
  plugins: [
    
    new webpack.DefinePlugin({
      "ENV": JSON.stringify("development"),
    }),
    
  ]
});
