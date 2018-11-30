 const path = require('path');    
 const CleanWebpackPlugin = require('clean-webpack-plugin');   //目标生成的目录  先清空再生成文件 
 module.exports = {
      
  plugins: [
    new CleanWebpackPlugin(['dist']),  
    
  ],
   
 };