/**
 * File: /api/models/meetings.js 
 * Author: Peter Welby
 * 
 * Defines meeting document and sub-document schema for use by
 * Mongoose
 */
var mongoose = require('mongoose');
// agenda item comment schema, to keep commenter info in one place
var agendaCommentSchema = new mongoose.Schema({
  commenter: {type: String, required: true},
  commentText: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

// agenda item schema for use in subdocuments
var agendaItemSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  comments: {type: [agendaCommentSchema], required: false}
});



// primary document schema,
var meetingSchema = new mongoose.Schema({
  meetingDate: {type: Date, required: true},
  endTime: {type: Date, required: true},
  location: {type: [Number], required: true},
  format: {type: String, required: true, default: 'Default'},
  leader: {type: String, required: true},
  members: {type: [String], required: true},
  agenda: {type: [agendaItemSchema], required: false}
});

mongoose.model('Meeting', meetingSchema, 'meetings');
mongoose.model("agenda", agendaItemSchema);