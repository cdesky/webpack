const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");  
const MiniCssPlugin = require("mini-css-extract-plugin"); //提取css 单独一个文件
configs = {
  resolve: {
    //路径 配置别名
    extensions:['.js','.json'],
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      pages: path.join(__dirname, "src/pages"),
      component: path.join(__dirname, "src/component"),
      router: path.join(__dirname, "src/router"),
      common: path.join(__dirname, "src/common")
    }
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ], 
      },
  
      {
        //匹配js,使用babel-loade，但不管node_modules目录下面的
        //如果用到babel-loader，需要配置babelrc
        test: /\.js$/,
        use: "babel-loader", 
        //exclude: /node_modules/,
        include: path.resolve(__dirname, "src"), 
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: path.resolve(__dirname, "src"),
        use: [ 
          'file-loader',
            {
              loader: 'image-webpack-loader', //图片压缩
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                }, 
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                }, 
                webp: {
                  quality: 75
                }
              }
            } 
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: 'file-loader?name=[name].[ext]&outputPath=font/',
          }
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "csv-loader"
          }
        ]
      },
      {
        test: /\.xml$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "xml-loader"
          }
        ]
      }
    ]
  },
  plugins: [ 
    new MiniCssPlugin({  
      　　filename: "[name].css", 
    }),
    new HtmlWebpackPlugin({
      title: "冬哥出品11",
      alwaysWriteToDisk: true,
      filename: "index.html",
      template: path.resolve("index.html"), 
      favicon: path.resolve("./src/favicon.ico"),
      minify: true,
      showError: true
    }),
    new webpack.ProvidePlugin({ //常用引用 直接写在这里，之后就不用问题import了
      React:'react',
      ReactDOM:'react-dom',
      axios:'axios',
      Component:['react','Component'],
    }),
  ]
};

module.exports = configs;
