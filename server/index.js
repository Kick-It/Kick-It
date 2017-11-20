const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const getEvents = require('../lib/eventbrite.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/loadMonth', function (req, res) {
  console.log('A GET request was submitted on load');
  // console.log(req.query);
  getEvents.month((data) => {
    // ### save data to DB.
    res.json(data);
  });
});

app.get('/loadWeek', function (req, res) {
  console.log('A GET request was submitted on load');
  getEvents.week((data) => {
    // ### save data to DB.
    res.json(data);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
