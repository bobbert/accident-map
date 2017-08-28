function initMap() {

  var mapObject = null;

  // initialize map
  var $map = $('#mapCanvas');
  var mapOptions = {
    center: new google.maps.LatLng(39.183917, -76.805643),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 8
  };

  mapObject = new google.maps.Map(($map || [])[0], mapOptions);

}
