var writeTime = function() {
  console.log("called writeTime!");
  if (location.hash === "planner-leader") {
    $("#leadStartTime").text(objFormData.strTimeStart);
    $("#leadEndTime").text(objFormData.strTimeEnd);
  } else if (location.hash === "planner-member") {
    $("#memStartTime").text(objFormData.strTimeStart);
    $("#memEndTime").text(objFormData.strTimeEnd);
  }
};