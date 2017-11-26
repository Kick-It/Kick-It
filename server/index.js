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
const addEvents = require('../database/index.js').addEvents;
const searchAllEvents = require('../database/index.js').searchAllEvents;

// ======================================================================
//   API month's events + venues -> Save to DB
//   API weekend's events ->  Client
// ======================================================================



app.get('/initialLoad', function (req, res) {
  let responseObj = {};
  
  getEvents.month()
    .then((data)=> {    
      let parsed = JSON.parse(data);
      return parsed.events.map((event) => {
        let imageUrl = event.logo ? event.logo.url : 'https://cdn.evbstatic.com/s3-build/perm_001/f8c5fa/django/images/discovery/default_logos/4.png';    
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
          category_id: event.category_id,
          day: moment(event.start.local).format('dddd'),
        }
      });
    })  //ADD TO DB
    .then((formattedEvents) => {
      addEvents(formattedEvents);
    })

    //================================================================================
    //          REFACTORED TO USE DB QUERIES
    //================================================================================
    .then(() =>{ //GET WEEKEND EVENTS FROM THE DB
      getWeekendEventsDB()
        .then((data) =>{
          responseObj.weekend = data.rows;
        });
    })
    .then(() =>{ //GET TODAYS EVENTS FROM THE DB
      getTodayEventsDB()
        .then((data) =>{
          responseObj.today = data.rows
        });
    })
    .then(()=>{
      res.json(responseObj);
    });

    //================================================================================
    //          API CALL TO SET STATE ON LOAD
    //================================================================================
    // .then(()=> {
    //   getEvents.weekend()
    //     .then((data) =>{
    //       res.json(data); 
    //     })
    // });

  }); 


// ======================================================================
//                    Query the DB on client filters
// ======================================================================
app.post('/filter', function(req,res) {
  let date = req.body.date;
  let categories = req.body.category;
  let price = req.body.price;

  searchAllEvents(date, categories, price)
    .then((data) => {
      console.log(data.rows, typeof data.rows);
      res.json(data);
    })
});


// ======================================================================
//                    Send today's data back to the client
// ======================================================================
app.get('/loadToday', function (req, res) {
  // getEvents.today()
  //   .then((data) =>{
  //     res.json(data);
  //   });
  getTodayEventsDB
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
