'use strict';

var express = require('express');

const HTTP_PORT = 3000;

var app = express();

// serve up everything in 'app' directory as static assets
app.use(express.static('app'));

// establish routes for static assets in node_modules
app.use('/jquery',    express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/lodash',    express.static(__dirname + '/node_modules/lodash/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/vue',       express.static(__dirname + '/node_modules/vue/dist/'));
app.use('/vue-ui',    express.static(__dirname + '/node_modules/vue-ui-components/dist/'));
app.use('/vue-gm',    express.static(__dirname + '/node_modules/vue2-google-maps/dist/'));

var AccidentData = require('./accident-data');
var accidentData = new AccidentData();

app.get('/data.json', function(req, res) {
  res.send(accidentData.simpleData);
});

// Start Express
app.listen(HTTP_PORT, function () {
  console.log('Accident Map app listening on port ' + HTTP_PORT + '.');
});
