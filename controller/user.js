/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');
var User=mongoose.model('User');
var fs=require('fs');
var file="../image_url.json";
//token
var jwt = require('jsonwebtoken');
var secret = 'SALLEN-JWT-mygoddess';
/*登录*/
exports.login=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
  if(username.length == 0 || password.length == 0){
      res.json({
          "IsSuccess": 0,
          "Message": "用户名密码不能为空"
      });

  }else if(username.length < 11 || password.length < 6){

      res.json({
          "IsSuccess": 0,
          "Message": "用户名密码错误"
      });
  }else{

      User.findOne({username:username}, function (err, docs) {

          var len = "";
          if(docs){
              len = docs.length;
          }
          if(err){
              res.json({"IsSuccess":0,"Message":"网络异常"});/*ÏµÍ³´íÎó*/
          }else if(docs==null || len <= 0){
              res.json({"IsSuccess":0,"Message":"用户未注册"});/*ÓÃ»§Ãû²»´æÔÚ*/
          } else {
              if(docs.password==password){
                  var user_token = jwt.sign({
                      username: username,
                      password:password,
                      id:docs._id,
                      createTime:docs.createTime
                  }, secret, {
                      expiresIn: '7d'
                  });

                  res.json({"IsSuccess":1,"Data":{
                      "username":username,
                      "password":password,
                      "token":user_token

                  }});/*×¢²á³É¹¦*/
              }
              else{
                  res.json({"IsSuccess":0,"Message":"密码错误"});
              }
          }
      })

  }
}
/*注册*/
exports.register=function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    if(username.length == 0 || password.length == 0){
        res.json({
            "IsSuccess": 0,
            "Message": "用户名密码不能为空"
        });

    }else if(username.length < 11 || password.length < 6){

        res.json({
            "IsSuccess": 0,
            "Message": "用户名密码错误"
        });
    }else{

        User.findOne({username:username}, function (err, docs) {
            var len = "";
            if(docs){
                len = docs.length;
            }

            if(err){
                res.json({"IsSuccess":0,"Message":"网络异常"});/*ÏµÍ³´íÎó*/
            }else if(docs == null || len <= 0){
                /*±£´æÓÃ»§*/
                var newUser= new User(
                    {
                        username:username,
                        password:password,
                        createTime:Date.now()
                    }
                );

                newUser.save(function(err){
                    if(err){
                        res.json({"IsSuccess":0,"Message":"网络异常"});/*ÏµÍ³´íÎó*/
                    }else{

                        //var user_token = jwt.sign({
                        //    username: username,
                        //    password:password,
                        //    id:docs._id,
                        //    createTime:docs.createTime
                        //}, secret, {
                        //    expiresIn: '7d'
                        //});
                        res.json({"IsSuccess":1,"Data":{

                        }});

                    }
                });
            } else {
                res.json({"IsSuccess":0,"Message":"用户已注册"});/*ÓÃ»§ÒÑ¾­±»×¢²á*/
            }
        })

    }

}
/*卡片照片请求*/
exports.cardUrl = function (req, res) {
    var result = JSON.parse(fs.readFileSync(file));
    res.json({
        "IsSuccess": 1,
        "Data": result
    });
}

/*系统通知请求*/
exports.systemNotification = function (req, res) {

    console.log("接收到请求头"+req.headers);
    if(req.headers.token){
        if(req.headers.token.length > 0){

            var token = req.headers.token;
            jwt.verify(token, secret, function(err, decoded) {
                if(err){
                    res.json({"IsSuccess":0,"Message":"网络异常"});
                }else{
                    User.findOne({username:decoded.username}, function (err, docs) {

                        var len = "";
                        if(docs){
                            len = docs.length;
                        }
                        if(err){
                            res.json({"IsSuccess":0,"Message":"网络异常"});/*ÏµÍ³´íÎó*/
                        }else if(docs==null || len <= 0){
                            res.json({"IsSuccess":0,"Message":"用户未注册"});/*ÓÃ»§Ãû²»´æÔÚ*/
                        } else {
                            if(docs.password==decoded.password){
                                res.json({
                                    "IsSuccess": 1,
                                    "Data": [{
                                        "tittle":"欢迎使用何言何语",
                                        "detail":"恭喜您成为何言何语用户",
                                        "createTime":docs.createTime,
                                        "webUrl":""

                                    }]
                                });
                            }
                            else{
                                res.json({"IsSuccess":0,"Message":"网络异常"});
                            }
                        }
                    })

                }

            });

        }

    }else{
        res.json({"IsSuccess":0,"Message":"非法用户"});

    }

}




