# webpack step 3

### 1.说明

```
"webpack": "^2.2.1",
"webpack-dev-server": "^2.3.0"
```
* 项目类型：vue
```
【优化】
1：vue项目中各种模块的引入和配置。
2：各模块内对img路径引用问题。
3：各模块内对其他后缀名的引用和输出问题。
```

* 测试入口：webpack dev模式下，需要指定测试该cpt的用的HTML和JS，或作为最终该cpt的HTML和JS。设计的思想和gulp开发一样，每个人负责一个功能模块。

### 2.模块的引入

#### 2.1 commonjs同步引入

* 一般都是第三方的公共包这样引入，在webpack配置公共包的输出。
```
【引入】这个文件会被打包到引入到的这个JS内。
var out_sync = require('./out_sync.js');
```

#### 2.2 commonjs异步加载JS模块【推荐】

* 无论在哪个目录下的引入，都会打包到当前指定的目录下。
* common_1是打包的时候的文件名。
```
【引入】
require.ensure([], function(require){
    var out_async_1  = require('./out_async_common/1.js');
},'common_1'); 

【输出】
    output: {
      【异步加载的文件输出配置】
      chunkFilename: 'async.[name].[hash:7].js',
    },
```

#### 2.3 commonjs 多文件打包，异步加载

* 由一个require.ensure进行引入，文件最终会被打包在一个文件下。
```
require.ensure([], function(require){
    var out_async_2  = require('./out_async_common/2.js');
    var out_async_3  = require('./out_async_common/3.js');
},'common_2_3'); 
```

#### 2.4 commonjs预加载懒执行 

* 第一个数组参数是浏览器执行到这就会下载，但是不会执行，直接地方在require
```
require.ensure(['./out_async_common/4.js'], function(require){
    【执行】
    var out_async_4 = require('./out_async_common/4.js');
},'common_4');
```
* 这种写法变扭，像是commonjs和AMD的结合体，而且一个模块名称还要写两次，

----------------------

#### 2.5 AMD异步加载JS

* AMD的方式无法传入第三个参数当文件名，所以得不到很好看的文件。不推荐使用
```
require(['./out_async_AMD/1.js'], function(AMD_1){
});
```

----------------------------------

#### 2.6 ES6 import JS模块

* 同步引入
```
import out_sync_1 from './out_sync.js';
==
var out_sync = require('./out_sync.js');
```

----------------------------------

#### 2.7 ES6 import VUE组件

* 同步引入：会被打包在被引入的JS内。
```
import cpt_normol from '../cpt_normol/index.vue';
```

#### 2.7 AMD异步引入 VUE组件

* 局部组件，异步(所以打包输出的时候没有名字)
```
const cpt_normol = resolve => require([
  '../cpt_normol/index.vue'
], resolve);
```

* 全局组件
```
const cpt_normol = Vue.component('cpt_normol', function (resolve) {
    require(['../cpt_normol/index.vue'], resolve);
});

或ES6写法：
const cpt_normol = Vue.component('cpt_normol', resolve => require([
  '../cpt_normol/index.vue'
], resolve));
```

* 无论是局部组件和全局组件，我们的需求就是，想在它被用户用的时候再进行加载，不用的话就不用加载。但是如何做到这点，是和指令有关系。比如这里的组件，我们想点击的时候再加载，就是是用`v-if=false`指令，而不是用`v-show`，有区别：`v-show`是已经要加载了，只是没有显示出来；`v-if=false`完全是不要这个cpt。这个一定要注意。

#### 2.8 异步引入组件的工厂函数

* 这个意义除了可以异步引入组件，也可以设置引入错误时的应该出现的组件，加载时的组件。完美优化了异步组件的所有方式。
```
const cpt_normol = resolve => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: require(['../cpt_normol/index.vue'], resolve),
  // // 异步组件加载时使用的组件
  // loading: LoadingComponent,
  // // 加载失败时使用的组件
  // error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 2000,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  // timeout: 3000
});
```

#### 2.9 按需引入第三方组件，不能分离打包（同步）

* 如果是按需引入，那么最后是按照需要进行打包，打包在引用的那个JS中了，不能分开打包。主要因为是同步引用。
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

3.
引入:
  import {Button,Radio} from 'element-ui'
使用:
  a). Vue.component(Button.name, Button);  √
  b). Vue.use(Button);  √
```

#### 3.0 同步引入第三方包，打包分离

```
【引入】公共包的引入和输出
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
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

* 总的来说：加载的问题就基本说完了。
* 1.如果是自己用的包，推荐使用commonjs异步加载JS模块；
* 2.如何是第三方包，可以按需引入就按需引入，弊端就是会一起打包。当超过一定大小的时候，就直接全部同步引用这个包，方式：第三方引入或者在HTML引入。
* 3.组件：异步引入。



### 3.HTML、css、JS内对img的引用

#### 3.1 css内对img的引用

* 用法：该怎么用就怎么用。
* 入口js里引入cpt组件，cpt组件引入less和其它.vue文件。
* 【less的被输出】不管src下业务模块的哪个层的cpt的less，最终都会被写入拥有该less的cpt，被打包输出的JS里。不会从每个cpt中单独剥离出来。
* 【.jpg的被输出】每个小组件less里面所有的img图片都被最后打包到业务网模块文件夹下的imgs文件夹，无论小组件在哪里引入。
* 【打包输出在JS内的css里的img路径问题】css被写入JS内，小组件的imgs被归为一起，css里img路径都会被输出成最终img的输出目录路径，这是vue-loader是强大之处。
 
#### 3.2 JS内对img的引用

* 因为像ec这种插件有的需要在JS内引入img，直接引入的话，webpack不会把img抽取出来，更不会改变最终被打包输出的JS内的img输出路径。
* 使用：在JS内相对路径进行引入，打包过程和结果和CSS内引入img最终的结果是一样的。
```
require('./img/map_wl.jpg')
```

#### 3.3 HTML内对img的引用

* 同样是直接引用就行，打包方式同上。

-------------------------------


### 4.其他的引用和输出

* 遇到这么个问题，ec组件内有个JS需要引入`'./xx.hdr'`这种后缀的文件。不仅在打dev模式会出错，buildy也会出错。
* 于是我就想的这样：dev模式，src会被作为一个静态资源的服务器的根目录，所以测试时内部的img路径是这样的。bulid就自己手动挪过去。

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

* 其实可以这样：针对这样不认识的后缀名文件，多一项配置。
```
【hdr】
{
  test: /\.hdr$/,
  loader: 'url-loader',
  query: {
    name: `${opts.img}/[name].[hash:7].[ext]`
  }
}
```

* 那么就可以理解这个module是干嘛的了，就是webpack在识别各个被引入模块的时候，需要做的编译处理或输出配置。

------------------------------

### 其他：

* 优化：把dev和build的rules单独拿出来，形成公共配置项。
* 【DOM项目】
```
1.css引入到哪里？
引入在JS内部被引入：var style = require('./async_test.js');  import './index.less';

2.被输出到哪里？
被单独作为CSS文件输出，不会被打包到JS内。
输出路径是我们配置好的：new ExtractTextPlugin('[name].[hash:7].css')

3.img路径问题？
被输出的css里对img的引用问题，img也有相应的loader处理，指定img的处理路径，CSS内部的img路径也会相应的变化。原来的认识是错误的，css内的img的路径是会改变的。img和font没有被固定。

------------------------------------------------
【见鬼了】把dev和build的rules单独拿出来，形成公共配置项。再次打包DOM项目，见鬼了。尽然把CSS打包到JS内部了。如果这样的话，那么就和vue项目没有区别了，都是被打包到JS内部了。

```

* 【vue项目】
```
1.css引入到哪里？
vue文件的<style lang="less"> @import './index.less'; </style>

2.被输出到哪里？
会被打包到JS内部。那就是 没有单独的路径了。

3.img路径问题？
和上面一样，img和font的输出配置到哪里，这个被打包JS内的css的对img和font引用就相对应的改变。
```

### 问题：

* 1.css何时会把单独分离？何时会被打包到JS内部？








