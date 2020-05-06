//<![CDATA[
      // this variable will collect the html which will eventually be placed in the side_bar 
      var side_bar_html = ""; 

      var gmarkers = [];
      var gicons = [];
      var map = null;

var infowindow = new google.maps.InfoWindow(
  { 
    size: new google.maps.Size(150,50)
  });


gicons = new google.maps.MarkerImage('',
      // This marker is 40 pixels wide by 34 pixels tall.
      new google.maps.Size(40, 34),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is at 9,34.
      new google.maps.Point(9, 34));
  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.
 
  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.

  var iconImage = new google.maps.MarkerImage('',
      // This marker is 40 pixels wide by 34 pixels tall.
      new google.maps.Size(40, 34),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is at 9,34.
      new google.maps.Point(9, 34));
  var iconShadow = new google.maps.MarkerImage('',
      // The shadow image is larger in the horizontal dimension
      // while the position and offset are the same as for the main image.
      new google.maps.Size(37, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(9, 34));
      // Shapes define the clickable region of the icon.
      // The type defines an HTML &lt;area&gt; element 'poly' which
      // traces out a polygon as a series of X,Y points. The final
      // coordinate closes the poly by connecting to the first
      // coordinate.

      gicons["egg"] = 'hw icon.png';
      gicons["garden"] = 'garden icon.png';
      gicons["resource"] = 'garden icon.png';
      gicons["grocery"] = 'grocery icon.png';

// A function to create the marker and set up the event window
function createMarker(latlng,name,html,category) {
    var contentString = html;
    var marker = new google.maps.Marker({
        position: latlng,
        icon: gicons[category],
        shadow: iconShadow,
        map: map,
        title: name,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });
        // === Store the category and name info as a marker properties ===
        marker.mycategory = category;                                 
        marker.myname = name;
        gmarkers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
        });
}

      // == shows all markers of a particular category, and ensures the checkbox is checked ==
      function show(category) {
        for (var i=0; i<gmarkers.length; i++) {
          if (gmarkers[i].mycategory == category) {
            gmarkers[i].setVisible(true);
          }
        }
        // == check the checkbox ==
        document.getElementById(category+"box").checked = true;
      }

      // == hides all markers of a particular category, and ensures the checkbox is cleared ==
      function hide(category) {
        for (var i=0; i<gmarkers.length; i++) {
          if (gmarkers[i].mycategory == category) {
            gmarkers[i].setVisible(false);
          }
        }
        // == clear the checkbox ==
        document.getElementById(category+"box").checked = false;
        // == close the info window, in case its open on a marker that we just hid
        infowindow.close();
      }

      // == a checkbox has been clicked ==
      function boxclick(box,category) {
        if (box.checked) {
          show(category);
        } else {
          hide(category);
        }
        // == rebuild the side bar
        makeSidebar();
      }

      function myclick(i) {
        google.maps.event.trigger(gmarkers[i],"click");
      }


      // == rebuilds the sidebar to match the markers currently displayed ==
      function makeSidebar() {
        var html = "";
        for (var i=0; i<gmarkers.length; i++) {
          if (gmarkers[i].getVisible()) {
            html += '<center><a href="javascript:myclick(' + i + ')">' + gmarkers[i].myname + '<\/a></center><br>';
          }
        }
        document.getElementById("side_bar").innerHTML = html;
      }

  function initMap() {
    var UCSB = {lat: 34.4140, lng: -119.8489};
    map = new google.maps.Map(
        document.getElementById("map"), {
            zoom: 15, center: UCSB
    });

    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
        });



      // Read the data
      var location = [
        {
           name: "Egg Chair 1",
           description: "Description goes here",
           lat: "34.413000",
           lng: "-119.845689",
           category: "egg"
        }, {
           name: "Egg Chair 2",
           description: "Description goes here",
           lat: "34.413225",
           lng: "-119.849233",
           category: "egg"
        }, {
           name: "Egg Chair 3",
           description: "Description goes here",
           lat: "34.414297",
           lng: "-119.845546",
           category: "egg"
        }, {
           name: "Egg Chair 4",
           description: "Description goes here",
           lat: "34.411469",
           lng: "-119.846670" ,
           category: "egg"
        }, {
           name: "Egg Chair 5",
           description: "Testing 123",
           lat: "34.411267",
           lng: "-119.845285",
           category: "egg"
        }, {
           name: "Egg Chair 6",
           description: "Testing rewqjhkfdas",
           lat: "34.418319",
           lng: "-119.867980",
           category: "egg"
        }, {
            name: "Egg Chair 7",
            description: "Testing rewqjhkfdas",
            lat: "34.409913",
            lng: "-119.843420",
            category: "egg"            
        }, {
            name: "Garden 1",
            description: "Testing rewqjhkfdas",
            lat: "34.420137",
            lng: "-119.858604",
            category: "garden"               
        }
       ];
        for (var i = 0; i < location.length; i++) {
          // obtain the attribues of each marker
          var lat = location[i].lat;
          var lng = location[i].lng;
          var point = new google.maps.LatLng(lat,lng);
          var description = location[i].description;
          var name = location[i].name;
          var html = "<center><b>"+name+"<\/b></center><p>"+description;
          var category = location[i].category;
          // create the marker
          var marker = createMarker(point,name,html,category);
        }

        // == show or hide the categories initially ==
        hide("egg");
        hide("garden");
        hide("resource");
        hide("grocery")
        // == create the initial sidebar ==
        makeSidebar();
    }

    // This Javascript is based on code provided by the
    // Community Church Javascript Team
    // http://www.bisphamchurch.org.uk/   
    // http://econym.org.uk/gmap/
    // from the v2 tutorial page at:
    // http://econym.org.uk/gmap/example_categories.htm
    //]]>