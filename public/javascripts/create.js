   
    //geocoder
    
    function initPreSelMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
      });
      
      var geocoder = new google.maps.Geocoder();

      document.getElementById('submitLoc').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
    }

    function geocodeAddress(geocoder, resultsMap) {
      var street = document.getElementById('preSelTextBoxStreet').value;
      var city = document.getElementById('preSelTextBoxCity').value;
      var state = document.getElementById('preSelTextBoxState').value;
      address = street + "," + city + "," + state;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          resultsMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    } 

    function initNearbyMap() {
    
      var myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
       map = new google.maps.Map(document.getElementById("map"), myOptions);

      // Stuff for nearby
      // Try W3C Geolocation (Preferred)
      if(navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
          nearbyLoc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          map.setCenter(nearbyLoc);
        }, function() {
          handleNoGeolocation(browserSupportFlag);
        });
      }
      // Browser doesn't support Geolocation
      else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
      }

      function handleNoGeolocation(errorFlag) {
        if (errorFlag == true) {
          alert("Geolocation service failed. Did you block it? We've placed you in New York");
          nearbyLoc = newyork;
        } else {
          alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
          nearbyLoc = siberia;
        }
        map.setCenter(nearbyLoc);
      }
    }
    
    function findPreSelMap()
    {
      initPreSelMap();
    }
    
    // Preselect or nearby textbox enable
    $( document ).ready(function() {
        initNearbyMap();
        $(".locRadio").click(function() 
        {
          $("#preSelTextBoxStreet").attr("disabled", true); 
          $("#preSelTextBoxCity").attr("disabled", true); 
          $("#preSelTextBoxState").attr("disabled", true); 
          google.maps.event.addDomListener(window, 'load', initNearbyMap());
          if ($("input[name=loc]:checked").val() == "preSel") 
          {
            $("#preSelTextBoxStreet").attr("disabled", false); 
            $("#preSelTextBoxCity").attr("disabled", false); 
            $("#preSelTextBoxState").attr("disabled", false); 
            findPreSelMap();
          }
        });  

        $('.dropdown-toggle').dropdown()    

        $(function() 
        {
          $( "#datepicker" ).datepicker();
        });

      }); //close document.ready
