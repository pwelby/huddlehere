/**
 * File: agenda.js
 * Author: Alex Li
 * 
 * Defined controller for any api calls regarding agenda subdocuments.
 * Currently performs CRUD operations
 */


var mongoose = require('mongoose');
var MEET = mongoose.model('Meeting');

//creates and adds agenda to called meetingid
module.exports.agendaCreate = function(req,res){
    var meetingid = req.params.meetingid;
    //find valid meetingid and call add Agenda function if found else return err
    if(meetingid){
        MEET
            .findById(meetingid)
            .select('agenda')
            .exec(
                function(err,meeting){
                    if(err){
                        sendJsonResponse(res,400,err);
                    }else{
                        AddAgenda(req,res,meeting);
                         }
                    });
                //Meeting id wasnt valid so send error
                }else{
                    sendJsonResponse(res,404,{"message": "Meeting id not found"});
                }
    };
var AddAgenda = function(req,res,meeting){
    //sends error if meeting id isnt found in collection
    if(!meeting){
        sendJsonResponse(res,404,{"message": "meetingid not found"});
    //push data into agenda subdocument
    }else{
        meeting.agenda.push({
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            purpose: req.body.purpose,
            comments: []
        });
        meeting.save(function(err,meeting){
            var thisAgenda;
            if(err){
                sendJsonResponse(res,400,err);
            //sends last agenda pushed into agenda array back as json response
            }else{
                thisAgenda = meeting.agenda[meeting.agenda.length -1];
                sendJsonResponse(res,201,thisAgenda);
            }
        });
    }
};
//finds a agenda 
module.exports.agendaRead = function(req,res){
   console.log('looking up agenda information', req.params);
  //check if agenda id is correct
  if (req.params && req.params.agendaid) {
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
        //finds the correct agenda subdocument based on meetingid and returns it as json
        thisAgenda = meeting.agenda.id(req.params.agendaid);
        sendJsonResponse(res, 200, thisAgenda);
      });
    //locationid wasnt present in parameters and therefore an invalid api call
  } else {
    console.log('No meetingid specified');
    sendJsonResponse(res, 404, {
      "message": "No meetingid in request"
    });
  }
};

module.exports.agendaUpdate = function(req,res){
    //check to see if meeting id and agendaid is in request
if (!req.params.meetingid || !req.params.agendaid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, meetingid and agendaid are required"
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
        //update agenda with data from the put request
        thisAgenda = meeting.agenda.id(req.params.agendaid);
        thisAgenda.title = req.body.title;
        thisAgenda.description = req.body.description;
        thisAgenda.duration = req.body.duration;
        thisAgenda.purpose = req.body.purpose;
        meeting.save(function(err, meeting) {
            //check for error during save function
          if (err) {
            sendJsonResponse(res, 404, err);
            //send back agenda as json response on success
          } else {
            sendJsonResponse(res, 200, thisAgenda);
          }
        });
      }
  );
};

module.exports.agendaDelete = function(req,res){
    //check to see if meeting id, agendaid, and comment id is in request
if (!req.params.meetingid || !req.params.agendaid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, meetingid and agenda are required"
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
        thisAgenda.remove();
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
