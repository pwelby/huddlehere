/**
 * File: /public/javascripts/coachAgendaCountdown.js
 * Author: Peter Welby
 * 
 * Implements the countdown timer functionality for the 
 * Meeting Schedule Coach for the current agenda item
 * Note: idea of returning time as object of broken-out unit values 
 * borrowed from:
 * http://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
 */

/**
 * Function: getAgendaTimestamps()
 * 
 * Builds a list of the timestamps representing the scheduled end time of each agenda item
 */
var getAgendaTimestamps = function() {
  var agendaTimestamps = [], i,
    startTimestamp = Date.parse(objMeeting.meetingDate);
  
  for (i = 0; i < objMeeting.agenda.length; i++) {
    if (i < 1) {
      agendaTimestamps.push(new Date(startTimestamp + (objMeeting.agenda[i].duration * 1000 * 60)));
    } else {
      agendaTimestamps.push(new Date(agendaTimestamps[i - 1] + (objMeeting.agenda[i].duration * 1000 * 60)));
    }
  }
  
  return agendaTimestamps;
};

/**
 * Function: remainingTime(startTime, endTime)
 * 
 * Returns an object of time values broken out into hours, minutes, and seconds
 * as well as the raw time value
 */
var remainingTime = function(startTime, endTime) {
  
  var now = Date.now(), t;
  if (now < startTime) {
    t = endTime - startTime;
  } else {
    t = endTime - now;
  }
  
  return {
    total: t,
    hours: Math.floor(t/(1000*60*60)),
    minutes: Math.floor((t/(1000*60)) % 60),
    seconds: Math.floor((t/1000) % 60)
  };
};

(function(){
  var agendaTimestamps = getAgendaTimestamps(),
    clockArea = $("#agendaCountDownClock"),
    activeItemIndex = agendaTimestamps.length - 1,
    meetStartTime = Date.parse(objMeeting.meetingDate),
    meetEndTime = Date.parse(objMeeting.endTime),
    notificationSound = document.createElement("AUDIO"),
    objNullTime = {};
    objNullTime.total = 0;
    objNullTime.hours = 0;
    objNullTime.minutes = 0;
    objNullTime.seconds = 0;
    
    notificationSound.src = '/audio/notification-tone.mp3';
    notificationSound.volume = 0.4;
  
    // Initialize activeItemIndex to the first agenda item that has not yet passed
    for (var i = 0; i < agendaTimestamps.length; i++) {
      if (Date.now() < agendaTimestamps[i]) {
        activeItemIndex = i;
        break;
      }
    }
    console.log("active index is: " + activeItemIndex + ", length is: " + agendaTimestamps.length)
  // Handle clock initialization like in the meeting countdown
  var initAgendaClock = function() {
    var updateTime = function() {
      var t;
      
      if (activeItemIndex === 0) {
        t = remainingTime(meetStartTime, agendaTimestamps[activeItemIndex]);
      } else {
        t = remainingTime(agendaTimestamps[activeItemIndex - 1], agendaTimestamps[activeItemIndex]);
      }
      
      if (t.total <= 0) {
        // we have reached the end of the current item's allotted time
        t.total = 0;
        if (activeItemIndex < agendaTimestamps.length) {
          activeItemIndex++; 
        } else {
          clearInterval(timeInterval);
        }
        notificationSound.play();
        t = (remainingTime(meetStartTime, agendaTimestamps[activeItemIndex]).total > 0) ? remainingTime(meetStartTime, agendaTimestamps[activeItemIndex]).total : objNullTime;
      }
      console.log("t is: " + t);
      var minutes = (t.minutes > 9) ? t.minutes : ("0" + t.minutes);
      var seconds = (t.seconds > 9) ? t.seconds : ("0" + t.seconds);
      
      clockArea.text(t.hours + ":" + minutes + ":" + seconds);
      if ((t.total/1000) < 300 && (t.total/1000) >= 120) {
        // 5 minutes remaining 
        clockArea.css('color', '#888800');
      } else if ((t.total/1000) < 120) {
        // 2 minutes remaining
        clockArea.css('color', '#880000');
      } else {
        clockArea.css('color', '#009999');
      }
      
      // update the current agenda item
      $("#currentItem").text(objMeeting.agenda[activeItemIndex].title);
    };
    
    updateTime();
    var timeInterval = setInterval(updateTime, 1000);
  };
  
  $(document).ready(initAgendaClock);
}());