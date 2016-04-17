const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',

    module: {
        loaders: [
            {
                test: /\.js?/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    'css?sourceMap!sass?sourceMap'
                )
            }
        ]
    },

    output: {
        filename: './www/js/bundle.js'
    },

    plugins: [
        new ExtractTextPlugin('./www/css/styles.css')
    ]
};