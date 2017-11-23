const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const getEvents = require('../lib/eventbrite.js');
const Promise = require('bluebird');
const PORT = process.env.PORT || 3000;
const searchAllEvents = require('../database.index.js').searchAllEvents;


const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/loadWeekend', function (req, res) {
  getEvents.month()
    .then((data)=> {    
      let parsed = JSON.parse(data);
      let dataFormatted = parsed.events.map((event) => {
        let imageUrl = event.logo ? event.logo.url : 'https://cdn.evbstatic.com/s3-build/perm_001/f8c5fa/django/images/discovery/default_logos/4.png';    
        let catID = event.subcategory_id === 17001 ? event.subcategory_id : event.category_id; 
        // is isFree is true, pass in true
        return {
          id: event.id,
          name: event.name.text,
          description: event.description.text,
          venue_id: event.venue_id,
          price: event.is_free,
          url: event.url,
          image_url: imageUrl,
          start_datetime: event.start.local,
          end_datetime: event.end.local,
          cateogry_id: event.category_id,
        }
      });
      // save dataFormatted to DB
    
  getEvents.weekend()
    .then((data) =>{
      res.json(data);
    });
  });
});

app.post('/filter', function(req,res) {
  let date = req.body.date;
  let categories = req.body.category;
  let price = req.body.price;

  //searchAllEvents(date, categories, price);
    
})

app.get('/loadToday', function (req, res) {
  getEvents.today()
    .then((data) =>{
      res.json(data);
    });
});
    

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
