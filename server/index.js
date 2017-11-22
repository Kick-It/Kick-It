const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const getEvents = require('../lib/eventbrite.js');
const Promise = require('bluebird');


const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

//testing
// app.get('/storeMonth', function (req, res) {
//   return getEvents.month().then((data) =>{
//     // ### save data to DB.
//     res.statusCode();
//     res.end();
//     });
// });

app.get('/loadWeekend', function (req, res) {
  getEvents.month()
    .then((data)=> {
      //save to DB
    })
  getEvents.week()
    .then((data) =>{
      res.json(data);
    });
});

app.get('/loadToday', function (req, res) {
  getEvents.today()
    .then((data) =>{
      res.json(data);
    });
});
    

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
