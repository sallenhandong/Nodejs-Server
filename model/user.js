/**
 * Created by jefactoria on 17/2/8.
 */
var mongoose = require('mongoose');
var userSchema = new  mongoose.Schema({
    username:String,
    password:String,
    createTime:String

});
mongoose.model('User',userSchema);
