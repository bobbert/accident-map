'use strict';

const DATA_JSON_PATH = './data/maryland_accident_data.json'
var fs = require('fs');
var _ = require('lodash-node');

// Reads and parses JSON data from data.maryland.gov.
// Fields:
// * metadata - information about the data set (description, date updated, etc.)
// * formattedData - an array of objects, where each object contains information
//      for one accident
function AccidentData() {

  var rawData = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

  // get metadata from JSON
  this.metadata = rawData.meta.view;

  // Convert array data into objects.  Sample raw data array by element with description
  // after the "=>" arrow.
  // [ 4303,   => database id
  //   "7A9DAC55-2AC9-4834-9D9E-E9CE52949A59",  => uuid
  //   4303,   => id
  //   1502817675,   => timestamp in seconds
  //   "697478",     => ???
  //   1502817675,   => timestamp in seconds
  //   "697478",     => ???
  //   "{\n  \"invalidCells\" : {\n    \"4499806\" : \"7/13/2017 3:22:00 PM\"\n  }\n}",  => ???
  //   "17CS00128436",   => MGRS coordinates
  //   "2017-07-08T00:00:00",  => stringifed datetime
  //   null,
  //   "Injury Crash",  => description
  //   [ null, "39.2842696275", "-76.5424910188", null, false ]  => [?,lat,lon,?,?]
  // ]
  this.formattedData = _.map(rawData.data, function(dataRowArray) {
    var id      = dataRowArray[0];
    var uuid    = dataRowArray[1];
    var seconds = dataRowArray[3];
    var desc    = dataRowArray[11];
    var latlon  = dataRowArray[12] || [null, null, null];
    return {
      id: id,
      uuid: uuid,
      timestamp: (seconds * 1000),
      description: desc,
      lat: parseFloat(latlon[1]),
      lon: parseFloat(latlon[2])
    };
  });
}

module.exports = AccidentData;
