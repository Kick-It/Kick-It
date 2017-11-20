var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const https = require("https");
const getEvents = require('../lib/eventbrite.js');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/load', function (req, res) {
  console.log('A GET request was submitted on load');
  getEvents.month((data) => {
    // ### save data to DB.
    res.json(data);
  }
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});