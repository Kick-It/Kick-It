const API_key = require('../config.js').API_key;
var request = require('request');

//==========================================================================================
//                     options for get request
//==========================================================================================

// options for Weekend
let weekend_options = { 
    method: 'GET',
    url: 'https://www.eventbriteapi.com/v3/events/search',
    qs: 
    { 
      'start_date.keyword' : 'this_weekend',
      'sort_by' : 'date',
      'address' : 'san francisco'

    },
    headers: 
    { authorization: API_key} 
};


// options for Month
  const month_options = { 
    method: 'GET',
    url: 'https://www.eventbriteapi.com/v3/events/search',
    qs: 
    {
        'start_date.keyword': 'this_month',
        'sort_by' : 'date',
        'address' : 'san francisco'
    },
  headers: 
  { authorization: API_key }, 
};

//==========================================================================================
//                    GET requests
//==========================================================================================


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