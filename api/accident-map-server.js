'use strict';

const express = require('express'),
      _     = require('lodash'),
      cors  = require('cors');

const HTTP_PORT = 3000;

var app = express();

// serve up everything in 'app' directory as static assets
app.use(express.static('app'));

// allow cross-origin API calls
app.use(cors());

// establish routes for static assets in node_modules
app.use('/jquery',    express.static(__dirname + '/node_modules/jquery/dist/'));

const AccidentData = require('./accident-data');
const accidentData = new AccidentData();

const filterableFields = [
  'date',
  'reportType',
  'year',
  'make',
  'agencyName'
];

app.get('/accidents.json', function(req, res) {
  let {
    date,
    reportType,
    year,
    make,
    agencyName
  } = req.query;

  const filterOptions = Object.assign({}, 
    (date == null) ? {} : {date},
    (reportType == null) ? {} : {reportType},
    (year == null) ? {} : {year},
    (make == null) ? {} : {make},
    (agencyName == null) ? {} : {agencyName}
  );

  res.send(filterAccidentsBy(filterOptions));
});

app.get('/accident-date-list.json', function(req, res) {
  let dates = _(accidentData.simpleData)
    .map(accident => accident.date)
    .uniq()
    .sort()
    .reverse()
    .value();

  res.send(dates);
});

app.get('/accident-type-list.json', function(req, res) {
  let accidentTypes = _(accidentData.simpleData)
    .map(accident => accident.reportType)
    .uniq()
    .sort()
    .value();

  res.send(accidentTypes);
});

app.get('/agency-name-list.json', function(req, res) {
  let agencyNames = _(accidentData.simpleData)
    .map(accident => accident.agencyName)
    .uniq()
    .sort()
    .value();

  res.send(agencyNames);
});

app.get('/car-make-list.json', function(req, res) {
  let agencyNames = _(accidentData.simpleData)
    .map(accident => accident.make)
    .uniq()
    .sort()
    .value();

  res.send(agencyNames);
});

function filterAccidentsBy(filterObj = {}) {
  let selectedData = accidentData.simpleData;
  // filter on each attribute if
  const filterFields = getFilterFields(filterObj);
  filterFields.forEach(filterField => {
    const filterValue = filterObj[filterField];
    selectedData = selectedData.filter(accident => accident[filterField] === filterValue);
  })
  return selectedData;
}

function getFilterFields(filterObj = {}) {
  const filterObjKeys = Object.keys(filterObj);
  return filterableFields.filter(filterableField => {
    return (filterObjKeys.includes(filterableField));
  })
}

function selectBy(fieldName) {
  return _(accidentData.simpleData)
  .map(accident => accident[fieldName])
  .uniq()
  .sort()
  .reverse()
  .value();
}


// Start Express
app.listen(HTTP_PORT, function () {
  console.log('Accident Map app listening on port ' + HTTP_PORT + '.');
});
