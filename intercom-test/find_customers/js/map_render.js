var marker;
var markers = [];
var infowindow;

var MapRender = {

  init : function(){
    var baseLat = document.getElementById("baseLat").value;
    var baseLong = document.getElementById("baseLong").value;

    this.map = new google.maps.Map(document.getElementById("mapView"), {
        zoom: 8,
        center: new google.maps.LatLng(baseLat, baseLong),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  },

  showMarkers : function(locations){
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][2], locations[i][3]),
            map: this.map
        });

        markers.push(marker);

        infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            var content = "<div>" + locations[i][0] + "<br/>user_id: " + locations[i][1] + "</div>";
            return function () {
                infowindow.setContent(content);
                infowindow.open(this.map, marker);
            }
        })(marker, i));
    }
  },

  resetMarkers : function(){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
}
