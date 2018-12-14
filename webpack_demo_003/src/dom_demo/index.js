// 异步组件

require.ensure([], function(require) {
  var async_test = require('./async_test.js');
  console.log(async_test);
}, 'async_test');

// 引入外部样式
var style = require('./index.less');

$('#app')
  .html('这只是个简单的打包 demo2-1');
// .css('background','url("./img/logo.png")');
