// // commonjs同步语法
// var out_sync = require('./out_sync.js');
// // console.log(out_sync);


// // commonjs异步加载JS模块
// require.ensure([], function(require){
//     // 无论重什么地方引入都会打包到这个地方。
//     var out_async_1  = require('./out_async_common/1.js');
// },'common_1'); // 最后这个参数是名称的方式

// // commonjs 多文件打包，异步加载
// require.ensure([], function(require){
//     var out_async_2  = require('./out_async_common/2.js');
//     // console.log(out_async_2);
//     var out_async_3  = require('./out_async_common/3.js');
// },'common_2_3'); 

// // commonjs预加载懒执行  第一个参数就是浏览器执行到这就会下载，但是不会执行，
// require.ensure(['./out_async_common/4.js'], function(require){
//     // require的时候才是执行。
//     var out_async_4 = require('./out_async_common/4.js');
// },'common_4');

// 这种写法变扭，像是commonjs和AMD的结合体，而且一个模块名称还要写两次，真是不够优雅。所以webpack自己定义了一个方法，能够实现预加载。

// ==================================================

// AMD的方式无法传入第三个参数当文件名，所以得不到很好看的文件。 不推荐使用
// AMD异步加载
// require(['./out_async_AMD/1.js'], function(AMD_1){
//     // console.log(AMD_1);
// });


// ==================================================
// ES6 import 模块
// import out_sync_1 from './out_sync.js'; //== var out_sync = require('./out_sync.js');



// ==================================================
// ES6 import 同步：普通组件
// import cpt_normol from '../cpt_normol/index.vue';

// 及时异步加载：会异步加载的JS，
// 但是啥时候需要他加载 是和指令有关系，这里已经是异步加载的方式.
// 使用的是AMD规范。

// 局部组件--异步加载
// const cpt_normol = resolve => require([
//   '../cpt_normol/index.vue'
// ], resolve);


// 全局组件--异步加载
// const cpt_normol = Vue.component('cpt_normol', function (resolve) {
//     require(['../cpt_normol/index.vue'], resolve);
// });


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




// 异步加载 带有图的 模块
const cpt_JSimg = resolve => require([
  '../cpt_JSimg/index.vue'
], resolve);



// 异步加载 eleUI 模块
// const cpt_eleUI = resolve => require([
//   '../cpt_eleUI/index.vue'
// ], resolve);










export default {
  components: {

    cpt_JSimg:cpt_JSimg,
    // cpt_eleUI:cpt_eleUI,

    cpt_normol: cpt_normol,
  },
  // name: 'main_app',
  data: function() {
    return {
      // 所有的配置项
      conf: {
        cpt_normol_show: false,
      },
      // api
      api: {},


    }
  },
  mounted: function() {
    var me = this;

    // setTimeout(function () {
    //   console.log(1);
    //   me.conf.cpt_normol_show = true;
    // },1000);

    me.cc_init();

    // 响应
    me._resize();
  },
  methods: {
    //
    cc_init: function() {},



    // 表格的自动适应
    _resize: function(argument) {
      var me = this;

      $(window).on('resize', function(argument) {
        echarts.init(document.getElementById('sn')).resize();
        echarts.init(document.getElementById('earth')).resize();
      });
    },
  },
}
