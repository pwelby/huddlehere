// Do not use yet, still in progress

var express = require('express');
var router = express.Router();
var ctrlMeetings = require('../controllers/meetings');
var ctrlAgenda = require('../controllers/agenda')
//meeting routes
router.get('/meetings', ctrlMeetings.meetingsList);
router.post('/meetings', ctrlMeetings.meetingsCreate);
router.get('/meetings', ctrlMeetings.meetingsRead);
router.put('meetings', ctrlMeetings.meetingsUpdate);
router.delete('/meetings', ctrlMeetings.meetingsDelete);

//agenda item routes
router.post('/meetings/:meetingid/agenda', ctrlAgenda.agendaCreate);
router.get('/meetings/:meetingid/agenda/:agendaid', ctrlAgenda.agendaRead);
router.put('/meetings/:meetingid/agenda/:agendaid', ctrlAgenda.agendaUpdate);
router.delete('/meetings/:meetingid/agenda/:agendaid', ctrlAgenda.agendaDelete);

module.exports = router;