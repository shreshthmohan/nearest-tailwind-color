// extracts css into a separate file instead of inside the js bundle
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(process.cwd(), "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "main.css" }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // see .babelrc file for babel config
        },
      },
      {
        test: /\.(s)?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader", // for postcss config see postcss.config.js file
        ],
      },
    ],
  },

  devtool: "source-map", // uncomment this to output source map for bundles
  devServer: {
    port: 3000,
  },
};
