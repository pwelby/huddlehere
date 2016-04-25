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
 


 for(var i = 0; i < numAgenda; i++)
 {
   var memberDiv = $('#agendaItems');
   var title = objAgenda[i].title;
   var desc = objAgenda[i].description;
   var ID = objAgenda[i]._id;
    $('<span id = "ID-' + ID + '"><p><input type="text" id="agendaItem' + i + '"size="20" name="agendaItem' + i +'" value="' + title + '" placeholder="Agenda Item" /> <input type="button" id="rmvAgendaBtn" value="Remove"></input> <br> <div> <textarea value = "" style="resize: none;" cols="80%" rows="2" form="agendaDesc' + i + '" id="agendaDesc' + i + '" name="agendaDesc' + i + '" placeholder="Agenda Description">' + desc + '</textarea>&nbsp</label> <div> &nbsp; </div>').appendTo(memberDiv);
 }
 
  //handles agenda items
   $(function() {
          var memberDiv = $('#agendaItems');
          var i =  $('#agendaItems p').size() + 1;
          $('#addAgendaBtn').on('click', function() {
                  $('<span id="ID-NONE"><p><input type="text" id="agendaItem' + i + '"size="20" name="agendaItem' + i +'" value="" placeholder="Agenda Item" /> <input type="button" id="rmvAgendaBtn" value="Remove"></input> <br> <div> <textarea style="resize: none;" cols="80%" rows="2" form="agendaDesc' + i + '" id="agendaDesc' + i + '" name="agendaDesc' + i + '" placeholder="Agenda Description" />&nbsp</label> <div> &nbsp; </div>').appendTo(memberDiv);
                  i++;      
                  return false;
          });
          
          $('body').on('click', '#rmvAgendaBtn', function() { 
                  console.log($(this).closest('span').attr('id'));
                  
                  agendaID = $(this).closest('span').attr('id');
                  agendaID = (agendaID.substring(agendaID.indexOf("-") + 1))
                  console.log(agendaID);
                  
                  /*
                  $.ajax({
                      url: window.location.protocol + "//" + window.location.host + "/meetings/" + meetingID + "/agenda/" + agendaID,
                      type: 'DELETE',
                      success: function(result) {
                          console.log("Done!")
                      }
                  });
                  */
                  
                  //-------------------------
                    delRequest = new XMLHttpRequest();
                    delRequest.open("DELETE", window.location.protocol + "//" + window.location.host + "/meetings/" + meetingID + "/agenda/" + agendaID);
                    delRequest.onreadystatechange = function() {
                      if(delRequest.readyState === XMLHttpRequest.DONE && delRequest.status === 200) {
                        window.alert("Status updated successfully!");
                        console.log("Request succeeded:");
                        console.log(delRequest.responseText);
                      } else if (delRequest.status !== 200) {
                        console.log("Request failed: ");
                        console.log(delRequest.readyState, delRequest.status);
                      }
                    };
                    delRequest.send();
                  //-----------------------
                  
                  $(this).closest('span').remove();
                  i--;
                  return false;
          });
  });

  $('body').on('click', '#submitAgenda', function() {
      submitAgenda();
    });
    
  function submitAgenda() {    
    var size = $('#agendaItems p').size();
    console.log(size);
    for( var i = 1; i <= size; i++)
    {
      var agendaTitle = $("#agendaItem" + i).val();
      var agendaDescription = $("#agendaDesc" + i).val();
      var agendaID = $("#agendaItem" + i).closest('span').attr('id');  
      
      if(agendaID == "ID-NONE")
      {
        var createAgenda = {
          title: agendaTitle,
          description: agendaDescription,
          purpose: "none",  //"Informational," "Decision," or "Other"
          duration: 60,
          comments: ""
        }
        
        $.post(window.location.protocol + "//" + window.location.host + "/api/meetings/" + meetingID + "/agenda", createAgenda, function(data, textStatus, jqXHR) {
          var pagePath = "/m/" + data._id + "/l";      
        }, "json");  
      }
    }
  };
