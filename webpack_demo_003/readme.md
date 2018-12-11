# webpack step 3

### 1.说明

* 配置优化：按需引入和公共模块的打包。
* 本项目主要是针对vue组件进行测试，重在满足如何在公司协作开发。和gulp开发思想一样，每个人负责一个功能模块。

### 2.组件入口测试HTML 和JS：

```
src/vue_demo/index.html index.js  
```
* 因为我们知道webpack dev模式下，需要指定该组件的测试用的HTML和JS，或作为最终该页面的HTML和JS。

### 3.输出css（在JS内部）里引入的img路径问题：

```
1.在入口HTML里把vue.js公共文件引入；
2.入口js里引入.vue组件文件，.vue组件引入less、.vue文件。
3.less:不管src下业务模块的哪个层的组件的less，最终都会被写入拥有该less的组件，打包输出的JS里，不会每个小组件式地单独剥离出来。
4.img:每个小组件less里面所有的img图片都被最后打包到业务网模块文件夹下的imgs文件夹，无论小组件在哪里引入。
5.打包输出后的css（在JS内）里的img路径：css被写入JS内，小组件的imgs被归为一起，css里img路径都会被输出成最终img的输出目录路径，这是vue-loader是强大之处。
```

* 注意1：JS里引入的img地址，webpack不会把img抽取出来，更不会改变最终被打包输出的JS内的img输出路径。遇见这样的问题需要手动将这部分的JS放入最后打包的地方。（问题：找可以抽出来的包）
* 注意2：测试模式，src会被作为一个静态资源的服务器的根目录，所以测试时内部的img路径是这样的。

```
conf: {
  dev_img_url: '/vue_demo/mid_main',
  build_img_url: ".",
},

var img_url = '';
if (conf.build) {
  img_url = me.conf.build_img_url;
}
else {
  img_url = me.conf.dev_img_url;
}

```
* 注意3：echarts的地球展示，需要在服务器端口的模式进行展示。文件访问会有错。

---------------------

* JS开发【输出后的css里的img引用不会变化】less直接被引入JS中，less会被剥离成css，那么会有个css的输出路径，但是因为css剥离出来后，里面引用的img地址不会变，所以无形中imgs和fonts的输出路径就被固定了。剥离出来css这个插件还不够强大。
* vue【输出后的css里的引用可变化】vue中，less不会被剥离，是被输出到JS内，且css内的img按照我们设置好的路径进行归入，最为重要的是JS里的css的img引用也会随之变化。vue-loader在处理引入JS内的less的图片地址就比较厉害了。

### 3.异步加载组件或JS及输出问题：

* 我们自己配置的webpack可以识别异步引入的组件和JS模块，
* vue组件异步加载:

```
const left_all_info = resolve => require([
  '../left_1_all_info/index.vue'
], resolve);
```

* JS模块异步加载：

```
require.ensure([], function(require) {
  var a = require('./a.js');
  console.log(a);
}, 'a');
```

* 不一样的异步加载模块方式
* 最后，打包的名字不一样。vue异步组件打包的名称是从0开始命名，而我们用的JS模块是用自己的文件名，这个也得注意。

### 4.公共包的引入和输出：

* 注意：这个公共包的输出就是在项目内部全部引入某个组件库的时候才这样用。
```
【引入】
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
```

```
【输出】
    entry: {
      index: `${opts.src}index.js`,
      // 依赖的公共文件，需要单独打包在下面--CommonsChunkPlugin--就要具体设置下。
      ele_ui: ['element-ui'],
    },
    plugins: [
      // 公共文件输出的路径和名字
      new webpack.optimize.CommonsChunkPlugin({
        // 寻找数组中每个入口的公共名字进行提取
        name: ['ele_ui'],
        // 控制输出地址和名字设置
        filename: 'common.[name].[hash:7].js',
        minChunks: Infinity,
      }),
      
    ],
```

### 5.按需引入和输出：

* 如果是按需引入，那么确实最后是按照需要进行打包，但是是打包在引用的那个JS中了，不能分开打包。
```
1 需要下载个插件
cnpm install babel-plugin-component -D

2 【.babelrc配置文件】指定下element-ui是按需引入的库
{
  "presets": [
    ["es2015", { "modules": false }]
  ],
  "plugins": [["component", [
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-default"
    }
  ]]]
}

3.想用哪个组件就用哪个
引入:
  import {Button,Radio} from 'element-ui'
使用:
  a). Vue.component(Button.name, Button);  √
  b). Vue.use(Button);  √
```



