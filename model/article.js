/**
 * Created by jefactoria on 17/2/11.
 */
var mongoose = require('mongoose');
var articleSchema = new  mongoose.Schema({
    user_id:String,
    contents:[{
        isShow:Boolean,
        tittle:String,
        createTime:String,
        content:String

    }]
});
mongoose.model('Article',articleSchema);