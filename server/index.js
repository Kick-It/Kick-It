const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const getEvents = require('../lib/eventbrite.js');
const Promise = require('bluebird');
const PORT = process.env.PORT || 3000;
const moment = require('moment');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

//======================================================================
//        Database Functions     
//======================================================================
const db = require('../database/index.js');

// ======================================================================
//   API month's events + venues -> Save to DB
//   API weekend's events ->  Client
// ======================================================================


app.get('/initialLoad', function (req, res) {
  let responseObj = {};
  
  getEvents.month().then((data)=> {
      // console.log('pre-parsed data: ', data.events)
      let parsed = JSON.parse(data);
      return parsed.events.map((event) => {
        let imageUrl = event.logo ? event.logo.url : 'https://cdn.evbstatic.com/s3-build/perm_001/f8c5fa/django/images/discovery/default_logos/4.png';
        console.log(imageUrl);    
        let catID = event.subcategory_id === 17001 ? event.subcategory_id : event.category_id; 
        let defaultPrice = event.is_free ? 'free' : 'paid';
        let eventName = `$$${event.name.text}$$`;
        let eventDesc = `$$${event.description.text}$$`;
        return {
          id: event.id,
          name: eventName,
          description: eventDesc,
          venue_id: event.venue_id,
          price: defaultPrice,
          url: event.url,
          image_url: imageUrl,
          start_datetime: event.start.local,
          end_datetime: event.end.local,
          category_id: catID,
          day: moment(event.start.local).format('dddd'),
        }
      })
    }).then((formattedEvents) => {
      // ADD TO DB
      console.log('formattedEvents: ', formattedEvents)
      db.addEvents(formattedEvents)
        .then( (results) => { 
          console.log('add events promise result: ', results)
      // //GET TODAYS EVENTS FROM THE DB
          db.getTodaysEvents()
            .then((data) =>{
              responseObj.today = data.rows;
              res.json(responseObj);
            })
        })
      })
  });

  app.get('/weekend', function(req, res) {
    console.log('made it to weekend ENDPOINT')
    getEvents.weekend()
      .then((data) =>{
        console.log(data);
        res.json(data);
    })
  }); 


// ======================================================================
//                    Query the DB on client filters
// ======================================================================
app.post('/filter', function(req,res) {
  let date = req.body.date;
  let categories = req.body.category;
  let price = req.body.price;

  db.searchAllEvents(date, categories, price)
    .then((data) => {
      res.json(data);
    })
});


// ======================================================================
//                    Send today's data back to the client
// ======================================================================
app.get('/loadToday', function (req, res) {
  getEvents.today()
    .then((data) =>{
      res.json(data);
    });
  //getTodayEventsDB
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
