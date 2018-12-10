const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJs = require("uglifyjs-webpack-plugin");

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
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[chunkhash].bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    }
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
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
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
    })
  ]
});
