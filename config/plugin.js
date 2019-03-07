'use strict';

// had enabled by egg
// exports.static = true;
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs'
};
//开启mysql数据库插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
//解决跨域插件
exports.cors = {
	enable: true,
	package: 'egg-cors',
};
