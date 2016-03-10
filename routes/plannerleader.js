var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('planner-leader', { title: 'HuddleHere ALPHA' });
});

module.exports = router;
