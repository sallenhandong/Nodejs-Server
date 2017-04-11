/**
 * Created by jefactoria on 17/2/11.
 */
var mongoose=require('mongoose');
var UserProfile=mongoose.model('UserProfile');
//token
var jwt = require('jsonwebtoken');
var secret = 'SALLEN-JWT-mygoddess';
/*用户个人信息*/
exports.userProfile = function(req,res){
    if(req.headers.token){
        if(req.headers.token.length > 0){

            var token = req.headers.token;
            jwt.verify(token, secret, function(err, decoded) {

                var user_id = decoded.id;
                if(err){
                    res.json({"IsSuccess":0,"Message":"网络异常"});
                }else{
                    UserProfile.findOne({user_id:decoded.id}, function (err, docs) {

                        var len = "";
                        if(docs){
                            len = docs.length;
                        }
                        if(err){
                            res.json({"IsSuccess":0,"Message":"网络异常"});/*ÏµÍ³´íÎó*/
                        }else if(docs==null || len == 0){
                            console.log('第一次请求用户个人信息');
                            var newUser= new UserProfile(
                                {
                                    nickName: "何言何语",
                                    detailDescription: "一言一语一杯酒,带上故事一起走",
                                    avatar: {
                                        fileName: "",
                                        filePath: ""
                                    },
                                    user_id:decoded.id
                                }
                            );

                            newUser.save(function(err){
                                if(err){


                                }else{

                                    res.json({
                                        "IsSuccess": 1,
                                        "Data": {

                                            user_id: user_id,
                                            nickName: "何言何语",
                                            detailDescription: "一言一语一杯酒,带上故事一起走",
                                            avatar: {
                                                fileName: "",
                                                filePath: ""
                                            }

                                        }

                                    });


                                }

                            });


                        } else {
                            console.log('第二次请求用户个人信息');
                            res.json({
                                "IsSuccess": 1,
                                "Data": {

                                    user_id: docs.user_id,
                                    nickName: docs.nickName,
                                    detailDescription:docs.detailDescription,
                                    avatar: {
                                        fileName: docs.avatar.fileName,
                                        filePath: docs.avatar.filePath
                                    }


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

/*上传用户头像*/
exports.uploadImage = function (req, res) {
    if(req.headers.token){
        if(req.headers.token.length > 0){

            var fileName = req.body.fileName;
            var filePath = "http://ol3dvbzan.bkt.clouddn.com/" + fileName  + "?" + Math.random();


            var token = req.headers.token;
            jwt.verify(token, secret, function(err, decoded) {
                if(err){
                    res.json({"IsSuccess":0,"Message":"网络异常"});
                }else{

                    UserProfile.update({user_id:decoded.id},{$set:{avatar:{fileName:fileName,filePath:filePath}}},function(err){

                        if(err){
                            res.json({"IsSuccess":0,"Message":"上传失败"});

                        }else{

                            res.json({"IsSuccess":1,
                                "Data":{avatar:{fileName:fileName,filePath:filePath}}});
                        }


                    });

                }

            });

        }

    }else{
        res.json({"IsSuccess":0,"Message":"非法用户"});

    }

}
/*修改用户昵称描述*/
exports.updateUserInfo = function(req,res){

    var nickName = req.body.nickName;
    var detailDescription = req.body.detailDescription;

    if(req.headers.token){
        if(req.headers.token.length > 0){

            var fileName = req.body.fileName;
            var filePath = "http://ol3dvbzan.bkt.clouddn.com/" + fileName  + "?" + Math.random();


            var token = req.headers.token;
            jwt.verify(token, secret, function(err, decoded) {
                if(err){
                    res.json({"IsSuccess":0,"Message":"网络异常"});
                }else{
                    if(nickName != null && nickName.length > 0){

                        UserProfile.update({user_id:decoded.id},{$set:{nickName:nickName}},function(err){

                            if(err){
                                res.json({"IsSuccess":0,"Message":"修改失败"});

                            }else{

                                res.json({"IsSuccess":1,
                                    "Data":{nickName:nickName}});
                            }


                        });
                    }else if(detailDescription != null && detailDescription.length > 0){

                        UserProfile.update({user_id:decoded.id},{$set:{detailDescription:detailDescription}},function(err){

                            if(err){
                                res.json({"IsSuccess":0,"Message":"修改失败"});

                            }else{

                                res.json({"IsSuccess":1,
                                    "Data":{detailDescription:detailDescription}});
                            }


                        });


                    }else{

                        res.statusCode('404');


                    }



                }

            });

        }

    }else{
        res.json({"IsSuccess":0,"Message":"非法用户"});

    }






}