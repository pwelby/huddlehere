var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/planner-member', function(req, res, next) {
  res.render('planner-member', { title: 'HuddleHere ALPHA' });
});

module.exports = router;
