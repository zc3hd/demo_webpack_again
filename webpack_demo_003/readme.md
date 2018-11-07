# webpack step 3

### 1.说明

* 今天这个不是webpack配置文件的升级。
* 这个主要是针对vue组件进行测试，如何满足公司协作。

### 2.src模块目录

```
src/vue_demo/index.html index.js  
```
* 因为我们知道webpack dev模式下，我们是需要指定一个HTML和JS。
* 如果这个就是我们其中一个页面,或者大的组件，那么这个HTML和JS就是作为一个功能模块的测试输出。
* 如果这就是最后的页面，那么HTML和JS就是最后输出的HTML和JS。

### 3.build输出

* 1.在HTML里把vuejs引入；
* 2.因为入口js里只引入的是.vue文件，而vue里面引入相应的less js 文件。
* 3.less:不管src哪个层的组件的less，less最终都会被写入JS里，不会单独剥离出来。
* 4.img:发现less里面所有依赖的img图片都被最后打包到目标文件下的imgs文件夹下，不管在src的组件是哪层引用，最后都会被归为一起。
* 5.css里的img路径：因为css被写入JS内，imgs被归为一起，css里的图片路径都直接变成最终目录的路径形式，是因为在 .vue 文件中引用的结果么？那就是vue-loader是很强大的。

---------------------

### 4.build：vue与纯JS开发的比较

* 【css里的引用不可变化】和less直接被引入JS中不同，less会被剥离成css，被剥离的话，就会有个css的路径，但是因为css剥离出来里面引用的img地址不会变，所以无形中imgs和fonts就被固定了。因为JS中引入less，被剥离为css，内部引入不会变，所以img也无形中被固定。
* 【css里的引用可变化】vue中，less不会被剥离，且img按照我们设置好的路径进行编译写入，最为重要的是JS里的css的img引用也会随之变化。
 
---------------------

### 4.build：异步加载

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

* 要看到是不一样的异步加载模块，这个要注意
* 最后，打包的名字不一样。vue异步组件打包的名称是从0开始命名，而我们用的JS模块是用自己的文件名，这个也得注意。

* vue demo效果：
![image](https://github.com/zc3hd/demo_webpack_again/blob/master/webpack_demo_003/imgs/c2.gif)


