const path = require('path');  
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');   
const HtmlWebpackPlugin = require('html-webpack-plugin');   

 module.exports = merge(common, {
  entry: {
    app: './src/index.js'
  },
 output: {
   filename: '[name].bundle.js',
   path: path.resolve(__dirname, 'dist'),
    publicPath:'/', 
 },
   mode: 'development',
   devtool: 'cheap-module-source-map',
   plugins:[ 
 
    new HtmlWebpackPlugin({
        title:'冬哥出品-开发环境',
        alwaysWriteToDisk: true, 
        template:path.resolve('index.html'),
        favicon:path.resolve('./src/favicon.ico'),
        minify:true,
        showError:true,
    }), 
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
   ]
 });