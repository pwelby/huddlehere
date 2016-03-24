var mongoose = require('mongoose');
var MET = mongoose.model('Meeting');


module.exports.agendaCreate = function(req,res){
    sendJsonResponse(res, 200, {"status" : "test success"});
};

module.exports.agendaRead = function(req,res){
    sendJsonResponse(res, 200, {"status" : "test success"});
};

module.exports.agendaUpdate = function(req,res){
    sendJsonResponse(res, 200, {"status" : "test success"});
};

module.exports.agendaDelete = function(req,res){
    sendJsonResponse(res, 200, {"status" : "test success"});
};

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};