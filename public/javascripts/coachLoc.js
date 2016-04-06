/**
 * File: /public/javascripts/coachLoc.js
 * Author: Peter Welby
 * 
 * Sets meeting location based on meeting location data from the
 * HuddleHere API
 */
var populateLocation = function(strDecodedAddress) {
  var parts;

  // parts[0] = street address
  // parts[1] = city
  // parts[2] = State ZIP
  parts = strDecodedAddress.split(",");
  
  $("#streetAddress").text(parts[0]);
  $("#cityState").text(parts[1] + "," + parts[2]);
};