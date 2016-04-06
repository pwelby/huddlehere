/**
 * File: /public/javascripts/coachLoc.js
 * Author: Peter Welby
 * 
 * Sets meeting location based on meeting location data from the
 * HuddleHere API
 */
$(document).ready(function(){
  var parsedAddress = codeLatLng(objMeeting.location[0], objMeeting.location[1]),
    parts;
    
  if (parsedAddress.length > 0) {
    // parts[0] = street address
    // parts[1] = city
    // parts[2] = State ZIP
    parts = parsedAddress.split(",");
  }
  
  $("#streetAddress").text(parts[0]);
  $("#cityState").text(parts[1] + "," + parts[2]);
});