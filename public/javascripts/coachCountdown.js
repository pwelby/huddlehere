/**
 * File: /public/javascripts/coachCountdown.js
 * Author: Peter Welby
 * 
 * Implements the countdown timer functionality for the Meeting
 * Schedule Coach
 * Note: idea of returning time as object of broken-out unit values 
 * borrowed from:
 * http://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
 */

(function(){
  var clockArea = $("#countDownClock"),
    meetStartTime = Date.parse(objMeeting.meetingDate);
    meetEndTime = Date.parse(objMeeting.endTime);
    
    objNullTime = {};
    objNullTime.total = 0;
    objNullTime.hours = 0;
    objNullTime.minutes = 0;
    objNullTime.seconds = 0;
  
  
  var remainingMeetingTime = function(startTime, endTime) {
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
  
  var initClock = function() {
    var updateTime = function() {
      var t = remainingMeetingTime(meetStartTime, meetEndTime);
      
      if (t.total <= 0) {
        t.total = 0;
        t.hours = 0;
        t.minutes = 0;
        t.seconds = 0;
        clearInterval(timeInterval);
      }
        
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
      
    };
    
    updateTime();
    var timeInterval = setInterval(updateTime, 1000);
  };
  
  $(document).ready(initClock);
}());