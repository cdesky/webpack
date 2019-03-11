const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJs = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //目标生成的目录  先清空再生成文件

module.exports = merge(common, {
  entry: {
    app: [
      "babel-polyfill",
      "core-js/modules/es6.promise",
      "core-js/modules/es6.array.iterator",
      path.resolve(__dirname, "./src/index.js")
    ]
  },
  output: {
    filename: "js/[name].[chunkhash:7].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "js/[name].[chunkhash:7].js",
    publicPath: ""   
  }, 

  mode: "production",
  devtool: "cheap-module-source-map",
  optimization: { 
    runtimeChunk: {
      name: 'manifest'
    }, 
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 7,
      maxInitialRequests:5,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
  
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
      "ENV": JSON.stringify("production")
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns:["dist"]
    })
  ]
});
