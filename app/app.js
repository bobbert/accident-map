$(document).ready(function() {

  const MAX_MARKERS = 1000;

  import FilterPanel from '@/components/FilterPanel';

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyD8JxzIChVrQJLgS6RRcbx175EU2K8yQgs'
    }
  });

  var appVM = new Vue({
    el: '#app-container',
    data: {
      allMarkers: [],
      filter: {},
      selectedAccidentId: ""
    },
    mounted: function() {
      this.loadAllDataPoints();
    },
    components: {
      'filter-panel': FilterPanel
    },
    computed: {
      markers: function() {
        var filterParams = this.filter;

        return _(this.allMarkers)
                .filter(function(marker) {
                  for (var filterProp in filterParams) {
                    // filterParams may contain either arrays or strings for comparison.
                    // If non-array, then coerce into 1-element array and check for inclusion.
                    if (!_.isArray(filterParams[filterProp])) {
                      filterParams[filterProp] = [filterParams[filterProp]];
                    }
                    if (!_.includes(filterParams[filterProp], marker[filterProp])) {
                      return false;
                    }
                  }
                  return true;
                })
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
      },
      firstDate: function() {
        return (this.dates || [])[0];
      },
      markerCount: function() {
        return {
          count: this.markers.length,
          all: this.allMarkers.length
        };
      },
      displayMessageBar: function() {
        return (this.markerCount.count >= MAX_MARKERS);
      },
      message: function() {
        if (this.displayMessageBar) {
          return "Maxmimum number of viewable data points reached.  " +
            "Displaying " + MAX_MARKERS + " of " + this.markerCount.count + " data points.";
        }
        return null;
      },
      areDetailsVisible: function(selectedId) {
        return (this.selectedAccidentId === selectedId);
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
      },
      redrawMarkers: function(filterParams) {
        // remove properties with null or undefined values
        for (var propName in filterParams) {
          if (filterParams[propName] === null || filterParams[propName] === undefined) {
            delete filterParams[propName];
          }
        }
        this.filter = filterParams;
        console.log("redrawMarkers: filter params", filterParams);
      },
      toggleVisibility: function(selectedId) {
        if (this.selectedAccidentId === selectedId) {
          this.selectedAccidentId = '';
        }
        else {
          this.selectedAccidentId = selectedId;
          $('a#' + selectedId).focus();
        }
      }
    }
  });

});
