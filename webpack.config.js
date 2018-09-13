let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let glob = require('glob');
//设定搜索多页面入口路径
let globReg = 'src/*.html'

//获取多页面基于项目根目录的相对路径
function getHtmlPath() {
    let globPath = globReg;
    let filesPath = glob.sync(globPath);
    return filesPath;
}
//构建webpack多入口entry
function getEntry() {
    let entryObj = {}
    getHtmlPath().forEach(item => {
        let filePath = item.replace(/(.*\/)*([^.]+).*/ig, '$1');
        let fileName = item.replace(/(.*\/)*([^.]+).*/ig, '$2');
        entryObj[fileName] = './'+filePath+'js/'+fileName+'.js';
    });
    return entryObj
}
//构建HtmlWebpackPlugin的配置
function getHtmlPlugin() {
    let HtmlPlugin = [];
    getHtmlPath().forEach(item => {
        let fileName = item.replace(/(.*\/)*([^.]+).*/ig, '$2');
        let fileExt = item.replace(/.+\./, '');
        HtmlPlugin.push(new HtmlWebpackPlugin({
            template: 'html-withimg-loader!'+item,
            minify: {
                //消除空格
                collapseWhitespace: true
            },
            //为js文件添加一个hash尾号，防止缓存
            hash: true,
            filename: fileName+'.'+fileExt,
            chunks: ['common', fileName]
        }));
    });
    return HtmlPlugin;
}
//构建webpack的Plugins配置
function getPlugins(){
    let plugins = [];
    //默认添加插件，清空旧有编译文件
    plugins.push(new CleanWebpackPlugin('dist'));
    plugins = plugins.concat(getHtmlPlugin());
    return plugins;
}
module.exports = {
    entry: getEntry(),
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
    plugins: getPlugins(),
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
                            limit: 5120,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
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