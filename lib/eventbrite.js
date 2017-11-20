const API_key = require('../config.js').API_key;
var request = require('request');

// GET FOR ALL EVENTS ON LOAD

let month_options = { method: 'GET',
url: 'https://www.eventbriteapi.com/v3/events',
headers: 
{ q: '',
  categories: '#',
  'start_date.range_start' : '#',

  authorization: API_key } };

let weekend_options = { method: 'GET',
url: 'https://www.eventbriteapi.com/v3/events',
headers: 
{ q: '',
  categories: '#',
  'start_date.range_start' : '#',

  authorization: API_key } };



let getMonthEvents = (callback) => {
    //console.log('MADE IT TO HELPER FUNCTION');

    request(month_options, function (error, response, body) {
    	if (error) {
            console.log('ERROR ON MONTH API CALL', error)
        } else {
    	   console.log(body);
           callback(body);
        }
    });
};

let getWeekEvents = () => {
    request(weekend_options, function(error, response, body) {
        if (error) {
            console.log('ERROR ON WEEK API CALL', error)
        } else {
            console.log(body);
            callback(body);
        }
    });
};


module.exports = {
    month: getMonthEvents,
    week: getWeekEvents 
}