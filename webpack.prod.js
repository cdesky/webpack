const path = require('path');  
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJs = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');  

module.exports = merge(common, {
  entry: {
    app: './src/index.js'
 },
 output: {
   filename: '[name].bundle.js',
   path: path.resolve(__dirname, 'dist'),
   publicPath:'./', 
 }, 
 devServer: {
  contentBase: path.join(__dirname, './dist')
},
  module:{
    rules:[ 
        {
          test:/\.(css|less)$/,
          include: path.resolve(__dirname, 'src'),
          use:[
              'style-loader',
              'css-loader'
          ]
        },
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          use: [
              'babel-loader'
          ]
        },
        {
          test:/\.(png|svg|jpg|gif|jpeg)$/,
          include: path.resolve(__dirname, 'src'),
          use:[
              'file-loader'
          ]
        },
        {
          test:/\.(woff|woff2|eot|ttf|otf)$/,
          include: path.resolve(__dirname, 'src'),
          use:[
              'file-loader'
          ]
        },
        {
            test:/\.(csv|tsv)$/,
            include: path.resolve(__dirname, 'src'),
            use:[
              'csv-loader'
            ]
        },
        {
          test:/\.xml$/,
          include: path.resolve(__dirname, 'src'),
          use:[
            'xml-loader'
          ]
      },
    ]
},
  mode: 'production',
  devtool:'source-map',
   optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false, 
    sideEffects:true,
      splitChunks: {
          name: 'vendors' ,
          chunks: 'initial' ,
          cacheGroups: {
              styles: {
                  name: 'vendors' ,
                  test: /\.(css|less)$/ ,
                  chunks: 'initial' ,
                  enforce: true
              }
          }
      } , 
    minimizer: [
        new UglifyJs({ 
        parallel: true ,
        uglifyOptions: {
            compress: {
                warnings: true ,
                drop_console: true ,
                drop_debugger: true
            } ,
            output: {
                comments: false
            }
        }
      }),
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'冬哥出品-生产环境',
      alwaysWriteToDisk: true,
      template: path.resolve('index.html'),
      favicon:path.resolve('./src/favicon.ico'),
      minify:true,
      showError:true,
  }), 
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});