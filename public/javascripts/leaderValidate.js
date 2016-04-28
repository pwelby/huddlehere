/**
 * File: /public/javascripts/planner-leader.js
 * Author: Patrick Quaratiello
 * 
 * Handles Agenda items
 */
  var sumDurations = 0;
  var startDate = new Date(objMeeting.meetingDate);
  var endDate = new Date(objMeeting.endTime);
  var startTime = startDate.getTime();
  var endTime = endDate.getTime();
  var startMins = ((startTime/ 1000) / 60);
  var endMins = ((endTime/ 1000) / 60)
  var meetDuration = (endMins - startMins);
  var timeLeft = 0;
  var currentDuration = 0;
  
   $("agendaForm0").validate({
    rules: {
      "durationSum": true
    },
    messages: {
      durationSum: "Test!"
    },
    errorElement: "div",
    errorLabelContainer: "#agendaErrBox"
  });
  
 jQuery.validator.addMethod("durationSum", function(value, element) {
   var valid = true;
   sumDurations = 0;
   
  $("#agendaItems input[id^='agendaDuration']").each(function()
    {
      if(isNaN(parseInt($(this).val())))
        sumDurations += 0;
      else
        sumDurations += parseInt($(this).val());
    });
    timeLeft = (meetDuration - sumDurations);
    currentDuration = sumDurations;
    console.log(currentDuration);
    if((timeLeft) < 0)
    {
      valid = false;
      sumDurations = 0;
    }
    
   return this.optional(element) || valid;
  }, function(params, element) {
      return currentDuration + '/' + meetDuration + " minutes."
});