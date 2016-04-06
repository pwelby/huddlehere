/**
 * File: /public/javascripts/geo.js
 * Author: Peter Welby
 * 
 * coordinates-to-address geocoding utility, adapted from:
 * http://stackoverflow.com/a/10009027
 */

var utilGeocoder;

/**
 * Function: populateLocation
 * 
 * Populates location with formatted address string returned by
 */
var populateLocation = function(strDecodedAddress) {
  var parts;

  // parts[0] = street address
  // parts[1] = city
  // parts[2] = State ZIP
  if (strDecodedAddress.length > 0) {
    parts = strDecodedAddress.split(",");
    $("#streetAddress").text(parts[0]);
    $("#cityState").text(parts[1] + "," + parts[2]);
  } else {
    $("#streetAddress").text("NOT FOUND");
  }
};

var geoInitialize = function() {
  utilGeocoder = new google.maps.Geocoder();
  codeLatLng(objMeeting.location[0], objMeeting.location[1]);
};

var codeLatLng = function(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  utilGeocoder.geocode({
    'latLng': latlng
  }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        console.log('Target result: ' + results[1]);
        console.log('Formatted: ' + results[1].formatted_address);
        populateLocation(results[1].formatted_address);
      } else {
        console.log('GEOCODER: No results found');
        populateLocation("");
      }
    } else {
      console.log('Geocoder failed due to: ' + status);
      populateLocation("");
    }
  });
};