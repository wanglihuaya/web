const path = require("path"); //path是node的模块，获取当前文件的路径
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.js", //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
  },
  output: {
    filename: "[name].bundle.[hash].js", //输出文件名，[name]表示入口文件js名
    publicPath: "./",
    path: path.join(__dirname, "public"), //输出文件路径
  },
  // mode: "development",

  module: {
    rules: [
      {
        //处理.css文件
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "images/",
              limit: 8192, // 小于 8k 的图片自动转成 base64 格式
              esModule: false,
            },
          },
        ],
      },
      {
        //处理图片
        test: /\.(htm|html)$/i,
        loader: "html-withimg-loader",
      },
      {
        //处理scss
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "Custom template using Handlebars",
      template: "./src/index.html", //参照物，从这儿移动复制到output指定的目录下
    }),
    new CleanWebpackPlugin(), //删除输出目录public下的所有文件
    new Webpack.ProvidePlugin({
      //jquery
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
};
