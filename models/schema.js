/**
 * File: schema.js -- define MongoDB schema for storing meeting state
 */
var mongoose = require('mongoose');

// agenda item schema for use in subdocuments
var agendaItemSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  comments: [agendaCommentSchema]
});

// agenda item comment schema, to keep commenter info in one place
var agendaCommentSchema = new mongoose.Schema({
  commenter: {type: String, required: true},
  commentText: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

// primary document schema,
var meetingSchema = new mongoose.Schema({
  meetingDate: {type: Date, required: true},
  endTime: {type: Date, required: true},
  location: {type: [Number], required: true},
  format: {type: String, required: true, default: 'Default'},
  leader: {type: String, required: true},
  members: {type: [String], required: true},
  agenda: {type: [agendaItemSchema], required: true}
});

mongoose.model('Meeting', meetingSchema, 'meetings');