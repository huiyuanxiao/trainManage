var path = require('path');
var webpack = require('webpack');

//webpack插件，用于清除目录文件
var CleanPlugin = require('clean-webpack-plugin');
//当前编译的环境
var NODE_ENV = process.env.NODE_ENV;
//编译以后的目录
var BUILD_PATH = path.resolve(__dirname, 'dist');
//自动打开浏览器
//端口
var PORT = '8080';
//自动打开浏览器的url
var OPEN_BROWSER_URL = 'http://localhost:' + PORT + '/webpack-dev-server/';
//source-map配置
var SOURCE_MAP = NODE_ENV == 'prod' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map';
//发布时所引用的路径
var PUBLIC_PATH = NODE_ENV == 'prod' ? '/dist/' : '/dist/';


//需要单独打包的库

var config = {
    entry: {
        'main': './src/js/main',
    },
    output: {
        path: BUILD_PATH,  //输出目录
        filename: '[name].js',
        chunkFilename: "[id].[chunkhash].js",
        publicPath: PUBLIC_PATH
    },
    resolve: {
        // require时省略的扩展名，遇到.vue结尾的也要去加载
        extensions: ['', '.js', '.vue'],
        root: [
            path.resolve('./node_modules')
        ],
    },
    //代码热更新
    devServer: {
        host: '0.0.0.0',
        hot: true,
        port: PORT
    },
    //报错以后检查问题
    devtool: SOURCE_MAP,
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css!autoprefixer'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?sourceMap'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=50192'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    }
};

//根据不同环境执行不同配置
if (NODE_ENV === "prod") {
    config.plugins = [
        //删除dist文件夹
        new CleanPlugin(['dist']),
        //资源压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            },
            // 排除关键字，不能混淆
            except: ['$', 'exports', 'require']
        }),
        //删除重复的依赖
        new webpack.optimize.DedupePlugin(),
        //分析和优先考虑使用最多的模块，并为它们分配最小的ID，通过分析ID，可以建议降低总文件的大小
        new webpack.optimize.OccurenceOrderPlugin(),
    ];
} else {
    config.plugins = [
        //开启热替换插件
        new webpack.HotModuleReplacementPlugin(),
        //编译后自动打开浏览器
        //跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.NoErrorsPlugin(),

    ];
}



config.plugins.push(
    // 全局挂载jquery插件
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
);


module.exports = config;
