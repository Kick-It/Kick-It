const API_key = require('../config.js').API_key;
var request = require("request");

// GET FOR ALL EVENTS ON LOAD

var options = { method: 'GET',
url: 'https://www.eventbriteapi.com/v3/events',
headers: 
{ q: '',
  categories: '#',
  'start_date.range_start' : '#',

  authorization: API_key } };

request(options, function (error, response, body) {
	if (error) throw new Error(error);
	console.log(body);
});