/**
 * File: /srv/routes/index.js
 * Author: Peter Welby
 *
 * Defines app server routes
 */
var express = require('express');
var router = express.Router();
var ctrlMeetings = require('../controllers/meetings');

// Tool page routes 
router.get('/', function(req, res, next) {
  res.render('create', { title: 'HuddleHere ALPHA' });
});
router.get('/planner-leader', function(req, res, next) {
  res.render('planner-leader', { title: 'HuddleHere ALPHA' });
});
router.get('/planner-member', function(req, res, next) {
  res.render('planner-member', { title: 'HuddleHere ALPHA' });
});

router.get('/coach', function(req, res, next) {
  res.render('coach', {title: 'HuddleHere ALPHA'});
});

// Meeting planner routes
router.get('/m/:meetingid/l', ctrlMeetings.getLeaderPage);
router.get('/m/:meetingid/m', ctrlMeetings.getMemberPage);

// TODO: Add post handler for redirect from leader/member forms

// Meeting schedule coach route
router.get('/m/:meetingid/c', ctrlMeetings.getCoachPage);

module.exports = router;
