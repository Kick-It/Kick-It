const API_key = require('../config.js').API_key;
const request = require('request');
const Promise = require('bluebird');

//==========================================================================================
//                     OPTIONS for API get request
//==========================================================================================

// options for Weekend
let weekend_options = { 
    method: 'GET',
    url: 'https://www.eventbriteapi.com/v3/events/search',
    qs: 
    { 
      'start_date.keyword' : 'this_weekend',
      'sort_by' : 'date',
      'location.address' : 'san francisco'

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
        'location.address' : 'san francisco'
    },
  headers: 
  { authorization: API_key }, 
};

  const today_options = { 
    method: 'GET',
    url: 'https://www.eventbriteapi.com/v3/events/search',
    qs: 
    {
        'start_date.keyword': 'today',
        'sort_by' : 'best',
        'location.address' : 'san francisco'
    },
  headers: 
  { authorization: API_key }, 
};

//==========================================================================================
//                    GET requests
//==========================================================================================


const getMonthEvents = () => {
  return new Promise((resolve, reject) =>{
    request(month_options, function (error, response, body) {
      if (error) {
        reject(error)
      } else {
        resolve(body);
      }
    });
  });
};


const getWeekEvents = () => {
  return new Promise((resolve,reject) =>{
    request(weekend_options, function(error, response, body){
      if (error) {
        reject(error);  
      } else {
        console.log(body);
        resolve(body);
      }
    });
  });
};

const getTodayEvents = () => {
  return new Promise((resolve,reject) =>{
    request(today_options, function(error, response, body){
      if (error) {
        reject(error);  
      } else {
        console.log(body);
        resolve(body);
      }
    });
  });
};


module.exports = {
  month: getMonthEvents,
  week: getWeekEvents,
  today: getTodayEvents,
}