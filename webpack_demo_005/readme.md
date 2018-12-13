# vue + webpack + express 2个端口（前后监测）

### 1.说明

```
"webpack": "^2.2.1",
"webpack-dev-server": "^2.3.0"
```

* 解决`seven_review`项目开发过程中最大的弊端，也是优化`webpack-04`的缺点。
* 实现前后2个端口开发。完全的好处：前端有监听前端的JS和HTML的dev服务，后台有后台代码监听的功能。
* 真的很爽，开启两个服务，完全不用ctrl+C断开，重新开启。


### 2.代理服务

```
【关闭接入本地服务器】
setup: function(app) {
  // require('./api_server/app.js')(app);
},
【开启代理服务器】所有/api的路径开头的接口都用代理的服务提供的端口，那么我被代理的真实服务就可以实现监测，和自动重启了。
proxy: {
  '/api': {
    target: `http://localhost:${conf_local.api_port}`,
    pathRewrite: {
      '^/api': '/api'
    }
  }
},
```

* 指令
```
  "scripts": {
    "dev": "set NODE_ENV=dev&&node ./webpack.config.js",
    "api": "set NODE_ENV=production&&node ./api_server/app_auto.js",
    "build": "set NODE_ENV=production&&node ./webpack.config.js&&node ./api_server/app.js",
    "esc_db": "set NODE_ENV=esc_db&&node ./cmd.js",
    "db_dn": "set NODE_ENV=db_dn&&node ./cmd.js",
    "db_up": "set NODE_ENV=db_up&&node ./cmd.js",
    "git": "set NODE_ENV=git&&node ./cmd.js"
  },
```

* app_auto.js
```
var nodemon = require('gulp-nodemon');
var path = require('path');
nodemon({
  script: path.join(__dirname,'./app.js'),
  ignore: [
    path.join(__dirname,'../src/'),
    path.join(__dirname,'../webapp/'),
    path.join(__dirname,'../webpack.config.js'),
    path.join(__dirname,'../cmd.js'),
  ],
  env: { 'NODE_ENV': 'development' }
});
```

* 到此，基本就是最完善的架子了。形成`006-project/000_template`















