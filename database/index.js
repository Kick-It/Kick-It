// pg allows node to use postgres
let pg = require('pg');

// connect to local database
let connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/events';
let client = new pg.Client(connectionString);
client.connect();

//==========================================================================================
//                    Events Table
//==========================================================================================

//create event table
let eventTable = client.query( `CREATE TABLE events(${Event Shema})`, (err, res) => {
  if (err) {
    return err;
  } else {
    return () => client.end();
  }
});

// add to event table
let addToEvents = client.query (/* add query */ (err, res) => {
  if (err) {
    return err;
  } else {
  	return () => client.end();
  }
});

// search event table 
let searchEvents = client.query((/* add query */));


//==========================================================================================
//                    Categories Table
//==========================================================================================

//create categories table
let categoriesTable = client.query((/* add query */));

// add to categories table 
let addToCategories = client.query (/* add query */ (err, res) => {
  if (err) {
    return err;
  } else {
  	return () => client.end();
  }
});

//search categories table
let searchCategories = client.query((/* add query */));


//==========================================================================================
//                    Categories_Events Table
//==========================================================================================

// create join events and categories table
let categories_Events_Table = client.query((/* add query */));

// add to categories_events table 
let addToCategories_Events = client.query (/* add query */ (err, res) => {
  if (err) {
    return err;
  } else {
    return () => client.end();
  }
});

//search categories_events table
let searchCategories_Events = client.query((/* add query */));


//==========================================================================================
//                    Exports
//========================================================================================== 

module.exports.addToEvents = addToEvents;
module.exports.searchEvents = searchEvents;
module.exports.addToCategories = addToCategories;
module.exports.searchCategories = searchCategories;
module.exports.addToCategories_Events = addToCategories_Events;
module.exports.searchCategories_Events = searchCategories_Events;










