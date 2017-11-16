const API_key = require('config.js')
var request = require("request");

// GET FOR ALL EVENTS ON LOAD


var options = { method: 'GET',
  url: 'https://www.eventbriteapi.com/v3/events',					// adjust endpoint
  headers: 
   { q: '#',
     categories: '#',
     'start_date.range_start' : '#',

     authorization: 'Bearer DRJSTEGUKULYO4VVSHJJ' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// GET FOR FILTERS - DATE, CATEGORY, PRICE

