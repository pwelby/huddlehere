/**
 * File: /public/javascripts/geo.js
 * Author: Peter Welby
 * 
 * coordinates-to-address geocoding utility, adapted from:
 * http://stackoverflow.com/a/10009027
 */

var utilGeocoder;

var geoInitialize = function() {
  geocoder = new google.maps.Geocoder();
};

var codeLatLng = function(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  utilGeocoder.geocode({
    'latLng': latlng
  }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        return results[1].formatted_address;
      } else {
        console.log('GEOCODER: No results found');
        return "";
      }
    } else {
      console.log('Geocoder failed due to: ' + status);
      return "";
    }
  });
};

google.maps.event.addDomListener(window, 'load', geoInitialize);