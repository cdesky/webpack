const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩css文件

configs = {
  resolve: {
    //路径 配置别名
    extensions: [".js", ".json", ".jsx"],
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
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        //匹配js,使用babel-loade， exclude是排除node_modules目录下面的   include就包括这个目录的
        //如果用到babel-loader，需要配置babelrc
        test: /\.js$/,
        use: "babel-loader",
        //exclude: /node_modules/,
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/i,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "url-loader", 
            options: {
              limit: 8000,
              outputPath: "images/",
              name: "[name].[ext]",
            }
          }
        ]
      }, 
      // {
      //   loader: 'img-loader',// 压缩图片  为啥这个启用后就编译报错 ArgumentError: Expected argument to be of type `array` but received type `string`
      //   options: {
      //     plugins: [
      //       require("imagemin-pngquant")({
      //         quality: "80" // the quality of zip
      //       })
      //     ]
      //   }
      // },
      {
        test: /\.(html)$/,//img的src引入 要用这个插件
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "img:data-src", "audio:src"],
            minimize: true
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "url-loader?name=[name].[ext]&outputPath=font/"
          }
        ]
      }

      // {
      //   test: /\.(csv|tsv)$/,
      //   include: path.resolve(__dirname, "src"),
      //   use: [
      //     {
      //       loader: "csv-loader"
      //     }
      //   ]
      // },
      // {
      //   test: /\.xml$/,
      //   include: path.resolve(__dirname, "src"),
      //   use: [
      //     {
      //       loader: "xml-loader"
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    // new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      title: "冬哥出品11",
      // alwaysWriteToDisk: true,
      filename: "index.html",
      template: path.resolve("index.html"),
      favicon: path.resolve("./src/favicon.ico"),
      minify: true,
      showError: true
    }),
    new webpack.ProvidePlugin({
      //常用引用 直接写在这里，之后就不用每次import了
      React: "react",
      ReactDom: "react-dom",
      axios: "axios",
      Component: ["react", "Component"],
      $: "jquery"
    })
  ]
};

module.exports = configs;
