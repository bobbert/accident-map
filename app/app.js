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
      },
      dates: function() {
        return _(this.allMarkers)
                .map(function(marker) { return marker.date; })
                .uniq()
                .sort()
                .value();
      },
      reportTypes: function() {
        return _(this.allMarkers)
                .map(function(marker) { return marker.reportType; })
                .uniq()
                .sort()
                .value();
      }
    },
    methods: {
      loadAllDataPoints: function() {
        var vueObj = this;

        $.get('/data.json')
         .done(function(data) {
           vueObj.allMarkers = [];
           console.log(data.length + ' data records received.');
           for (var i = 0, len = data.length; i < len; i++) {
             var dataRecord = data[i];
             dataRecord.position = {lat: dataRecord.lat, lng: dataRecord.lng};
             if (len - 1 === i) {
               // trigger Vue update only on last record pushed to array
               vueObj.allMarkers.push(dataRecord);
             }
             else {
               vueObj.allMarkers[i] = dataRecord;
             }
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
