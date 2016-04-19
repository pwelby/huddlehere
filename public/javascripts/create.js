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

//validation on button presses
$(document).ready(function() {
 
  //create location form validation
  $("#createLocForm").validate({
    rules: {
      preSelTextBoxStreet: {
        "required" : true
      },
      preSelTextBoxCity: {
        "required" : true
      },
      preSelTextBoxState: {
        "required" : true
      },
    },
    messages: {
        preSelTextBoxStreet: {
            required : "Please enter a valid street address."
        },
        preSelTextBoxCity: {
            required : "Please enter a valid city."
        },
        preSelTextBoxState: {
            required : "Please enter a valid state."
        }
    },
    errorElement: "div",
    errorLabelContainer: "#locErrBox"
  });
  
  //create member form validation
  $("#createDetForm").validate({
    rules: {
      datepicker: {
        "required" : true
      },
      timeStartHours: {
        "required" : true
      },
      timeStartMinutes: {
        "required" : true
      },
      timeEndHours: {
        "required" : true
      },
      timeEndMinutes: {
        "required" : true
      },
    },
    messages: {
        datepicker: {
            required : "Please enter a valid date."
        },
        timeStartHours: {
            required : "Please enter a valid start hour."
        },
        timeStartMinutes: {
            required : "Please enter a valid start minute."
        },
        timeEndHours: {
            required : "Please enter a valid end hour."
        },
        timeEndMinutes: {
            required : "Please enter a valid end minute."
        }
    },
    errorElement: "div",
    errorLabelContainer: "#detErrBox"
  });
  
  //create member form validation
  $("#createMembForm").validate({
    rules: {
      memberLead: {
        "required" : true
      }
    },
    messages: {
        memberLead: {
            required : "The leader field is required!"
        }
    },
    errorElement: "div",
    errorLabelContainer: "#memErrBox"
  });
      
  $('body').on('click', '#slideLocation', function() {
    if($("#createLocForm").valid() === true)
    {
      doSlide("#createLocation", "#createMap", selLoc);
    }
  });

  $('body').on('click', '#slideMap', function() {
    doSlide("#createMap", "#createDetails");
  });

  $('body').on('click', '#slideDetails', function() {
    if($("#createDetForm").valid() === true)
    {
      var date = new Date($("#datepicker").val());
      var today = new Date();
      if(date - today < 0)
        console.log("You're in the past?");
      else
        doSlide("#createDetails", "#createMembers");
    }
  });
  
    $('body').on('click', '#slideBackLoc', function() {
    doSlide("#createMap", "#createLocation");
  });
});

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

  $('.dropdown-toggle').dropdown();

  $(function() {
    $("#datepicker").datepicker({onClose: function() { this.focus(); }});
  });
  $(function() {
  
  //submit create meeting form
  $('#slideMembers').on('click', function() {
   if($("#createMembForm").valid() === true)
    {
      var allMembers = "";
      var size = $('#memberText p').size();
     
      //get all members
      for(var i = 1; i <= size; i++)
      {

        member = "memberName" + i;
        if(document.getElementById(member).value == "")
        {
          //do nothing
        }
        else
        {
          if(i == size)
            allMembers += document.getElementById(member).value + ";undecided";
          else
            allMembers += document.getElementById(member).value + ";undecided,";
        }
      }
    var startDate = new Date($("#datepicker").val());
    var endDate = new Date(startDate);
    var startHours = parseInt($("#timeStartHours").val());
    var startMinutes = parseInt($("#timeStartMinutes").val());
    var endHours = parseInt($("#timeEndHours").val());
    var endMinutes = parseInt($("#timeEndMinutes").val());

    if (startHours < 12) {
      if (!$("#StartAM").is(":selected")) {
        // we want hours 1-11 PM, so add 12
        startHours = startHours + 12;
      }
    } else if ($("#StartAM").is(":selected")) {
      // we want 12am, which is 0 hours
      startHours = 0;
    }
    
    startDate.setHours(startHours);
    startDate.setMinutes(startMinutes);

    if (endHours < 12) {
      if (!$("#endAM").is(":selected")) {
        // we want hours 1-11 PM, so add 12
        endHours = endHours + 12;
      }
    } else if ($("#EndAM").is(":selected")) {
      // we want 12am, which is 0 hours
      endHours = 0;
    }
    
    endDate.setHours(endHours);
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
