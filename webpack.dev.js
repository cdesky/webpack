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
   devServer: {
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true
  },
  resolve: { //路径 配置别名
    alias: {
        pages: path.join(__dirname, 'src/pages'),
        component: path.join(__dirname, 'src/component'),
        router: path.join(__dirname, 'src/router')
    }
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
 