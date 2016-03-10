var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/planner-leader', function(req, res, next) {
  res.render('planner-leader', { title: 'HuddleHere ALPHA' });
});

module.exports = router;
