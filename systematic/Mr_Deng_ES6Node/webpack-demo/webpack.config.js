const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    // app: "./src/index.js",
    // print: "./src/print.js",
    app: "./src/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  plugins: [
    // new cleanWebpackPlugin(["dist"]),
    // new HtmlWebpackPlugin({
    //   title: "Hot Module Replacement",
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NameModePlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
