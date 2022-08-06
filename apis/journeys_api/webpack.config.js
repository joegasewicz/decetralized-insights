const path = require("path");
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

const { NODE_ENV } = process.env;

module.exports = {
    entry: "./src/index.ts",
    target: "node",
    mode: NODE_ENV,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
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
        filename: "index.js",
        path: path.resolve(__dirname, "build"),
    },
    externals: [ nodeExternals() ],
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ['npm run serve:dev']
        }),
    ]
};
