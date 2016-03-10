var setAvailable = function() {
    console.log("setting availability!");
  $("span.memberStatus").each(function() {
    if (Math.random() < 0.5) {
      $(this).text("Not Available");
      $(this).addClass("notavailable");
    } else {
      $(this).text("Available");
      $(this).addClass("available");
    }
  });
};