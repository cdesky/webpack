 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');   
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'cheap-module-eval-source-map',
   devServer: {
     contentBase: './dist'
   },
   plugins:[
    new UglifyJsPlugin({  //打包压缩
      sourceMap:true
    }),   
   ]
 });