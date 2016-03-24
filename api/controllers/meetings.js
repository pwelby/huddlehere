var mongoose = require('mongoose');
var MET = mongoose.model('Meeting');


//All api calls are filled with fake successes for now
module.exports.meetingsList = function(req,res){
    sendJsonResponse(res, 200, {"status" : "test success"});
};

module.exports.meetingsCreate = function(req,res){
    sendJsonResponse(res, 200, {"status" : "test success"});
};

module.exports.meetingsRead = function(req,res){
  console.log('looking up meeting information', req.params);
  if (req.params && req.params.meetingid) {
    MET
      .findById(req.params.meetingid)
      .exec(function(err, meeting) {
        if (!meeting) {
          sendJSONresponse(res, 404, {
            "message": "meetingid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(meeting);
        sendJSONresponse(res, 200, meeting);
      });
  } else {
    console.log('No meetingid specified');
    sendJSONresponse(res, 404, {
      "message": "No meetingid in request"
    });
  }
};

module.exports.meetingsUpdate = function(req,res){
    sendJsonResponse(res, 200, {"status" : "test success"});
};

module.exports.meetingsDelete = function(req,res){
    sendJsonResponse(res, 200, {"status" : "test success"});
};
//sends success always for now
var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};