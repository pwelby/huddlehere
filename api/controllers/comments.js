/**
 * File: comments.js
 * Author: Alex Li
 * 
 * Defined controller for any api calls regarding comment subdocuments.
 * Currently performs CRUD operations
 */

var mongoose = require('mongoose');
var AGENDA = mongoose.model('agenda');
var MEET = mongoose.model('Meeting');

//creates and adds comments to called meetingid
module.exports.commentsCreate = function(req,res){
    var meetingid = req.params.meetingid;
    //find valid meetingid and call addComments function if found else return err
    if(meetingid){
        MEET
            .findById(meetingid)
            .select('agenda')
            .exec(
                function(err,meeting){
                    if(err){
                        sendJsonResponse(res,400,err);
                    }else{
                        addComments(req,res,meeting);
                         }
                    });
                //Meeting id wasnt valid so send error
                }else{
                    sendJsonResponse(res,404,{"message": "Meeting id not found"});
                }
    };
var addComments = function(req,res,meeting){
    //select the correct agenda subdocument
    var thisAgenda = meeting.agenda.id(req.params.agendaid);
    if(!thisAgenda){
        sendJsonResponse(res,404,{"message": "Agenda id not found"});
    } else{
        //push relevant comment data into the selected agenda subdocument
        thisAgenda.comments.push({
            commenter: req.body.commenter,
            commentText: req.body.commentText
        });
        meeting.save(function(err,meeting){
            //error occured during save so send 400 response
            if(err){
                sendJsonResponse(res,400,err);
            //sends last agenda pushed into agenda array back as json response
            }else{
                thisComment = thisAgenda.comments[thisAgenda.comments.length -1];
                sendJsonResponse(res,201,thisComment);
            }
        });
    }
};

//finds comments and returns as json 
module.exports.commentsRead = function(req,res){
   console.log('looking up comment information', req.params);
  //check if comments id is correct
  if (req.params && req.params.commentsid) {
    MEET
      .findById(req.params.meetingid)
      .select('agenda')
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
        //finds the correct comment subdocument based on meetingid and returns it as json
        thisAgenda = meeting.agenda.id(req.params.agendaid);
        thisComment = thisAgenda.comments.id(req.params.commentsid);
        sendJsonResponse(res, 200, thisComment);
      });
    //locationid wasnt present in parameters and therefore an invalid api call
  } else {
    console.log('No meetingid specified');
    sendJsonResponse(res, 404, {
      "message": "No meetingid in request"
    });
  }
};

module.exports.commentsUpdate = function(req,res){
    //check to see if meeting id, agendaid, and comment id is in request
if (!req.params.meetingid || !req.params.agendaid || !req.params.commentsid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, meetingid, agendaid, and comment are required"
    });
    return;
  }
  MEET
    .findById(req.params.meetingid)
    .select('agenda')
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
        //update comment with data from the put request
        thisAgenda = meeting.agenda.id(req.params.agendaid);
        thisComment = thisAgenda.comments.id(req.params.commentsid);
        thisComment.commenter = req.body.commenter;
        thisComment.commentText = req.body.commentText;
        meeting.save(function(err, meeting) {
            //check for error during save function
          if (err) {
            sendJsonResponse(res, 404, err);
            //send back agenda as json response on success
          } else {
            sendJsonResponse(res, 200, thisComment);
          }
        });
      }
  );
};

module.exports.commentsDelete = function(req,res){
    //check to see if meeting id, agendaid, and comment id is in request
if (!req.params.meetingid || !req.params.agendaid || !req.params.commentsid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, meetingid, agendaid, and comment are required"
    });
    return;
  }
  MEET
    .findById(req.params.meetingid)
    .select('agenda')
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
         //update comment with data from the put request
        thisAgenda = meeting.agenda.id(req.params.agendaid);
        thisComment = thisAgenda.comments.id(req.params.commentsid);
            thisComment.remove();
            meeting.save(function(err, meeting) {
            //check for error during save function
            if (err) {
              sendJsonResponse(res, 404, err);
              //send back null success call
             } else {
               sendJsonResponse(res, 204, null);
             }
         });
      }
  );
};

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};
