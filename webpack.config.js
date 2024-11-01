const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  output: {
    library: "LangGraphChatbot",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      scriptLoading: "blocking",
      inject: "head",
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
