const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "none",
    entry: "./src/main.ts",
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                include: /src/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-typescript"],
                    plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"],
                },
            },
            { test: /\.css$/, use: ["style-loader", "css-loader"], exclude: /node_modules/ },
        ],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        clean: true,
    },
    plugins: [
        new ESLintPlugin({
            extensions: ["js", "ts"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
        }),
    ],
};
