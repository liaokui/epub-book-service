'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 后台授权中间件
  const auth = app.middleware.auth();

  // 接口api
  // 验证验证码
  router.get('/api/getCaptcha', controller.login.getCaptcha);
  // 登录
  router.post('/api/login', controller.login.login);

  // 上传
  router.post('/api/upload/img', auth, controller.upload.img);
  router.post('/api/upload/epub', auth, controller.upload.epub);

  // // 图书
  router.get('/api/book/find', auth, controller.book.find);
  router.get('/api/book/detail', auth, controller.book.detail);
  router.post('/api/book/remove', auth, controller.book.remove);

  // 图书主题
  router.get('/api/theme/find', auth, controller.theme.find);
  router.post('/api/theme/update', auth, controller.theme.update);

  // 笔记
  router.get('/api/note/find', auth, controller.note.find);
  router.post('/api/note/update', auth, controller.note.update);
  router.post('/api/note/create', auth, controller.note.create);
  router.post('/api/note/remove', auth, controller.note.remove);

};
