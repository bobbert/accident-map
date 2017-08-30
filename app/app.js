$(document).ready(function() {

  const MAX_MARKERS = 1000;

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyD8JxzIChVrQJLgS6RRcbx175EU2K8yQgs'
    }
  });

  var FilterPanel = Vue.component('filter-panel', {
    props: [
      'report-types',
      'dates'
    ],
    template: '<div>' +
      '<label for="dateFilter">Date:</label><br />' +
      '<select id="dateFilter" v-model="selectedDate" @change="updateFilter()">' +
        '<option v-for="dateOption in dates" :value="dateOption">{{ dateOption }}</option>' +
      '</select><br />' +
      '<label for="reportTypeFilter">Report Type:</label><br />' +
      '<select id="reportTypeFilter" v-model="selectedReportType" @change="updateFilter()">' +
        '<option v-for="reportTypeOption in reportTypes" :value="reportTypeOption">{{ reportTypeOption }}</option>' +
      '</select><br />' +
    '</div>',
    data: function() {
      return {
        selectedDate: '10/01/16',
        selectedReportType: null
      };
    },
    methods: {
      updateFilter: function() {
        var filterParams = {
          date: this.selectedDate,
          reportType: this.selectedReportType
        };
        console.log('filter params:', filterParams);
        this.$emit('filter', filterParams);
      }
    }
  });

  var appVM = new Vue({
    el: '#app-container',
    data: {
      allMarkers: [],
      filter: {}
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
        // TODO: replace filter method with actual filtering logic
        return _(this.allMarkers)
                .filter(function(marker) {
                  for (var filterProp in filterParams) {
                    if (marker[filterProp] !== filterParams[filterProp]) {
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
      }
    }
  });

});
