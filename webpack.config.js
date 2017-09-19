var path = require("path");
var webpack = require("webpack");

module.exports = {
    devtool: "inline-source-map",
    entry: path.resolve("app/main.jsx"),
    output: {
        path: path.resolve("app", "public"),
        filename: "bundle.js",
        publicPath: "/public/"
    },
    module: {
        rules: [{
            test: /\.js(x)$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
        }],
        loaders: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style!css"
            }
        ]
    },
    devServer: {
        port: 3001
    }
};