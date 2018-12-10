const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js"); 

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
    contentBase: path.join(__dirname, "./dist"),
    historyApiFallback: true
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
