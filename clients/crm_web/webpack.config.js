const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ],
    },
    devServer: {
      static: {
          directory: path.join(__dirname, "dist"),
          watch: true,
          publicPath: "/",
      }
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
    ]
};
