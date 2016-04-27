/**
 * File: /public/javascripts/createValidate.js
 * Author: Patrick Quaratiello
 * 
 * Validation for create page
 */

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
            "required" : "Please enter a valid street address."
        },
        preSelTextBoxCity: {
            "required" : "Please enter a valid city."
        },
        preSelTextBoxState: {
            "required" : "Please enter a valid state."
        }
    },
    errorPlacement: function(error, element) {
            console.log("hit");
            helpObj = $(element).next();
            $(helpObj).html(error.text());
            parentObj = $(element).parent().parent();
            $(parentObj).addClass("has-error");
    },
    success: function(label,element) {
        helpObj = $(element).next();
        $(helpObj).html("");
        parentObj = $(element).parent().parent();
            $(parentObj).removeClass("has-error");
    }
        
  });
  
  //create member form validation
  $("#createDetForm").validate({
    onkeyup: false,
    onclick: false,
    onfocusout: false,
    rules: {
      datepicker: {
        "required" : true,
        "inFuture" : true,
      },
      timeStartHours: {
        "required" : true,
        "validTime" :  {
          "depends" : function(element) { 
                          if(($("#timeEndHours").val() == ""))
                            return false;
                          else
                              return true;
                      }
        },
        "futureTime" : true
      },
      timeStartMinutes: {
        "required" : true,
      },
      timeEndHours: {
        "required" : true,
        "validTime" :  {
          "depends" : function(element) { 
                          if(($("#timeStartHours").val() == ""))
                            return false;
                          else
                              return true;
                      }
        }
      },
      timeEndMinutes: {
        "required" : true,
      }
    },
    messages: {
        datepicker: {
            "required" : "Please enter a valid date.",
            "inFuture" : "Please make sure the date is today or later."
        },
        timeStartHours: {
            "required" : "Please enter a valid start hour.",
            "validTime" : "Please make sure the start hours is before the end time.",
            "futureTime" : "Please make sure the start time is in the future."
        },
        timeStartMinutes: {
            "required" : "Please enter a valid start minute.",
            "validTime" : "Please make sure the start minutes is before the end time."
        },
        timeEndHours: {
            "required" : "Please enter a valid end hour.",
            "validTime" : "Please make sure the end hours is after the start time."
        },
        timeEndMinutes: {
            "required" : "Please enter a valid end minute.",
            "validTime" : "Please make sure the end minutes is after the start time."
        },
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
            "required" : "The leader field is required!"
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
     doSlide("#createDetails", "#createMembers");
    }
  });
  
    $('body').on('click', '#slideBackLoc', function() {
        console.log("HIT");
    doSlide("#createMap", "#createLocation");
  });
});

jQuery.validator.addMethod("inFuture", function(value, element) {
    var today = new Date();
    today.setHours(0,0,0,0);
    var date = new Date(value);
    return this.optional(element) || (date - today >= 0);
});

jQuery.validator.addMethod("futureTime", function(value, element) {
  
    var startDate = new Date($("#datepicker").val());
    var startHours = parseInt($("#timeStartHours").val());
    var startMinutes = parseInt($("#timeStartMinutes").val());
    var timeNow = new Date().getTime();
    
    if (startHours < 12) {
      if ($("#StartPM").is(":checked")) {
        // we want hours 1-11 PM, so add 12
        startHours = startHours + 12;
      }
    } else if ($("#StartAM").is(":checked")) {
      // we want 12am, which is 0 hours
      startHours = 0;
    }
    
    startDate.setHours(startHours);
    startDate.setMinutes(startMinutes);
    
    startTime = startDate.getTime();
        
    console.log("now: " + timeNow);
    console.log("start time: " + startTime);
    console.log("starttime - now: " + (startTime - timeNow));
    
    startTime = startDate.getTime();

    return this.optional(element) || (startTime - timeNow > 0);
  
  });
  
jQuery.validator.addMethod("validTime", function(value, element) {
    
    var startDate = new Date($("#datepicker").val());
    var endDate = new Date(startDate);
    var startHours = parseInt($("#timeStartHours").val());
    var startMinutes = parseInt($("#timeStartMinutes").val());
    var endHours = parseInt($("#timeEndHours").val());
    var endMinutes = parseInt($("#timeEndMinutes").val());
          
    if (startHours < 12) {
      if ($("#StartPM").is(":checked")) {
        // we want hours 1-11 PM, so add 12
        startHours = startHours + 12;
      }
    } else if ($("#StartAM").is(":checked")) {
      // we want 12am, which is 0 hours
      startHours = 0;
    }
    
    startDate.setHours(startHours);
    startDate.setMinutes(startMinutes);

    if (endHours < 12) {
      if ($("#EndPM").is(":checked")) {
        // we want hours 1-11 PM, so add 12
        endHours = endHours + 12;
      }
    } else if ($("#EndAM").is(":checked")) {
      // we want 12am, which is 0 hours
      endHours = 0;
    }
    
    endDate.setHours(endHours);
    endDate.setMinutes(endMinutes);
    
    startTime = startDate.getTime();
    endTime = endDate.getTime(); 
    return this.optional(element) || (startTime - endTime < 0);
});