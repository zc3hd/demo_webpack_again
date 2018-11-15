# webpack step 1

* 首先要知道的，webpack分为开发模式，和打包模式。和gulp目前的针对公司的配置文件不同，webpack不是实时编译测试和打包的，gulp是测试和打包都一起执行了。webpack是分为两步的。这是很重要的一点。
* 目前，我还是比较熟悉和原来一样的目录结构。就是有个webapp_src和webapp，里面目录结构是一样的，webapp_src放源文件。webapp里放置的是打包后的文件。

### 1.dev 测试

* 测试模式，只需要知道模板是哪个，入口JS是哪个就可以开始了。
* 注意less的编译规则是不一样的。其他没有什么了。
```
{
  plugins: [
    // 模版文件
    new HtmlWebpackPlugin({
      
      template: './src/main/index.html' 
    }),
  ],
  // 入口JS
  entry: './src/main/index.js',
  // 一些编译文件
  module: {
    rules: [
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
          name: 'fonts/[name].[hash:7].[ext]'
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
          name: 'imgs/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {},
  devServer: {
    port: 1234,
    contentBase: "./src",
    historyApiFallback: true,
    // hot: true, // 配置HMR之后可以选择开启
    noInfo: true,
    inline: true // 实时刷新
  },
  
}
```


### 2.build 打包

##### 1 入口app.js配置和异步加载模块

* 打包的多需要更多的配置了。
```
1.打包后必然会有名字，那么js css html的名字是什么？就是下面的"app"
entry:{
  // 以后的名字 和 入口路径
  app: './src/main/index.js',
}

```

* 对上面入口的路径和以后的名字需要知道：入口文件只有一个，前面是打包后的名字 
* 多个入口文件的话，生成的html里会不知道怎么个排序的方式放入多个入口文件，有时候还是很影响的。
* 所以，如果是有顺序的公共文件，例如jq,fn.js,conf.js这些自己的文件直接引入模板html就行就行了。打包的时候这些已经引入好的，会一起和html打过来，不会被改的。也是推荐这样。

--------------

* 接下来就是说app.js里面的问题了，因为很多时候，我们可能需要摸个插件，只用一下，也可能在用户那没有点击这个功能，就其实没有加载这个插件。直接在模板中引入有点浪费。于是，在app.js内部，支持异步引入

```
require.ensure([],function (require) {
 var a = require('./a.js');
 console.log(a);
},'a');
```

* 上面的两个步骤有关说明直接引入还是异步引入已经说得很清楚了。接下来就是打包。直接引入的是同步加载的，虽然代码是分开写的，但是还是相当于是一起的。但是后面自己在app.js内部引入的插件，推荐使用异步引入，打包的时候应该怎么配置？

##### 2 app.js和异步引入的应该怎么配置输出：

```
  output: {
    // 1.指定输出的根目录,下面的配置都是按照这个为基础的。
    path: path.resolve(__dirname, 'webapp/main/'),
    
    // 2.入口依赖文件js的输出目录的名字，这个name是我们入口app.js主js文件设置好的name：app
    filename: 'sync.[name].[hash:7].js',
    // 
    // 3.给require.ensure用：输出路径还是上面配置的，这里的name是每个异步JS自己的名字。
    chunkFilename: 'async.[name].[hash:7].js',

    // !!!.这是给单页面，最后生成的index.html里面所有外在引入 src、link的地址 前面加一个 特定的地址。比如外面上线后 全部后加一个xxx-mot
    // publicPath: '/dist/',
  },
```

##### 3 css的生成

```
地址上面配置的，这里的name是入口配置好的name:app
new ExtractTextPlugin('[name].[hash:7].css'),
```

##### 4 html的输入和输出

* 里面所有的引入都是按照 index.html这层所在地址 进行相对路径写的。这个是模块本身的功能。
```
new HtmlWebpackPlugin({
    // 模版文件
    template: './src/main/index.html',
    
    // 以上面配置好的输出路径为路径，输出的名称。
    filename: 'index.html',

    // 里面所有的引入都是按照 index.html这层所在地址 进行相对路径写的。
  }),
```

##### 5 html里对刚才的js css引入

* 上面保留一句话：
```
里面所有的引入都是按照 index.html这层所在地址 进行相对路径写的。
```
* 也就是说，我们不关心它是怎么处理的，把需要的引入如何引入的。我们只需要关心引入后的相对路径对不对。只要配置好index.html的位置，其他都是会以正确的相对路径进行引入。

* 这个开启的话，上面的刚才说的就会失效。
```
publicPath: '/dist/',
```

##### 6 字体文件和图片的输出

* 这个输出的路径还是已经上面配置好的路径进行输出的。至于里面的各自的文件夹的配置：虽说是自己配置的，但是决定性因素还是要和src里面的结构一样。
```
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
    name: 'img/[name].[hash:7].[ext]'
  }
}
```
* 为什么要一样的目录输出？因为ExtractTextPlugin的输出的css可以改变路径，index.html的css引入也可以相应的进行改变，但是在css里，引入的img和font就还是原来的路径。
* 所以无形中，css的配置路径也是要和src里一样，实质是由img和font决定的。
* 那么如果js需要引入img文件，刚才测试下。会说找不到img,因为devServer是以src为根路径的，图片会以src下找。遇见这样的情况，还是在css里使用就好了。JS操作类名就行。
* 但是其他依赖的文件会以src为根目录进行请求资源。

```
devServer: {
  port: 1234,
  contentBase: "./src",
  historyApiFallback: true,
  // hot: true, // 配置HMR之后可以选择开启
  noInfo: true,
  inline: true // 实时刷新
},
```

##### 7 最终打包的输出配置

* 这步，我没有写配置实现，但是思路是这样的：
```
1.和gulp一样指定一个模块的路径
2.还要指定特别的：img的路径，和字体文件的路径。
3.JS不需要指定。JS相对是自由的。

指定的来源还是来自src下 模块的目录结构。
```

##### 8 实现配置

```
// 指定测试哪个模块
var one = './src/main_2/';

//  指定其他配置项：目标根路径，img图片压缩的地址，字体压缩的地址
var opts = {
  // 目标文件夹
  src: one,

  // 目标文件夹
  dist: "webapp",
  img: 'imgs',
  font: 'fonts',
};
```

* gulp:是实时打包，服务是以webapp编译后的文件为服务的
* webpack:是以dev模式下的文件起服务的。编译时另外一个。index.html更新不会有变化，主要是监听和js有关的所有。