/**
 * File: index.js
 * Author: Alex Li
 * 
 * Defined routes specified for all api calls including meetings, agenda, and comments
 * Currently specifies CRUD operation routes
 */

var express = require('express');
var router = express.Router();
var ctrlMeetings = require('../controllers/meetings');
var ctrlAgenda = require('../controllers/agenda');
var ctrlComments = require('../controllers/comments');
//meeting routes
router.post('/meetings', ctrlMeetings.meetingsCreate);
router.get('/meetings/:meetingid', ctrlMeetings.meetingsRead);
router.put('/meetings/:meetingid', ctrlMeetings.meetingsUpdate);
router.delete('/meetings/:meetingid', ctrlMeetings.meetingsDelete);

//agenda item routes
router.post('/meetings/:meetingid/agenda', ctrlAgenda.agendaCreate);
router.get('/meetings/:meetingid/agenda/:agendaid', ctrlAgenda.agendaRead);
router.put('/meetings/:meetingid/agenda/:agendaid', ctrlAgenda.agendaUpdate);
router.delete('/meetings/:meetingid/agenda/:agendaid', ctrlAgenda.agendaDelete);

//agenda comment routes
router.post('/meetings/:meetingid/agenda/:agendaid/comments', ctrlComments.commentsCreate);
router.get('/meetings/:meetingid/agenda/:agendaid/comments/:commentsid', ctrlComments.commentsRead);
router.put('/meetings/:meetingid/agenda/:agendaid/comments/:commentsid', ctrlComments.commentsUpdate);
router.delete('/meetings/:meetingid/agenda/:agendaid/comments/:commentsid', ctrlComments.commentsDelete);

module.exports = router;
