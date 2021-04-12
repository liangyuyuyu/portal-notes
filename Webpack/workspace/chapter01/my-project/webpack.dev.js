'use strict'

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'), // 指定打包生成的目录
        filename: '[name].js' // 指定打包生成的文件名
    },
    mode: 'development', // production、development
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    // 'file-loader'
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }

                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"), // WDS服务的基础目录
        host: 'localhost', // 服务器的ip地址
        compress: true, // 服务器压缩
        port: 3000, // 端口
        open: true, // 自动打开页面
        hot: true // 开启热更新
    }
}