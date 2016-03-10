/**
 * File: nav.js -- Single-page navigation for alpha test
 */

window.onload = function(){
    console.log("onload event fired");
    //if(!location.hash) {
    //    location.hash = "#create";
    //}

    // Must call navigate() to show content when the page first loads
    if (location.hash) {
      navigate();
    }
    // Add navigate() as a handler for the hashchange event
    window.addEventListener("hashchange", navigate);

    // Handle the user's attempts to navigate.
    //
    function navigate() {
        var fragment = location.hash.substr(1),
            contentDiv = document.getElementById("mainContainer");

        fetchContent(fragment, function(content){
            contentDiv.innerHTML = content;
            if (fragment === "create") {
              initMap();
            } else if (fragment === "planner-leader") {
              writeTime();
              setAvailable();
            } else if (fragment === "planner-member") {
              writeTime();
            }
        });

        // Update the active class for links
        //setActiveLink(fragment);
    }

    // Update the active class attribute for each link in the nav area
    function setActiveLink(fragment){
        var links = document.querySelectorAll("#navArea a"),
            i, pageName;

        for(i = 0; i < links.length; i++){
            pageName = links[i].getAttribute("href").substr(1);
            if(pageName === fragment) {
                links[i].setAttribute("class", "active");
            } else {
                links[i].removeAttribute("class");
            }
        }
    }

    // Fetch HTML content by fragment ID, then hand it back
    // via the callback provided
    // (note: the only callback used sets the ContentArea's innerHTML attribute
    // to the full content of the response)
    function fetchContent(fragment, callback){
        var request = new XMLHttpRequest();

        request.onload = function() {
            callback(request.responseText);
        };

        request.open("GET", "/markup/" + fragment + ".html");
        request.send(null);
    }
};