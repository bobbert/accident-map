
function initMap() {

  var mapObject = null;
  var accidentData = null;

  // initialize map
  var $map = $('#mapCanvas');
  var mapOptions = {
    center: new google.maps.LatLng(39.183917, -76.805643),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 8
  };

  mapObject = new google.maps.Map(($map || [])[0], mapOptions);

  $.get('/data.json')
   .done(function(data) {
     accidentData = data;
     console.log(accidentData.length + ' data records received.');
     $.each(accidentData, function(index, dataRecord) {
       new google.maps.Marker({
          position: {lat: dataRecord.lat, lng: dataRecord.lng},
          map: mapObject
        });

     });
   })
   .fail(function(jqXHR, textStatus) {
     alert('Error getting data from server: ' + textStatus);
   });

}
