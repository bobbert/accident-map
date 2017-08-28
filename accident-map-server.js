var express = require('express');
var _ = require('lodash-node');
var fs = require('fs');

const HTTP_PORT = 3000;

var app = express();

// serve up everything in 'app' directory as static assets
app.use(express.static('app'));

// establish routes for static assets in node_modules
app.use('/jquery',    express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/vue',       express.static(__dirname + '/node_modules/vue/dist/'));

// Start Express
app.listen(HTTP_PORT, function () {
  console.log('Accident Map app listening on port ' + HTTP_PORT + '.');
})
