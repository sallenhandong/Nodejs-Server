
var User = require('../controller/user');
var UserProfile = require('../controller/userProfile');
var UserArticle = require('../controller/article');
module.exports = function(app) {
  /*处理用户登录请求*/
  app.post('/phone_api/login',User.login);
  /*处理用户登录请求*/
  app.post('/phone_api/register',User.register);
  /*请求卡片分类的照片*/
  app.post('/phone_api/cardUrl',User.cardUrl);
  /*请求系统通知*/
  app.post('/phone_api/systemNotification',User.systemNotification);
  /*请求用户个人信息*/
  app.post('/phone_api/userProfile',UserProfile.userProfile);
  /*上传用户头像*/
  app.post('/phone_api/uploadImage',UserProfile.uploadImage);
  /*修改用户昵称描述*/
  app.post('/phone_api/updateUserInfo',UserProfile.updateUserInfo);
  /*上传用户文章*/
  app.post('/phone_api/updateArticle',UserArticle.updateArticle);
  /*获取用户文章*/
  app.post('/phone_api/getUserArticle',UserArticle.getUserArticle);
  /*获取所有用户文章*/
  app.post('/phone_api/getAllUserArticle',UserArticle.getAllUserArticle);

};