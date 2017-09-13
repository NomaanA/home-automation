var path = require('path');
var webpack = require('webpack');

// module.exports = {
//     entry: './app/index.js',
//     output: {
//         path: __dirname,
//         filename: 'bundle.js',
//         publicPath: '/app/assets/'
//     },
//     module: {
//         loaders: [{
//             test: /.jsx?$/,
//             loader: 'babel-loader',
//             include: path.join(__dirname, 'app'),
//             exclude: /node_modules/,
//             query: {
//                 presets: ['es2015', 'react']
//             }
//         }]
//     },
// };

module.exports = {
    entry: ['./client/main.js'],
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    devServer: {
        port: 3001
    }
};