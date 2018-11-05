// 要测试那个模块
var one = './src/main_2/';


// 配置项
var opts = {
  // 目标文件夹
  src: one,

  // 目标文件夹
  dist: "webapp",
  img: 'imgs',
  font: 'fonts',
};



const path = require('path');
const webpack = require('webpack');
// 分离HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于剥离css的
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//webpack插件，用于清除目录文件
const CleanPlugin = require('clean-webpack-plugin')
  // 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');







var one_arr = one.split('/');
var server_base = [];
server_base.push(one_arr[0]);
server_base.push(one_arr[1]);

// 找到dev下的根目录
var dev_base_str = server_base.join('/');
// 找到build下的根目录
var build_base_str = one.replace(one_arr[1], opts.dist);











var dev = {
  entry: `${opts.src}index.js`,
  plugins: [
    new HtmlWebpackPlugin({
      // 模板文件也要改
      template: `${opts.src}index.html`, // 模版文件
    }),
    new webpack.HotModuleReplacementPlugin() // 热加载插件
  ],
  module: {
    rules: [
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      // js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // ------------------------------------

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      //
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },


      // fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          // 一样这个。
          name: `${opts.fonts}/[name].[hash:7].[ext]`
        }
      },
      // img
      {
        // test: /\.(png|jpg|gif|svg)$/,
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          // 一样这个。
          name: `${opts.imgs}/[name].[hash:7].[ext]`
        }
      }
    ]
  },
  resolve: {},
  devServer: {
    port: 1234,
    contentBase: dev_base_str,
    historyApiFallback: true,
    hot: true, // 配置HMR之后可以选择开启
    noInfo: true,
    inline: true // 实时刷新
  },
};



// 注意：这是单页面应用。主要是单页面的JS进行处理。dev模式也只是刷新js文件
var build = {
  entry: {

    // 1.要知道：入口文件只有一个，前面是打包后的名字 
    // 多个入口文件的话，生成的html回随机放置 多个入口文件的顺序，
    // 但是有时候还是很影响的，所以，如果是有顺序的公共文件，例如jq,fn.js,conf.js这些自己的东西直接引入就行了。
    // 直接在index内部进行引用就行了。
    index: `${opts.src}index.js`,
    // 输出配置（见下面具体）：
    // path: path.resolve(__dirname, 'webapp/'),
    // filename: 'js/main/sync.[name].[hash:7].js',
    // 这个app 决定了js css的name



    // 2.接下来就是在我们写的app.js文件写业务内容了。
    // a2: './src/a2.js',
    // a: './src/a.js',
    // 比如说 a a2都是我们外面需要用的一个小的插件，有可能是用户用不到这个功能。
    // 这里呢，我们要么就是在全局直接引入 
    // 要不就是 在内部 进行异步引用。感觉这个更合理。
    // 所以上面的那些 a a2就注释了。

    // 异步引入：
    // require.ensure([],function (require) {
    //  var a = require('./a.js');
    //  console.log(a);
    // },'a');

    // 输出配置（见下面具体）：
    // chunkFilename: 'js/main/async.[name].[hash:7].js',



    // 3.公共文件的处理（这个知道怎么用就行，因为一般不会这样用，我的话就直接用到页面上了）
    // 入口：下面是在app.js中用到的
    // jq:['jquery'],
    // ve:['vue'],
    // 这样的写法就是想分开打包，下面的配置为：
    // new webpack.optimize.CommonsChunkPlugin({
    //   // 寻找数组中每个入口的公共名字进行提取
    //   // name: ['jq','ve'],
    //   // 控制输出地址和名字设置
    //   filename: 'js/main/common.[name].[hash:7].js',
    //   minChunks: Infinity,
    // }),

    // 这个是要全部打包在一起
    // common: ['jquery', 'vue']
    // 配置项：
    // new webpack.optimize.CommonsChunkPlugin({
    //   // 寻找数组中每个入口的公共名字进行提取
    //   // name: ['common'],
    //   // 控制输出地址和名字设置
    //   filename: 'js/main/common.[name].[hash:7].js',
    //   minChunks: Infinity,
    // }),

  },
  output: {
    // 1.指定输出的根目录,这个好像是不能动的，下面的配置都是按照这个为基础的。
    path: path.resolve(__dirname, build_base_str),
    // 2.入口依赖文件js的输出目录的名字
    // filename: 'js/main/sync.[name].[hash:7].js',
    filename: '[name].[hash:7].js',
    // 
    // 3.给require.ensure用：异步加载文件的真正的生成路径
    // chunkFilename: 'js/main/async.[name].[hash:7].js',
    chunkFilename: 'async.[name].[hash:7].js',

    // !!!.这是给单页面最后所有生成的上面的配置的文件 的 src 前面加一个 特定的地址。比如外面上线后 全部后加一个xxx-mot
    // 这个开启后下面那个HtmlWebpackPlugin 里的默认 当前层配置就失效了。
    // publicPath: '/dist/',

  },
  plugins: [
    // 公共文件输出的路径和名字
    // new webpack.optimize.CommonsChunkPlugin({
    //   // 寻找数组中每个入口的公共名字进行提取
    //   // name: ['jq','ve'],
    //   // name: ['common'],
    //   // 控制输出地址和名字设置
    //   filename: 'js/main/common.[name].[hash:7].js',
    //   minChunks: Infinity,
    // }),

    // -------------------------------------css--生成的地方
    new ExtractTextPlugin('[name].[hash:7].css'),
    // -------------------------------------压缩JS文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    // ------------------------------------模板入口--各是各自的脚本
    new HtmlWebpackPlugin({
      // 模版文件
      template: `${one}index.html`,
      // 以上面的出口的配置为基础。
      filename: 'index.html',

      // 里面所有的引入都是按照 index.html这层所在地址 进行相对路径写的。
    }),





    // -------------------------------------清除
    // 清除 文件和文件夹
    new CleanPlugin(['*.js', '*.css', '*.css.map', "*.html", opts.img, opts.font], {
      root: path.resolve(__dirname, build_base_str),
      verbose: true,
      dry: false,
      // exclude: ['common', 'lib', 'API.js']
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // new CompressionWebpackPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.(js|css)$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
  ],
  module: {
    rules: [
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      // js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // ------------------------------------
      // css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      // less
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      // ------------------------------------
      // fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          // 一样这个。
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      // img
      {
        // test: /\.(png|jpg|gif|svg)$/,
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1,
          // 一样这个。
          name: 'imgs/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  devtool: '#source-map',
};


// production
if (process.env.NODE_ENV === 'production') {
  module.exports = build;
}
// dev
else {
  module.exports = dev;
}
