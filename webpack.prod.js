const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJs = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //目标生成的目录  先清空再生成文件
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  entry: {
    app: [
      "babel-polyfill",
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
      maxAsyncRequests: 10,
      maxInitialRequests:6,
      name: true,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: 10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        // styles: {
        //   name: 'styles',
        //   test: /\.(less|css)$/,
        //   chunks: 'all',
        //   minChunks: 1,
        //   reuseExistingChunk: true,
        //   enforce: true
        // },
        common: { // 抽离自己写的公共代码，common这个名字可以随意起
          chunks: 'initial',
          name: 'common',  // 任意命名
          minSize: 10    // 只要超出0字节就生成一个新包
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
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns:["dist"]
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname,'src/webpack/webpdf/'), to:  path.join(__dirname,'dist/assets/webpdf/') }
    ])
  ]
});
