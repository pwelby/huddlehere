/**
 * File: /public/javascripts/planner-leader.js
 * Author: Patrick Quaratiello
 * 
 * Handles Agenda items
 */

var meetingURL = window.location.pathname;
var meetingParse = (meetingURL.substring(meetingURL.indexOf("m/") + 2));
var meetingID = meetingParse.substring(0, meetingParse.indexOf("/"));
    
var numAgenda = objMeeting.agenda.length;
var objAgenda = objMeeting.agenda;
 
//set up member and coach URLs
var memberURL = window.location.protocol + "//" + window.location.host + meetingURL.substring(0, meetingURL.indexOf("l")) + "m"
var coachURL = window.location.protocol + "//" + window.location.host + meetingURL.substring(0, meetingURL.indexOf("l")) + "c"

$("#memURL").attr("href", memberURL);
$("#memURL").attr("target", "_blank");
$( "#memURL" ).html( memberURL );

$("#coachURL").attr("href", coachURL);
$("#coachURL").attr("target", "_blank");
$( "#coachURL" ).html( coachURL );

updateAgendaDB();

$( "#agendaItems" ).change(function() {
   $("#agendaItems").children().each(function(i, obj){
     console.log("Stuff and things")
      $(this).valid();
   });
});
function updateAgendaDB()
{ 
   for(var i = 0; i < numAgenda; i++)
   {
    var memberDiv = $('#agendaItems');
    var agendaTitle = objAgenda[i].title;
    var agendaDesc = objAgenda[i].description;
    var agendaID = objAgenda[i]._id;
    var agendaDuration = objAgenda[i].duration;
    var agendaPurpose = objAgenda[i].purpose;

    var title = '<form class="col-md-6" id="ID-' + agendaID + '" name = "agendaForm' + i + '"><div class="col-md-8"> <div class = "form-group"><label for = "agendaItem' + i + '"class = "control-label"> Title <input class = "form-control" type="text" id="agendaItem' + i + ' name="agendaItem' + i +'" value="' + agendaTitle + '" placeholder="Agenda Item" /></label></div></div>';
    var removebtn = '<div class = "col-md-4"> <a class="btn btn-raised btn-xs" type="button" id="rmvAgendaBtn"' + i + '> Remove </a> </div></div>';
    var textbox =  '<div class="col-md-12"> <div class = "form-group"><label for = "agendaDesc' + i + '"class = "control-label"> Description </label> <textarea class="form-control" id="agendaDesc' + i + '" name="agendaDesc' + i + '" placeholder="Agenda Description" value = "test"> ' + agendaDesc + '</textarea> </div> </div>';
    var duration = '<div class="col-md-6"><div class = "form-group"> <label for = "agendaDuration' + i + '"class = "control-label"> Duration </label> <input class = "form-control" type="text" placeholder = "Duration" id = "agendaDuration' + i + '" value="' + agendaDuration + '"name = "agendaDuration' + i + '"></div></div>';
    var purpose = '<div class="col-md-6"><div class="form-group"> <label class = "control-label" for="agendaPurpose"' + i + '>Purpose</label>  <select id="agendaPurpose' + i + '" class="form-control">   <option value="Informational">Informational</option>   <option value="Decision">Decision</option>   <option value="Other">Other</option>   </select>  </div></div>';

    $(title + removebtn + textbox + duration + purpose + "<hr> </form> ").appendTo(memberDiv);
   
    $('#agendaPurpose' + i).val(agendaPurpose);
  
    var aItem =  '#agendaItem' + i;
     
    $("[name=agendaForm" + i + "]").validate(
    {
      rules:
      {
        aItem: 
        {
          
        }
      },
      messages:
      {

      },
      errorPlacement: function(error, element) {
        console.log("hit");
        helpObj = $(element).next();
        $(helpObj).html(error.text());
        parentObj = $(element).parent();
        $(parentObj).addClass("has-error");
      },
      success: function(label,element) {
          helpObj = $(element).next();
          $(helpObj).html("");
          parentObj = $(element).parent();
              $(parentObj).removeClass("has-error");
      }
    });
 }
}









  //handles agenda items
   $(function() {
          var agendaItems = $('#agendaItems');
          $('#addAgendaBtn').on('click', function() {
          var i =  $('#agendaItems form').size() + 1;
              
              var title = '<form class="col-md-6" id="ID-NONE" name = "agendaForm' + i + '"><div class="col-md-8"> <div class = "form-group"><label for = "agendaItem' + i + '"class = "control-label"> Title <input class = "form-control" type="text" id="agendaItem' + i + ' name="agendaItem' + i +'" value="" placeholder="Agenda Item" /></label><span class="help-block"></div></div>';
              var removebtn = '<div class = "col-md-4"> <a class="btn btn-raised btn-xs" type="button" id="rmvAgendaBtn"' + i + '> Remove </a> </div></div>';

              var textbox =  '<div class="col-md-12"> <div class = "form-group"><label for = "agendaDesc' + i + '"class = "control-label"> Description </label> <textarea class="form-control" id="agendaDesc' + i + '" name="agendaDesc' + i + '" placeholder="Agenda Description" /> </div> </div>';
              var duration = '<div class="col-md-6"><div class = "form-group"> <label for = "agendaDuration' + i + '"class = "control-label"> Duration </label> <input number = "number" durationSum = "durationSum" class = "form-control" type="text" placeholder = "Duration" id = "agendaDuration' + i + '" name = "agendaDuration' + i + '"><span class = "help-block"></div></div>';

              var purpose = '<div class="col-md-6"><div class="form-group"> <label class = "control-label" for="agendaPurpose">Purpose</label>  <select id="agendaPurpose" class="form-control">   <option value="Informational">Informational</option>   <option value="Decision">Decision</option>   <option value="Other">Other</option>   </select>  </div></div><hr class="col-sm-11">';
                
              $(title + removebtn + textbox + duration + purpose).appendTo(agendaItems);             
                
             console.log("#agendaForm" + i)
             
            var aItem =  '#agendaItem' + i;
            $('#agendaPurpose' + i).val(agendaPurpose);
           
              $("[name=agendaForm" + i + "]").validate(
              {
                rules:
                {
                  aItem: 
                  {
                    
                  }
                },
                messages:
                {

                },
                errorPlacement: function(error, element) {
                  console.log("hit");
                  helpObj = $(element).next();
                  $(helpObj).html(error.text());
                  parentObj = $(element).parent();
                  $(parentObj).addClass("has-error");
                },
                success: function(label,element) {
                    helpObj = $(element).next();
                    $(helpObj).html("");
                    parentObj = $(element).parent();
                        $(parentObj).removeClass("has-error");
                }
              });
              i++;   
              return false;
          });
          
          $('body').on('click', '#rmvAgendaBtn', function() { 
                  console.log($(this).closest('form').attr('id'));
                  
                  agendaID = $(this).closest('form').attr('id');
                  agendaID = (agendaID.substring(agendaID.indexOf("-") + 1))
                  console.log(agendaID);                 
                if(agendaID == "NONE")
                  {
                    console.log("Can't remove this!");
                  }
                  else
                  {
                    delRequest = new XMLHttpRequest();
                    delRequest.open("DELETE", window.location.protocol + "//" + window.location.host + "/api/meetings/" + meetingID + "/agenda/" + agendaID);
                    delRequest.onreadystatechange = function() {
                      if(delRequest.readyState === XMLHttpRequest.DONE && delRequest.status === 204) {

                        console.log("Request succeeded:");
                        console.log(delRequest.responseText);
                      } else if (delRequest.status !== 204) {
                        console.log("Request failed: ");
                        console.log(delRequest.readyState, delRequest.status);
                        console.log(delRequest.responseText);
                      }
                    };
                    delRequest.send();
                  }
                  
                  $(this).closest('form').remove();
                  return false;
          });
  });

  $('body').on('click', '#submitAgenda', function() {
      submitAgenda();
    });
    
function submitAgenda() 

{    
    var formValid = false;
    
    $("#agendaItems").children().each(function(i, obj){
      formValid = $(this).valid();
      console.log("Form invalid: " + formValid);
      var agendaTitle = $(this).find("[id^=agendaItem]").val();
      var agendaDescription = $(this).find("[id^=agendaDesc]").val();
      var agendaID = $(this).attr("id").substring($(this).attr("id").indexOf("-") + 1)
      var agendaDuration = $(this).find("[id^=agendaDuration]").val();
      var agendaPurpose = $(this).find("[id^=agendaPurpose]").val();  
      console.log(agendaTitle + ", " + agendaDescription + ", " + agendaID + ", " + agendaDuration + ", " + agendaPurpose);   
       var agendaDurationID = $(this).find("[id^=agendaDuration]").attr("ID");
        
      if((formValid) == false)
      {
        return false
      }
      
      if(agendaTitle == "")
        agendaTitle = "No Title";
      if(agendaDescription == "")
        agendaDescription = "No Description";
      if(agendaDuration == "")
        agendaDuration = "0";
      if(isNaN(agendaDuration))
         agendaDuration = "0"; 
      if(agendaID == "NONE")
      {
          //alert("New data!");
          var createAgenda = {
            title: agendaTitle,
            description: agendaDescription,
            purpose: agendaPurpose,  //"Informational," "Decision," or "Other"
            duration: agendaDuration
          }
          $.post(window.location.protocol + "//" + window.location.host + "/api/meetings/" + meetingID + "/agenda", createAgenda, function(){  /*$("#agendaSuccessBox").css('color', 'green');  $("#agendaSuccessBox").html("Success!");*/});         
      }
      else
        sendPut(agendaID, agendaTitle, agendaDescription, agendaDuration, agendaPurpose)        
    });
    
    console.log("Form invalid 3: " + formValid);
    
    if(formValid == false)
      return false
    else
      window.location.reload();
}
 
function sendPut(agendaID, agendaTitle, agendaDescription, agendaDuration, agendaPurpose)
{
  var postData = Object.assign({}, objMeeting),
  postAgendaData = postData.agenda, postAgendaDataN,
  i, formPutRequest = new XMLHttpRequest(),
  requestParams = "", prop;
  var meetingId = meetingID;
  var requestUrl = window.location.protocol + "//" + window.location.host;
  var apiPath = "/api/meetings/" + meetingID + "/agenda/" + agendaID;
   
  console.log("postAgendaData: " + JSON.stringify(postAgendaData, null, 4));
  console.log("postAgendaData.length: " + Object.keys(postAgendaData).length)
  
  function checkChange(i)
  {
      if(postAgendaData[i].title != agendaTitle)
         return true;
      if(postAgendaData[i].description != agendaDescription) 
         return true;
      if(postAgendaData[i].duration != agendaDuration) 
         return true;
      if(postAgendaData[i].purpose != agendaPurpose)
         return true;      //"Informational," "Decision," or "Other"
      else
      {
        return false
      }
  }
  
  for(var i = 0; i < Object.keys(postAgendaData).length; i++)
  {
    console.log("Agenda item " + i + " is " + postAgendaData[i]._id);
    if(postAgendaData[i]._id === agendaID && checkChange(i))
    {
      console.log("Changing data on: " + agendaID);
      postAgendaData[i].title = agendaTitle;
      postAgendaData[i].description = agendaDescription; 
      postAgendaData[i].duration = agendaDuration;
      postAgendaData[i].purpose = agendaPurpose; //"Informational," "Decision," or "Other"
      postAgendaDataN = postAgendaData[i]; //get this data item for URL encoding;            
    }
    else if(postAgendaData[i]._id === agendaID && checkChange(i) == false)
    {
      //$("#agendaSuccessBox").css('color', 'green');
      //$("#agendaSuccessBox").html("Success!");  
      return false;
    }
  }
  
  formPutRequest.open("PUT", requestUrl + apiPath);
  formPutRequest.onreadystatechange = function() {
    if(formPutRequest.readyState === XMLHttpRequest.DONE && formPutRequest.status === 200) {
        //window.alert("Status updated successfully!");
        console.log("Request succeeded:");
        console.log(formPutRequest.responseText);
      } else if (formPutRequest.status !== 200) {
        console.log("Request failed: ");
        console.log(formPutRequest.readyState, formPutRequest.status);
      }
  };
  
  // serialize postAgendaData properties for URL encoding
  for (prop in postAgendaDataN) {
    if (postAgendaDataN.hasOwnProperty(prop)) {
      requestParams += prop + "=" + postAgendaDataN[prop] + "&";
      console.log(requestParams);
    }
  }

  // remove the trailing "&"
  requestParams = requestParams.substr(0, requestParams.length - 1);
  console.log("requestParams: " + requestParams);    

  formPutRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  formPutRequest.responseType = "text";
  formPutRequest.send(requestParams);   
  // $("#agendaSuccessBox").css('color', 'green');
  //$("#agendaSuccessBox").html("Success!");   
}
