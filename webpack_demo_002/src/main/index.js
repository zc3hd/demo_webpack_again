// require.ensure([], function(require) {
//   var a = require('./a.js');
//   console.log(a);
// }, 'a');

const a = resolve => require([
  './a.js'
], resolve);


import './index.less';
// require('./index.less');
$('#app')
  .html('这只是个简单的打包 demo2-1');
// .css('background','url("./img/logo.png")');
