/**
 * File: /public/javascripts/memberComment.js
 * Author: Alexander Li
 * 
 * Handles member comment data post to api
 */

//variables for various document ids
var meetingURL = window.location.pathname;
var meetingParse = (meetingURL.substring(meetingURL.indexOf("m/") + 2));
var meetingID = meetingParse.substring(0, meetingParse.indexOf("/"));

var numAgenda = objMeeting.agenda.length;
var objAgenda = objMeeting.agenda;

var numComments;

//Function is activated on button click to submit comment and is passed the corresponding agenda document id
var submitComment = function(id){
    var commentName = $("#commentName" + id).val();
    var commentText = $("#commentText" + id).val();
    console.log(commentName);
    console.log(commentText);
    var createComment = {
        commenter: commentName,
        commentText: commentText
    };
    $.post(window.location.protocol + "//" + window.location.host + "/api/meetings/" + meetingID + "/agenda/" + id + "/comments", createComment, function(){console.log("done");});
    window.location.reload();
};

var fetchComments = function(){
    var i,j = 0;
    var header, body, end;
    //loops through all agenda items and fetches all comments associated with each
    for(i = 0; i < numAgenda; i++ ){
       numComments = objMeeting.agenda[i].comments.length;
       for(j = 0; j < numComments; j++){
           header = "<div id = " + "'" + objMeeting.agenda[i].comments[j]._id + "/" + objMeeting.agenda[i]._id + "' style = 'border: 1px solid #e1e1e1; margin: 15px; border-radius: 10px;' > <i class='fa fa-times' aria-hidden='true' style = 'margin: 5px; ' onclick = deleteComment(this);></i>";
           body = " <h4 style =' margin: 15px; '> " + objMeeting.agenda[i].comments[j].commenter + "</h4>"  + "<p style = 'margin:15px;'>" + generateDate(objMeeting.agenda[i].comments[j].created) + "</p>" + "\n  <div><p style = ' margin: 15px; '> " + objMeeting.agenda[i].comments[j].commentText + "</p> </div>";
           end = "</div>";
           $("#panel_body" + objMeeting.agenda[i]._id).append(header + body + end);
           console.log("appending to" + "#panel_body" + objMeeting.agenda[i].comments[j]._id)
       }
    }
};
//converts date from isodate format into a readable string
var generateDate = function(date){
    var output = "";
    //get month
    output += date.substring(5,7) + "/";
    //get day
    output += date.substring(8,10) + "/";
    //get year
    output += date.substring(0,4) + "  ";
    return output;
    
}
//deletes corresponding comment when X icon is clicked
var deleteComment = function(obj){
   //agendaid and commentid are stored inside attribute id like so commentid/agendaid
   var ids = $(obj).parent().attr("id").split("/");
   agendaID = ids[1];
   commentID = ids[0];
   console.log(agendaID);
   console.log(commentID);
   
   delRequest = new XMLHttpRequest();
   delRequest.open("DELETE", window.location.protocol + "//" + window.location.host + "/api/meetings/" + meetingID + "/agenda/" + agendaID + "/comments/" + commentID);
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
        window.location.reload();
   

}
fetchComments();