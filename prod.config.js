//webpack config file
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            //filename: '[name][hash].css'
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/images", to: "images/" },
                { from: "src/js/jeu.js", to: ""}
              ],
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ]
    }
};