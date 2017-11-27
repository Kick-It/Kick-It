const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");
const getEvents = require('../lib/eventbrite.js');
const Promise = require('bluebird');
const PORT = process.env.PORT || 3000;
const moment = require('moment');
const API_key = require('../config.js').API_key;

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
  let holder = [];
  let start = moment().format();
  let end = moment().add(30,'day').format();
  console.log(end);

  let month_options = { 
      method: 'GET',
      url: 'https://www.eventbriteapi.com/v3/events/search',
      qs: 
      {
          //'start_date.keyword': 'this_month',
          'start_date.range_start': '2017-11-27T19:00:00',
          'start_date.range_end': '2017-12-30T19:00:00',
          'location.address' : 'san francisco',
          'categories' : '103,110,113,116,17001,104,105,102,118,108,109',
          'page' : 1,
      },
    headers: 
    { authorization: API_key }, 
  }
  
  let getCalls = () =>{
    return new Promise((resolve, reject) =>{ 
      request(month_options, function(error, response, body){
        let page = JSON.parse(body).pagination.page_number;
        let parsedEvents = JSON.parse(body).events;
        if (!error) {
            holder = holder.concat(parsedEvents);
          if (page < 5) {
            month_options.qs.page +=1;
            resolve(getCalls());
          } else {
            resolve(holder);
          }
        } else {
          console.log(error);
          reject(error)
        }
      });
    })
  }

  getCalls()
  .then((holder)=>{
    console.log(holder.length);
    return holder.map((event) => {
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
          category_id: catID,
          day: moment(event.start.local).format('dddd'),
        }
      })
    })
    .then((formattedEvents) => {
      // ADD TO DB
      db.addEvents(formattedEvents)
        .then( (results) => { 
      // //GET TODAYS EVENTS FROM THE DB
          db.getTodaysEvents()
            .then((data) =>{
              responseObj.today = data.rows;
              res.json(responseObj);
            })
        })
    })
    .then(()=>{
      app.get('/weekend', function(req, res) {
      getEvents.weekend()
      .then((data) =>{
        res.json(data);
      })
    })
  });
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

module.exports = app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
