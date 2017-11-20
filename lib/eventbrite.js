const API_key = require('../config.js').API_key;
var request = require('request');
    
// GET FOR ALL EVENTS ON LOAD
//37.7749° N, 122.4194° W


let weekend_options = { 
    method: 'GET',
    url: 'https://www.eventbriteapi.com/v3/events/search',
    qs: 
    { 
      'start_date.keyword' : 'this_weekend',
      'sort_by' : 'date',
      //'location.latitude' : '37.7749',
      //'location.longitude' : '122.4194',
      //'location.within' : '3mi',
    },
    headers: 
    { authorization: API_key} 
};

  const month_options = { 
    method: 'GET',
    url: 'https://www.eventbriteapi.com/v3/events/search',
    qs: {
        'start_date.keyword': 'this_month',
        'sort_by' : 'date',
        //'location.latitude' : '37.7749',
        //'location.longitude' : '122.4194',
        //'location.within' : '3mi',
    },
  headers: { 
   authorization: API_key }, 
};


let getMonthEvents = (qs, callback) => {
  // console.log('MADE IT TO HELPER FUNCTION');

  request(month_options, function (error, response, body) {
    if (error) {
        console.log('ERROR ON MONTH API CALL', error)
    } else {
      callback(body);
    }
  });
};

const getWeekEvents = (callback, qs) => {
  console.log(weekend_options);
  request(weekend_options, (error, response, body) => {
    if (error) {
      console.log('ERROR ON WEEK API CALL', error);
    } else {
      callback(body);
    }
  });
};


module.exports = {
  month: getMonthEvents,
  week: getWeekEvents,
}