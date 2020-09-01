
const path = require('path');
// import { Configuration } from 'webpack'
// /**
//  * @type Configuration
//  */
const webpackConfig = {
    mode: 'development',
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
            }
        ]
    },
    optimization: {
        minimize: false
    }
}

module.exports = webpackConfig