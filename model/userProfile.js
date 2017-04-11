/**
 * Created by jefactoria on 17/2/11.
 */
var mongoose = require('mongoose');
var userProfileSchema = new mongoose.Schema({
    nickName: String,
    detailDescription: String,
    avatar: {
        fileName: String,
        filePath: String
    },
    user_id:String

});
mongoose.model('UserProfile',userProfileSchema);
