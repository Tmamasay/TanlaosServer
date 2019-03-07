'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //渲染首页页面
  router.get('/', controller.home.index);
  //渲染新闻页面
  router.get('/news', controller.home.news);
  //更新图片
  router.post('/uploadimg', controller.home.uploadimg);
  //删除图片
  router.post('/delImg', controller.home.delImg);
  //提交表单
  router.post('/submit', controller.home.submit);
  //查询表单
  router.get('/selectMessage', controller.home.selectMessage);
  //查询文章
  router.get('/selectArticle', controller.home.selectArticle);
  //删除文章
  router.post('/delArticle', controller.home.delArticle);
  //提交富文本
  router.post('/commitText', controller.home.commitText);
  
};
