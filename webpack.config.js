const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  output: {
    library: "LangGraphChatbot",
    filename: "chatbot-sdk.js",
    auxiliaryComment: "Test Comment",
    libraryTarget: "umd",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
};
