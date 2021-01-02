const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  optimization: {
    /* 压缩代码 */
    minimize: true,
    minimizer: [
      new TerserPlugin({
        //加快构建速度
        // cache: true,
        // parallel: true, //多线程
        terserOptions: {
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },
  entry: path.resolve(__dirname, "/src/index.jsx"),
  module: {
    noParse: /node_modules\/(jquery\.js)/,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              require.resolve("@babel/preset-react"),
              [require.resolve("@babel/preset-env", { module: false })],
            ],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html",
    }),
    // HotModuleReplacementPlugin HMR 热更新
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    hot: true,
  },
};
