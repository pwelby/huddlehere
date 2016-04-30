/**
 * File: /public/javascripts/create.js
 * Author: Patrick Quaratiello
 * 
 * Handles location parsing & map updating for meeting creation form
 */

var createCurrentLocCoords = [];
var selLoc;

//collapse the other panels on start
$( "#createMap" ).last().addClass( "collapse" );
$( "#createMembers" ).last().addClass( "collapse" );
$( "#createDetails" ).last().addClass( "collapse" );
$( "#createURL" ).last().addClass( "collapse" );

var getUrl = function(){
    console.log(window.location.protocol + "//" + window.location.host + "/create");
}
//Handle member text fields add/remove
$(function() {
    memberHash = new Array(200);
    memberHash[1] = true;
    var counter;
    console.log("<input class = 'form-control' type = 'text' id= 'memberName" + counter + "' name = 'memberName" + counter + "' placeholder = 'Member #" + counter + " Name></input>");
    $('#addMemberBtn').on('click', function() {
        for(var i = 1; i <= memberHash.length; i++){
            if(memberHash[i] === undefined){
                counter = i;
                console.log(i);
                break;
            }
        }
        var field = $(this).parent().parent().parent();
        $(field).append("<div class = 'form-group'>\n\
 <label for = 'memberName" + counter + "'class = 'col-md-2 control-label'>Member #" + counter + "</label>\n\
  <div class = 'col-md-10'> <div class = 'col-md-9'> <input class = 'form-control' type = 'text' id= 'memberName" + counter + "' name = 'memberName" + counter + "' placeholder = 'Member #" + counter + " Name'></input></div><div class = 'col-md-1'> <a id = 'rmvMemberBtn' class='btn btn-raised btn-xs'> <i class='material-icons'>clear</i><div class = 'ripple-container'></div></div></div>");
        memberHash[counter] = true;
        console.log("member hit");
    });
        
        $('body').on('click', '#rmvMemberBtn', function() { 
                parent = $(this).parent().parent().parent();
                parent.remove();
                num = $(this).parent().prev().find("input").attr("id")
                console.log($(this).parent().attr("class"));
                console.log($(this).parent().prev().attr("class"));
                console.log($(this).parent().prev().find("input").attr("class"));
                memberHash[num[10]] = undefined;
                console.log(counter);
        });
});

function initPreSelMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: { lat: 42.3600825, lng: -71.05888010000001 }
  });

  var street = document.getElementById('preSelTextBoxStreet').value;
  var city = document.getElementById('preSelTextBoxCity').value;
  var state = document.getElementById('preSelTextBoxState').value;
  
  var geocoder = new google.maps.Geocoder();

  if(street != ""&& city != "" && state != "")
    geocodeAddress(geocoder, map);


  function geocodeAddress(geocoder, resultsMap) {
    address = street + "," + city + "," + state;
    geocoder.geocode({ 'address': address }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) 
      {
        createCurrentLocCoords[0] = results[0].geometry.location.lat();
        createCurrentLocCoords[1] = results[0].geometry.location.lng();
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } 
      else 
      {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
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
      createCurrentLocCoords[0] = position.coords.latitude;
      createCurrentLocCoords[1] = position.coords.longitude;
      map.setCenter(nearbyLoc);
     var marker = new google.maps.Marker({
        map: map,
        position: nearbyLoc
      });
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

// Preselect or nearby textbox enable
$(document).ready(function() {
  $(".locRadio").click(function() {
    
    $('#preSelTextBoxStreet').removeClass('error');
    $('#preSelTextBoxCity').removeClass('error');
    $('#preSelTextBoxState').removeClass('error');
    $( "#preSelTextBoxStreet-error" ).remove();
    $( "#preSelTextBoxCity-error" ).remove();
    $( "#preSelTextBoxState-error" ).remove();
    $("#preSelTextBoxStreet").attr("disabled", true);
    $("#preSelTextBoxCity").attr("disabled", true);
    $("#preSelTextBoxState").attr("disabled", true);
    selLoc = 0;
    
    if ($("input[name=loc]:checked").val() == "preSel") {
      $("#preSelTextBoxStreet").attr("disabled", false);
      $("#preSelTextBoxCity").attr("disabled", false);
      $("#preSelTextBoxState").attr("disabled", false);
      selLoc = 1;
    }
  });

  $(function() {
    $('#datepicker').bootstrapMaterialDatePicker({ format : 'MM/DD/YYYY', time: false, minDate : new Date() });

  });
  $(function() {
  
  //submit create meeting form
  $('#slideMembers').on('click', function() {
   if($("#createMembForm").valid() === true)
    {
      var allMembers = ""; 
      //get all members
      $("#memberWrapper").children().each(function(i, obj){
        member = $(this).find("[id^=memberName]").val();
        console.log(member);
        if(member === "" || member === undefined)
        {
          console.log("do nothing");
          //do nothing
        }
        else
        {
           allMembers += member + ";undecided,";
        }
      });     
      
      allMembers = allMembers.substring(0, allMembers.length - 1 );
    var startDate = new Date($("#datepicker").val());
    var endDate = new Date(startDate);
    var startHours = parseInt($("#timeStartHours").val());
    var startMinutes = parseInt($("#timeStartMinutes").val());
    var endHours = parseInt($("#timeEndHours").val());
    var endMinutes = parseInt($("#timeEndMinutes").val());
     console.log(startDate);
     console.log(endDate);
     console.log(startHours);
     console.log(startMinutes);
     console.log(endHours);
     

   if (startHours < 12) {
      if ($("#Startam").val() === "PM") {
        // we want hours 1-11 PM, so add 12
        startHours = startHours + 12;
      }
    } else if ($("#Startam").val() === "AM") {
      // we want 12am, which is 0 hours
      startHours = 0;
    }
    
    startDate.setHours(startHours);
    startDate.setMinutes(startMinutes);

    if (endHours < 12) {
      if ($("#Endam").val() === "PM") {
        // we want hours 1-11 PM, so add 12
        endHours = endHours + 12;
      }
    } else if ($("#Endam").val() === "AM") {
      // we want 12am, which is 0 hours
      endHours = 0;
    }
    
    endDate.setHours(endHours);
    endDate.setMinutes(endMinutes);
    
    
    var meetLeader = $('#memberLead').val();
    
    //meeting object
    var locCoords = parseFloat(createCurrentLocCoords[0]) + "," + parseFloat(createCurrentLocCoords[1]);
    var createMeeting = {
        meetingDate: startDate,
        endTime: endDate,
        format: "Default",
        location: locCoords,
        leader: meetLeader,
        members: allMembers
    };
    console.log(createMeeting);
    $.post(window.location.protocol + "//" + window.location.host + "/api/meetings", createMeeting, function(data, textStatus, jqXHR) {
      var pagePath = "/m/" + data._id + "/l";
      //window.prompt("Here is your UNIQUE meeting page URL (CTRL+C, ENTER to copy):", window.location.protocol + "//" + window.location.host + pagePath);
      
      uniqueURL = window.location.protocol + "//" + window.location.host + pagePath;
      $("#uniqURL").attr("href", uniqueURL);
      $("#uniqURL").attr("target", "_blank");
      $( "#uniqURL" ).html( uniqueURL );
      doSlide("#createMembers", "#createURL");
      
    }, "json");
   }
  });
});

}); //close document.ready
