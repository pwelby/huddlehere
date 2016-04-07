/**
 * File: /public/javascripts/create.js
 * Author: Patrick Quaratiello
 * 
 * Handles location parsing & map updating for meeting creation form
 */

var createCurrentLocCoords = [];

//Handle member text fields add/remove
$(function() {
        var memberDiv = $('#memberText');
        var i = $('#memberText p').size() + 1;
        
        $('#addMemberBtn').on('click', function() {
                $('<p><input type="text" id="memberName' + i + '"size="20" name="memberName' + i +'" value="" placeholder="Member Name" /></label> <input type="button" id="rmvMemberBtn" value="Remove"></input></p>').appendTo(memberDiv);
                i++;      
                return false;
        });
        
        $('body').on('click', '#rmvMemberBtn', function() { 
                if( i > 2 ) {
                        $(this).parents('p').remove();
                        i--;
                }
                return false;
        });
});

function initPreSelMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 42.3600825, lng: -71.05888010000001 }
  });

  var geocoder = new google.maps.Geocoder();

  document.getElementById('submitLoc').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var street = document.getElementById('preSelTextBoxStreet').value;
  var city = document.getElementById('preSelTextBoxCity').value;
  var state = document.getElementById('preSelTextBoxState').value;
  address = street + "," + city + "," + state;
  geocoder.geocode({ 'address': address }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      createCurrentLocCoords[0] = results[0].geometry.location.lat();
      createCurrentLocCoords[1] = results[0].geometry.location.lng();
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function initNearbyMap() {

  var myOptions = {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);

  // Stuff for nearby
  // Try W3C Geolocation (Preferred)
  if (navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      nearbyLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(nearbyLoc);
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed. Did you block it? We've placed you in New York");
      nearbyLoc = newyork;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      nearbyLoc = siberia;
    }
    map.setCenter(nearbyLoc);
  }
}

function findPreSelMap() {
  initPreSelMap();
}

// Preselect or nearby textbox enable
$(document).ready(function() {
  initNearbyMap();
  $(".locRadio").click(function() {
    $("#preSelTextBoxStreet").attr("disabled", true);
    $("#preSelTextBoxCity").attr("disabled", true);
    $("#preSelTextBoxState").attr("disabled", true);
    google.maps.event.addDomListener(window, 'load', initNearbyMap());
    if ($("input[name=loc]:checked").val() == "preSel") {
      $("#preSelTextBoxStreet").attr("disabled", false);
      $("#preSelTextBoxCity").attr("disabled", false);
      $("#preSelTextBoxState").attr("disabled", false);
      findPreSelMap();
    }
  });

  $('.dropdown-toggle').dropdown();

  $(function() {
    $("#datepicker").datepicker();
  });
  $(function() {
  
  //submit create meeting form
  $('#submitForm').on('click', function() {                   
    var allMembers = "";
    var size = $('#memberText p').size();
   
    //get all members
    for(var i = 1; i <= size; i++)
    {
      member = "memberName" + i;
      if(member == "")
        return false;
      if(i == size)
        allMembers += document.getElementById(member).value + ";undecided";
      else
        allMembers += document.getElementById(member).value + ";undecided,";
    }
       
    var startDate = new Date($("#datepicker").val());
    var endDate = new Date(startDate);
    var startHours = parseInt($("#timeStart").val().split(":")[0]);
    var startMinutes = parseInt($("#timeStart").val().split(":")[1]);
    var endHours = parseInt($("#timeEnd").val().split(":")[0]);
    var endMinutes = parseInt($("#timeEnd").val().split(":")[1]);

    startDate.setHours($("#StartAM").is(":selected") ? startHours : startHours + 12);
    startDate.setMinutes(startMinutes);

    endDate.setHours($("#EndAM").is(":selected") ? endHours : endHours + 12);
    endDate.setMinutes(endMinutes);
    
    var meetLeader = $('#memberLead').val();
    var meetForm = $('#meetingType').val();
    
    //meeting object
    var locCoords = parseFloat(createCurrentLocCoords[0]) + "," + parseFloat(createCurrentLocCoords[1]);
    var createMeeting = {
        meetingDate: startDate,
        endTime: endDate,
        location: locCoords,
        format: meetForm,
        leader: meetLeader,
        members: allMembers,
    };
    $.post(window.location.protocol + "//" + window.location.host + "/api/meetings", createMeeting, function(data, textStatus, jqXHR) {
      var pagePath = "/m/" + data._id + "/l";
      window.prompt("Here is your meeting page URL:", window.location.protocol + "//" + window.location.host + pagePath);
    }, "json");
  });
});

}); //close document.ready
