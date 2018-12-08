const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js"); 

module.exports = merge(common, {
  entry: {
    app:[
      "babel-polyfill",
      // 'react-hot-loader/patch',
      path.resolve(__dirname,"./src/index.js")
    ]
  },
  output: {
    filename: "[name].[chunkhash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",  
    filename: "[name].[chunkhash].bundle.js",
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    historyApiFallback: true
  },
   
   
  plugins: [
     
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    })
  ]
});
