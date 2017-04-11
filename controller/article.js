/**
 * Created by jefactoria on 17/2/11.
 */
var mongoose=require('mongoose');
var UserArticle=mongoose.model('Article');
//token
var jwt = require('jsonwebtoken');
var secret = 'SALLEN-JWT-mygoddess';


exports.updateArticle = function (req,res){


    var isShow = req.body.isShow;
    var tittle = req.body.tittle;
    var content = req.body.content;


    if(tittle.length <= 0 || content.length <= 0){


        return res.json({"IsSuccess":0,"Message":"标题内容不能为空"});

    }

    if(req.headers.token){
        if(req.headers.token.length > 0){

            var token = req.headers.token;
            jwt.verify(token, secret, function(err, decoded) {

                var user_id = decoded.id;
                if(err){
                    res.json({"IsSuccess":0,"Message":"网络异常"});
                }else{
                    UserArticle.findOne({user_id:decoded.id}, function (err, docs) {

                        var len = "";
                        if(docs){
                            len = docs.length;
                        }
                        if(err){
                            res.json({"IsSuccess":0,"Message":"网络异常"});/*ÏµÍ³´íÎó*/
                        }else if(docs==null || len == 0){
                            console.log('第一次上传文章');
                            var newUser= new UserArticle(
                                {
                                    user_id:decoded.id,
                                    contents:[{
                                        isShow:isShow,
                                        tittle:tittle,
                                        createTime:Date.now(),
                                        content:content

                                    }]
                                }
                            );

                            newUser.save(function(err){
                                if(err){


                                }else{

                                    res.json({
                                        "IsSuccess": 1,
                                        "Data": {
                                            tittle:tittle,
                                            content:content

                                        }

                                    });


                                }

                            });


                        } else {
                            console.log('第二次上传');
                            UserArticle.update({user_id:decoded.id},{"$addToSet":{"contents":{isShow:isShow,tittle:tittle,createTime:Date.now(),content:content}}},function(err){

                                if(err){
                                    res.json({"IsSuccess":0,"Message":"上传失败"});

                                }else{

                                    res.json({"IsSuccess":1,
                                        "Data":{
                                            tittle:tittle,
                                            content:content}
                                    });
                                }


                            });
                        }
                    })

                }

            });

        }

    }else{
        res.json({"IsSuccess":0,"Message":"非法用户"});

    }

}

exports.getUserArticle = function (req,res){


    if(req.headers.token){
        if(req.headers.token.length > 0){

            var token = req.headers.token;
            jwt.verify(token, secret, function(err, decoded) {

                var user_id = decoded.id;
                if(err){
                    res.json({"IsSuccess":0,"Message":"网络异常"});
                }else{
                    UserArticle.find({user_id:decoded.id}, function (err, docs) {

                        var len = "";
                        if(docs){
                            len = docs.length;
                        }
                        if(err){
                            res.json({"IsSuccess":0,"Message":"网络异常"});/*ÏµÍ³´íÎó*/
                        }else if(docs==null || len == 0){

                            res.json({"IsSuccess":0,"Message":"暂无文章"});
                        } else{



                        res.json({"IsSuccess":1,"Data": docs});



                        }
                    })

                }

            });

        }

    }else{
        res.json({"IsSuccess":0,"Message":"非法用户"});

    }

}

exports.getAllUserArticle = function(req,res){

    if(req.headers.token){
        if(req.headers.token.length > 0){

            var token = req.headers.token;
            jwt.verify(token, secret, function(err, decoded) {

                if(err){
                    res.json({"IsSuccess":0,"Message":"网络异常"});
                }else{
                    UserArticle.find({"contents":{"$elemMatch":{"isShow":true}}}, function (err, docs) {

                        var len = "";
                        if(docs){
                            len = docs.length;
                        }
                        if(err){
                            res.json({"IsSuccess":0,"Message":"网络异常"});/*ÏµÍ³´íÎó*/
                        }else if(docs==null || len == 0){

                            res.json({"IsSuccess":0,"Message":"暂无文章"});
                        } else{

                            res.json({"IsSuccess":1,"Data": docs});


                        }
                    })

                }

            });

        }

    }else{
        res.json({"IsSuccess":0,"Message":"非法用户"});

    }

}