const path = require('path');
const webpack=require('webpack');
const proxy = require('http-proxy-middleware') //后端代理 


module.exports = {
  entry: {
   app:'./src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath:'/',
  },
  optimization: { 
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false, 
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
  // resolve: { //资源 解析
  //     extensions: [ '.js' , '.jsx' , '.scss' , 'less' , '.css' ] ,
  //     alias: {
  //         'src': path.resolve('./src') ,
  //         'assets': path.resolve('./src/assets') ,
  //         // 'utils': path.resolve('./src/utils') ,
  //         // 'container': path.resolve('./src/container') ,
  //         // 'components': path.resolve('./src/components'), 
  //     }
  // },
  plugins:[ 
      new webpack.HotModuleReplacementPlugin()  //关联热更新1
  ],
  devServer:{ //配置服务 
    contentBase:path.join(__dirname,'dist'),
    compress:true,
    // port:9090,
    historyApiFallback:true,
    // host:'192.168.3.114',
    clientLogLevel: 'none',  //控制台只显示错误的 
    proxy: { // proxy URLs to backend development server
        '/api': 'http://localhost:3000'
      }, 
  },
};
 