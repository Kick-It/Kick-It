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

//id
//name
//description
//price
//url
//image_url
//start_datetime
//end_datetime

//TEST CHANGES WEDS

app.get('/loadWeekend', function (req, res) {
  getEvents.month()
    .then((data)=> {    
      let dataFormatted = data.events.map((event) => {
        return {
          name: event.name.text,
          description: event.description.text,
          price: event.is_free,
          url: event.resource_url,
          image_url: event.logo.url,
          start_datetime: event.start.local,
          end_datetime: event.end.local,
        } 
      });
      // save dataFormatted to DB
    })
  getEvents.weekend()
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
