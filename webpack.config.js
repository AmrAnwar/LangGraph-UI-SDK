module.exports = {
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  output: {
    library: "LangGraphChatbot",
    libraryTarget: "umd",
    filename: "index.js",
    clean: true
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
  }
};
