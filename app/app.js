$(document).ready(function() {

  const MAX_MARKERS = 1000;

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyD8JxzIChVrQJLgS6RRcbx175EU2K8yQgs'
    }
  });

  var appVM = new Vue({
    el: '#app-container',
    data: {
      allMarkers: [],
      filter: {}
    },
    computed: {
      markers: function() {
        // TODO: replace filter method with actual filtering logic
        return _(this.allMarkers)
                .filter(function() { return true; })
                .take(MAX_MARKERS)
                .value();
      }
    },
    methods: {
      loadAllDataPoints: function() {
        var vueObj = this;

        $.get('/data.json')
         .done(function(data) {
           console.log(data.length + ' data records received.');
           for (var i = 0, len = data.length; i < len; i++) {
             var dataRecord = data[i];
             vueObj.allMarkers.push({position: {lat: dataRecord.lat, lng: dataRecord.lng}});
           }
         })
         .fail(function(jqXHR, textStatus) {
           alert('Error getting data from server: ' + textStatus);
         });

      }
    }
  });

  appVM.loadAllDataPoints();

});
