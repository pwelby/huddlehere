/**
 * File: /public/javascripts/memberPost.js
 * Author: Peter Welby
 * 
 * Handles member availability status updates
 */

// TODO(Peter): Add validation here so that we don't get messed up by
// unselected members or empty :selected collections

$('#submitForm').click(function (e) {
  var postData = Object.assign({}, objMeeting),
    i, formPutRequest = new XMLHttpRequest(),
    selMember = $("#memberPicker").val(),
    currStatus;
  var meetingId = postData._id;
  var apiPath = "/api/meetings/" + meetingId;
  
  if ($("#statAvailable").is(":selected")) {
    currStatus = "Available";
  } else {
    currStatus = "Unavailable";
  }
  
  formPutRequest.open("PUT", window.location.protocol + "//" + window.location.host + apiPath);
  formPutRequest.setRequestHeader("Content-Type", "application/json");
  formPutRequest.responseType = "json";
  
  for (i = 0; i < postData.members.length; i++) {
    if (selMember === postData.members[i].split(';')[0]) {
      postData.members[i] = postData.members[i].split(';')[0] + ";" + currStatus;
    }
  }
  console.log("postData:");
  console.log(postData);
  
  formPutRequest.onreadystatechange = function() {
    if(formPutRequest.readyState === XMLHttpRequest.DONE && formPutRequest.status === 200) {
      window.alert("Status updated successfully!");
    }
  };
  
  console.log("request:");
  console.log(formPutRequest);
  
  formPutRequest.send(postData);
});