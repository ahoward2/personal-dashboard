const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ESBuildMinifyPlugin } = require("esbuild-loader");

module.exports = {
  entry: path.resolve(__dirname, "./src/client/index.js"),
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/client"),
    },
    port: 3000,
  },
  output: {
    path: path.join(__dirname, "dist/client"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.js$/,
        loader: "esbuild-loader",
        options: {
          loader: "jsx", // Remove this if you're not using JSX
          target: "es2015", // Syntax to compile to (see options below for possible values)
        },
      },
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx", // Or 'ts' if you don't need tsx
          target: "es2015",
          tsconfigRaw: require("./tsconfig.client.json"),
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: "es2015", // Syntax to compile to (see options below for possible values)
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
};
