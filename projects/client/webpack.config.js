/* eslint-disable */

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
    proxy: {
      '/api': {
         target: 'http://localhost:8001',
      },
      '/socket.io': {
        target: 'http://localhost:8001',
        ws: true
    }
    },
  },
  plugins: [new HtmlWebpackPlugin({
    hash: true,
    title: 'My Awesome application',
    template: path.join(__dirname, './src/public/index.html'),
    filename: path.join(__dirname, './dist/index.html') //relative to root of the application
})],
};
