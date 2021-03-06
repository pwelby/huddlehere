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
  res.render('home', { title: 'HuddleHere' });
});

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Create Meeting' });
});

/**router.get('/planner-leader', function(req, res, next) {
    res.render('planner-leader', { title: 'Leader' });
});
router.get('/planner-member', function(req, res, next) {
    res.render('planner-member', { title: 'Member' });
});

router.get('/coach', function(req, res, next) {
  res.render('coach', {title: 'Coach'});
});*/

// Meeting planner routes
router.get('/m/:meetingid/l', ctrlMeetings.getLeaderPage);
router.get('/m/:meetingid/m', ctrlMeetings.getMemberPage);

// TODO: Add post handler for redirect from leader/member forms

// Meeting schedule coach route
router.get('/m/:meetingid/c', ctrlMeetings.getCoachPage);

module.exports = router;
