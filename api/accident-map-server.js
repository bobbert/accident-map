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
app.use('/lodash',    express.static(__dirname + '/node_modules/lodash/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));

var AccidentData = require('./accident-data');
var accidentData = new AccidentData();

app.get('/accidents.json', function(req, res) {
  let dateSelected = req.query.date;

  if (dateSelected == null) {
    res.send({data: accidentData.simpleData});
  }
  else {
    let dataByDate = accidentData.simpleData.filter(accident => {
      return (dateSelected === accident.date);
    });
    res.send(dataByDate);
  }
});

app.get('/accident-dates.json', function(req, res) {
  let dates = _(accidentData.simpleData)
    .map(accident => accident.date)
    .uniq()
    .sort()
    .reverse()
    .value();

  res.send(dates);
});

// Start Express
app.listen(HTTP_PORT, function () {
  console.log('Accident Map app listening on port ' + HTTP_PORT + '.');
});
