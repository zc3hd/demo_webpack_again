# webpack step 2

### 1.说明

```
"webpack": "^2.2.1",
"webpack-dev-server": "^2.3.0"
```
* 这个版本是以inline方式，node api的方式实现配置。

### 2.自动刷的知识点了解

* webpack会自动刷新，这个都是知道哈。但是自动刷分为两个模式。一个是iframe模式，一个是inline模式。

#### 2.1 iframe模式
* iframe模式不需要额外的配置,只需要以下面这种URL格式访问即可
* 这个模式不推荐使用，还要在URL里面加webpack-dev-server，比较反人类。页面上也有更新状态的信息。

```
http://«host»:«port»/webpack-dev-server/«path»
```

#### 2.2 inline模式

* inline模式又分为两个方法实现，这两个方法应用到不同的场景：
* **命令行方法** 就是上一版本中使用的方法，比较大众，适应于公司项目的开发，主要因为是模块化，员工相互之间可以配合。算是比较实用。
* **api方法** api首先知道启动的时候是以node执行一个文件进行启动，主要是应用于后台是node的自己开发，前后通吃的使用。

-----------

##### 2.2.1 命令行方法  dev

* 前一版本用到的：当以命令行启动webpack-dev-server时,需要做两点：

```
在命令行中添加--inline命令
"scripts": {
   "dev": "cross-env NODE_ENV=development webpack-dev-server --open --inline --hot",
},


在webpack.config.js中添加
devServer:{inline:true}
```

##### 2.2.2 node_api方法 dev

* 命令启动：

```
  "scripts": {
    "dev": "node ./build/mode-dev.js",
  },
```

* 配置文件：关心入口JS，和HTML即可
* JS：入口处多加一个地址：
```
entry: ["webpack-dev-server/client?http://localhost:" + config.dev.port + "/", config.commom.app],
```

* 入口HTML里添加：实践后，这个是没有用的
```
<script src="http://localhost:8080/webpack-dev-server.js"></script>
```

* 配置文件：

```
var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'build/',
    publicPath: "/assets/"
});
server.listen(8080);
```

----------------------------------------


### 3.接下来就是inline模式下的热加载

#### 3.1 命令行方法 dev

```
webpack-dev-server --content-base build --inline --hot
```

#### 3.2 node api方法  dev

* 入口JS加：
```
webpack/hot/dev-server
```

* 配置文件：
```
plugins选项中添加:new webpack.HotModuleReplacementPlugin()
hot:true
```

* 官方说明看这个[WebpackDevServer](https://segmentfault.com/a/1190000006964335)

----------------------

### 4.inline模式 node api方法 实战

* dev具体用的时候，又有点问题。

```
1. HTML里不需要加：<script src="http://localhost:8080/webpack-dev-server.js"></script>

2.路径问题：可以看到，现在这个配置文件在build/mode-dev.js,
我在build目录下，但是内部要测试模块的的文件路径是：
'./src/main/';  不是：'../src/main/';
这个要注意了，可能是因为我CMD执行node命令的目录就是在 和src同级目录下，所以要求node执行的文件的路径是以和src通目录的路径下开始的。
要改的话，我觉得webpack.config.js的配置文件直接放在src目录就就行了，省去的路径的问题。

其实上面是另外一个问题，就是路径的引入是包还是文件，若是文件要用绝对路径。
这个的话，就需要改下。

3.发现个特别的地方，就是dev模式下，改HTML也跟着会刷新哎，这个比第一版强了。

4.build模式也测试完了，感觉和前面的没有什么区别，写在一个文件下了。这个版本就是无论公司开发还是自己做node后台开发都可以用了。
```

