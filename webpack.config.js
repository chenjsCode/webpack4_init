let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    entry: {
        index: './src/js/index.js',
        login: './src/js/login.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve('dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {  // 抽离自己写的公共代码
                    chunks: 'initial',
                    name: 'common', // 打包后的文件名，任意命名
                    minChunks: 2,//最小引用1次
                    minSize: 0 // 只要超出0字节就生成一个新包
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        // 打包前先清空
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!./src/index.html',
            minify: {
                collapseWhitespace: true    //消除空格
            },
            hash: true,
            filename: 'index.html',
            chunks: ['common', 'index']   // 对应关系,index.js对应的是index.html
        }),
        new HtmlWebpackPlugin({
            template: 'html-withimg-loader!./src/login.html',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            filename: 'login.html',
            chunks: ['common', 'login']   // 对应关系,login.js对应的是login.html
        })
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader/url'
                    },
                    {
                        //将编译的css形成文件
                        loader: 'file-loader',
                        options: {
                            name: 'css/[name]-[hash:4].css'
                        }
                    },
                    {
                        //将less编译成css
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'img/'   // 图片打包后存放的目录
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        host: 'localhost',      // 默认是localhost
        port: 3000,             // 端口
        open: true             // 自动打开浏览器
    }
}