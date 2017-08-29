'use strict';

var express = require('express');

const HTTP_PORT = 3000;

var app = express();

// serve up everything in 'app' directory as static assets
app.use(express.static('app'));

// establish routes for static assets in node_modules
app.use('/jquery',    express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/vue',       express.static(__dirname + '/node_modules/vue/dist/'));

var AccidentData = require('./accident-data');
var accidentData = new AccidentData();

app.get('/metadata.json', function(req, res) {
  res.send(accidentData.metadata);
});

app.get('/data.json', function(req, res) {
  res.send(accidentData.formattedData);
});

// Start Express
app.listen(HTTP_PORT, function () {
  console.log('Accident Map app listening on port ' + HTTP_PORT + '.');
});
