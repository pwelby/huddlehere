/**
 * File: agenda.js
 * Author: Alex Li
 * 
 * Defined controller for any api calls regarding meeting documents.
 * Currently performs CRUD operations
 */
var mongoose = require('mongoose');
var MEET = mongoose.model('Meeting');

//creates and adds a meeting document to database
module.exports.meetingsCreate = function(req,res){
    MEET.create({
        meetingDate: req.body.meetingDate,
        endTime: req.body.endTime,
        location: req.body.location.split(","),
        format: req.body.format,
        leader: req.body.leader,
        members: req.body.members.split(","),
        agenda: []
    }, function(err,meeting){
    if(err){
        sendJsonResponse(res, 400, err);
    } else{
        sendJsonResponse(res,201,meeting);
    }
    });
};
//Finds a meeting document by searching for the document id and returns the document in json on success
module.exports.meetingsRead = function(req,res){
  console.log('looking up meeting information', req.params);
  //check if meeting id is correct
  if (req.params && req.params.meetingid) {
    MEET
      .findById(req.params.meetingid)
      .exec(function(err, meeting) {
        //check to see if a meeting document was returned
        if (!meeting) {
          sendJsonResponse(res, 404, {
            "message": "meetingid not found"
          });
          return;
        //check to see if findbyid returned an error
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }
        console.log(meeting);
        sendJsonResponse(res, 200, meeting);
      });
    //meetingid wasnt present in parameters and therefore an invalid api call
  } else {
    console.log('No meetingid specified');
    sendJsonResponse(res, 404, {
      "message": "No meetingid in request"
    });
  }
};
//update a specific meeting
module.exports.meetingsUpdate = function(req,res){
    //check to see if meeting id is in request
if (!req.params.meetingid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, meetingid is required"
    });
    return;
  }
  MEET
    .findById(req.params.meetingid)
    //do not select agenda
    .select('-agenda')
    .exec(
      function(err, meeting) {
          //check to see if the meeting document was found
        if (!meeting) {
          sendJsonResponse(res, 404, {
            "message": "meetingid not found"
          });
          return;
          //check to see if error occured during exec
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        //update existing data with data found in the request
        meeting.meetingDate = req.body.meetingDate;
        meeting.endTime = req.body.endTime;
        meeting.location = req.body.location.split(",");
        meeting.format = req.body.format;
        meeting.leader = req.body.leader;
        meeting.members = req.body.members.split(",");
        meeting.save(function(err, meeting) {
            //check for error during save function
          if (err) {
            sendJsonResponse(res, 404, err);
            //send back meeting document as json response on success
          } else {
            sendJsonResponse(res, 200, meeting);
          }
        });
      }
  );
};
//delete a specific meeting
module.exports.meetingsDelete = function(req,res){
 var meetingid = req.params.meetingid;
 //check to see if there is a meetingid
  if (meetingid) {
    MEET
    //delete meetingid supplied
      .findByIdAndRemove(meetingid)
      .exec(
        function(err, meeting) {
            //check for error during exec function
          if (err) {
            console.log(err);
            sendJsonResponse(res, 404, err);
            return;
          }
          //send back null on success
          console.log("meeting id " + meetingid + " deleted");
          sendJsonResponse(res, 204, null);
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "No meetingid"
    });
  }
};
//sends a json message depending on parameters given
var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};
