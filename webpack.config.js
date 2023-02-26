//webpack config file
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [
              { from: "source", to: "dest" },
              { from: "other", to: "public" },
            ],
          }),
    ],
    mode: 'development',
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    }
};