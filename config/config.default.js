/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587884892360_4204';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: [ '*' ], // ['http://localhost:8080']
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7002,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  const mongoose = {
    clients: {
      epubbook: {
        // url: 'mongodb://127.0.0.1:27017/epubbook',
        url: 'mongodb://150.109.105.237:27017/epubbook',
        options: {
          user: 'epubbookUser', // 数据库账号
          pass: '123456', // 数据库密码
          useUnifiedTopology: true,
        },
      },
    },
  };
  const user = { // 初始化后台管理管理员的账号
    userName: 'admin',
    password: '123456',
  };
  const session = {
    maxAge: 3600 * 1000,
  };

  const jwt = {
    cert: 'liaokui', // jwt秘钥
  };
  const multipart = {
    fileSize: '50mb',
    mode: 'stream',
    // will append to whilelist
    fileExtensions: [ '.epub' ],
  };

  return {
    ...config,
    ...userConfig,
    mongoose,
    user,
    session,
    jwt,
    multipart,
  };
};
