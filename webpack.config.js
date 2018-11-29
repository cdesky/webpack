const path = require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');   
const CleanWebpackPlugin = require('clean-webpack-plugin');   //目标生成的目录  先清空再生成文件 
const proxy = require('http-proxy-middleware') //后端代理

module.exports = {
  entry: {
   app:'./src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath:'/',
    pathinfo: false
  },
  optimization: { 
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    },   
  module:{
      rules:[ 
          {
            test:/\.css$/,
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
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
          title:'冬哥出品',
          alwaysWriteToDisk: true,
          filename: 'index.html', 
          favicon:'./src/favicon.ico',
          minify:true,
          showError:true,
      }), 
      new webpack.ProvidePlugin({
              join:['loadsh','join']
       }),
      new webpack.HotModuleReplacementPlugin()  //关联热更新1
  ],
  devServer:{ //配置服务 
    contentBase:path.join(__dirname,'dist'),
    compress:true,
    // port:9090,W
    historyApiFallback:true,
    // host:'192.168.3.114',
    clientLogLevel: 'none',  //控制台只显示错误的
    hot:true,  //关联热更新1
    proxy: { // proxy URLs to backend development server
        '/api': 'http://localhost:3000'
      }, 
  },
};
 