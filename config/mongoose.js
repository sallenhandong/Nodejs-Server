/**
 * Created by jefactoria on 17/2/8.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var config = require('./db_url.js');
module.exports = function(){
    var db = mongoose.connect(config.mongodb);
    require('../model/user.js');
    require('../model/userProfile.js');
    require('../model/article.js');
    return db;
}