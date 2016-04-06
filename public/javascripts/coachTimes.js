/**
 * File: /public/javascripts/coachTimes.js
 * Author: Peter Welby
 * 
 * Parses meeting times from the API and displays them on the page
 */

var parseTime = function(objDate) {
  var hours, minutes, ampm;
  hours = objDate.getHours();
  
  if (hours < 12) {
    ampm = "AM";
  } else {
    ampm = "PM";
  }
  if (hours === 0) {
    hours = "12";
  }
  else if (hours > 12) {
    hours = hours % 12;
  }
  
  minutes = objDate.getMinutes(); 
  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }
  
  return "" + hours + ":" + minutes + " " + ampm;
};

var populateMeetingTimes = function() {
  $("#meetingStart").text(parseTime(new Date(objMeeting.meetingDate)));
  $("#meetingEnd").text(parseTime(new Date(objMeeting.endTime)));
};

$(document).ready(populateMeetingTimes);