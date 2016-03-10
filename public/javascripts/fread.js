/**
 * File: fread.js -- read from meeting creation form into global object
 */

$(document).ready(function(){
  $("#createSubmit").click(readForm);
  
  $("#datepicker").on('change', function() {
    console.log("date changed!");
    objFormData.strDate = $("#datepicker").val();
  });
  
  $("#timeStart").on('change', function() {
    console.log("start changed!");
    objFormData.strTimeStart = $("#timeStart").val() + ($("#StartAM").is(":checked") ? " AM" : " PM");
  });
  
  $("#timeEnd").on('change', function() {
    console.log("end changed!");
    objFormData.strTimeEnd = $("#timeEnd").val() + ($("#EndAM").is(":checked") ? " AM" : " PM");
  });
});

var readForm = function() {
  console.log("called readForm!");
  var i, currentItem;
  
  for(i = 1; i <= 3; i++) {
    currentItem = {};
    currentItem.title = "Item " + i;
    currentItem.description = "This is agenda item " + i;
    
    objFormData.agendaItems.push(currentItem);
  }
  alert("Meeting created!");
};