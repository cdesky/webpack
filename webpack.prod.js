const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJs = require("uglifyjs-webpack-plugin"); 
 

module.exports = merge(common, {
  entry: {
    app:[
      "babel-polyfill",
      path.resolve(__dirname,"./src/index.js")
    ]
  },
  output: {
    filename: "[name].[chunkhash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/webpack/dist",
    chunkFilename: "[name].[chunkhash].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true
  },
  
  mode: "production",
  devtool: "cheap-module-source-map",
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    sideEffects: true,
    // splitChunks: {
    //   name: "vendors",
    //   chunks: "initial",
    //   cacheGroups: {
    //     styles: {
    //       name: "vendors",
    //       test: /\.(css|less)$/,
    //       chunks: "initial",
    //       enforce: true
    //     }
    //   }
    // },
    minimizer: [
      new UglifyJs({
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [ 
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
});
