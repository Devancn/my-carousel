
const path = require('path');
// import { Configuration } from 'webpack'
// /**
//  * @type Configuration
//  */
const webpackConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: './main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                { pragma: 'createElement' } // 默认jsx被babel转换后为React.createment
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.view/,
                use: {
                    loader: require.resolve("./myloader.js")
                }
            },
            {
                test: /\.css/,
                use: {
                    loader: require.resolve("./cssloader.js")
                }
            }
        ]
    },
    optimization: {
        minimize: false
    }
}

module.exports = webpackConfig