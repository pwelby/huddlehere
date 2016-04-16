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
    currStatus, requestParams = "", prop, arrMembers;
    
  var meetingId = postData._id;
  var requestUrl = window.location.protocol + "//" + window.location.host;
  var apiPath = "/api/meetings/" + meetingId;
  
  // get current status
  if ($("#statAvailable").is(":checked")) {
    currStatus = "Available";
  } else {
    currStatus = "Unavailable";
  }
  
  console.log("currStatus: " + currStatus);
  console.log("selMember: " + selMember);
  
  // update selected member's status
  for (i = 0; i < postData.members.length; i++) {
    if (selMember === postData.members[i].split(';')[0]) {
      postData.members[i] = postData.members[i].split(';')[0] + ";" + currStatus;
    }
  }
  
  // reconstruct the comma-separated members list to send to API
  arrMembers = postData.members;
  postData.members = "";
  for (i = 0; i < arrMembers.length; i++) {
    postData.members += arrMembers[i] + ",";
  }
  // remove the trailing ","
  postData.members = postData.members.substr(0, postData.members.length - 1);
  console.log("reconstructed member string: " + postData.members);
  
  // reconstruct the comma-separated location array to send to API
  postData.location = "" + postData.location[0] + "," + postData.location[1];
  console.log("reconstructed location string: " + postData.location);

  formPutRequest.open("PUT", requestUrl + apiPath);
  formPutRequest.onreadystatechange = function() {
    if(formPutRequest.readyState === XMLHttpRequest.DONE && formPutRequest.status === 200) {
      window.alert("Status updated successfully!");
      console.log("Request succeeded:");
      console.log(formPutRequest.responseText);
    } else if (formPutRequest.status !== 200) {
      console.log("Request failed: ");
      console.log(formPutRequest.readyState, formPutRequest.status);
    }
  };
  
  
  
  // serialize postData properties for URL encoding
  for (prop in postData) {
    if (postData.hasOwnProperty(prop)) {
      requestParams += prop + "=" + postData[prop] + "&";
    }
  }
  // remove the trailing "&"
  requestParams = requestParams.substr(0, requestParams.length - 1);
  console.log("requestParams: " + requestParams);
  
  formPutRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  formPutRequest.responseType = "json";
  formPutRequest.send(requestParams);
});