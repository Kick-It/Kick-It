const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const getEvents = require('../lib/eventbrite.js');
const Promise = require('bluebird');
const PORT = process.env.PORT || 3000;

const addEvents = require('../database.index.js').addEvents;
const searchAllEvents = require('../database.index.js').searchAllEvents;

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

// ======================================================================
//       Save month's data to the DB and send weekend Events to Client
// ======================================================================

app.get('/loadWeekend', function (req, res) {
  getEvents.month()
    .then((data)=> {    
      let parsed = JSON.parse(data);
      let dataFormatted = parsed.events.map((event) => {
        let imageUrl = event.logo ? event.logo.url : 'https://cdn.evbstatic.com/s3-build/perm_001/f8c5fa/django/images/discovery/default_logos/4.png';    
        let catID = event.subcategory_id === 17001 ? event.subcategory_id : event.category_id; 
        let defaultPrice = event.is_free? true : false;
        // is isFree is true, pass in true
        return {
          id: event.id,
          name: event.name.text,
          description: event.description.text,
          venue_id: event.venue_id,
          price: defaultPrice,
          url: event.url,
          image_url: imageUrl,
          start_datetime: event.start.local,
          end_datetime: event.end.local,
          cateogry_id: event.category_id,
        }
      });
      addEvents(dataFormatted);
    
  getEvents.weekend()
    .then((data) =>{
      res.json(data);
    });
  });
});

// ======================================================================
//                    Query the DB on client filters
// ======================================================================
app.post('/filter', function(req,res) {
  let date = req.body.date;
  let categories = req.body.category;
  let price = req.body.price;

  searchAllEvents(date, categories, price);
});

// ======================================================================
//                    Send today's data back to the client
// ======================================================================
app.get('/loadToday', function (req, res) {
  getEvents.today()
    .then((data) =>{
      res.json(data);
    });
});
// ======================================================================
//                    load Venues to DB
// ======================================================================
app.get('/loadVenues', function (req, res) {
  getEvents.month()
    .then((data) =>{
      res.json(data);
    });
}); 

// ======================================================================
//                    Run Server
// ======================================================================

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
