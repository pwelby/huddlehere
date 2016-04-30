/**
 * File: /srv/controllers/meetings.js
 * Author: Peter Welby
 * 
 * Defines the app server handlers for meeting page requests
 */
var request = require('request');
var apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://huddleherev2.herokuapp.com';
}

/**
 * Function: getMeetingInfo
 * 
 * Encapsulates the action of calling the API for a particular meeting document
 * since we need to do so for all of the tool pages
 */
var getMeetingInfo = function(req, res, next) {
  var requestOptions, path;
  
  path = '/api/meetings/' + req.params.meetingid;
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  
  request(requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        // API call succeeded
        next(req, res, data);
      } else {
        res.send("Sorry, we've encountered an error: " + response.statusCode);
      }
    }
  );
};

/**
 * Function: renderLeaderView
 * 
 * Named callback for rendering the meeting planner, leader view
 * 
 * Note: This and the below named callbacks take the meeting document
 * returned from the API as JSON as their third argument
 */
var renderLeaderView = function(req, res, meetingInfo) {
  res.render('planner-leader', {
    title: 'Meeting Planner (Leader) - HuddleHere',
    meeting: meetingInfo
  });
};

/**
 * Function: renderMemberView
 * 
 * Named callback for rendering the meeting planner, member view
 */
var renderMemberView = function(req, res, meetingInfo) {
  res.render('planner-member', {
    title: 'Meeting Planner (Member) - HuddleHere',
    meeting: meetingInfo
  });
};

/**
 * Function: renderCoach
 * 
 * Named callback for rendering the meeting schedule coach
 */
var renderCoach = function(req, res, meetingInfo) {
  res.render('coach', {
    title: 'Meeting Schedule Coach - HuddleHere',
    meeting: meetingInfo
  });
};

// Meeting-specific view controllers -- see /srv/routes/index.js 
// for route details
module.exports.getLeaderPage = function(req, res, next) {
  getMeetingInfo(req, res, function(req, res, responseData) {
    renderLeaderView(req, res, responseData);
  });
};

module.exports.getMemberPage = function(req, res, next) {
  getMeetingInfo(req, res, function(req, res, responseData) {
    renderMemberView(req, res, responseData);
  });
};

module.exports.getCoachPage = function(req, res, next) {
  getMeetingInfo(req, res, function(req, res, responseData) {
    renderCoach(req, res, responseData);
  });
};