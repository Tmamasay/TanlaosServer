'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545916753657_3659';
 // 添加 view 配置
  exports.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      // '.html': 'ejs'
      '.tpl': 'ejs'
    },
  };
  //添加mysql配置
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: 'root',
    // 数据库名
    database: 'admin',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
// 关闭csrf验证
config.security = {
  csrf: {
    enable: false,
    ignoreJSON: true,
  },
  // 白名单
  // domainWhiteList: [ 'http://127.0.0.1:5500' ],
};
// config.proxy = true;
// 允许规则
config.cors = {
  origin:'*',//允许跨域 注释允许白名单访问
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
};

  // add your config here
  config.middleware = [];

  return config;
};
