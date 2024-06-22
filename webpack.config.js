const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@client-sdk-base": path.resolve(__dirname, "src/client-sdk-base"),
      "@common-sdk-base": path.resolve(__dirname, "src/common-sdk-base"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@types": path.resolve(__dirname, "src/types"),
    },
    fallback: {
      buffer: require.resolve("buffer/"),
      stream: false,
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean the output directory before emit
    publicPath: "./",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Source HTML file
      filename: "index.html", // Output HTML file
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/*.css", to: "" }, // Adjust the source path if needed
      ],
    }),
    new Dotenv(), // Load environment variables from .env file
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  mode: "production",
  // watch: true,
};
