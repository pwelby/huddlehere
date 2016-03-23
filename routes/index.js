var express = require('express');
var router = express.Router();

/* Tool page routes */
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

module.exports = router;
