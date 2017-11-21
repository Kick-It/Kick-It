// pg allows node to use postgres
let pg = require('pg')
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost:5432/events'
})
const bookshelf = require('bookshelf')(knex)
const _ = require('lodash')
const Promise = require('bluebird')

// connect to local database
// let connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/events';
// let client = new pg.Client(connectionString);
// client.connect();

//==========================================================================================
//                    Events Table
//==========================================================================================

// knex.schema.dropTableIfExists('events')
knex.schema.createTableIfNotExists('events', (table) => {
  table.string('id')
  table.string('name')
  table.text('description', longtext)
  table.string('venue_id')
  table.string('url')
  table.string('image_url')
  table.dateTime('start_datetime')
  table.dateTime('end_datetime')
  table.string('is_free')
  table.string('category_id')
})

class Event extends bookshelf.Model {
  get tableName() {
    return 'events'
  }

  getVenue(venue_id) {

  }
<<<<<<< HEAD

  getCategory(category_id) {

  }
}

  const Events = bookshelf.Collection.extend({
    model: Event
  })

  // add events to table
  const addEvents = (eventsList) => {
    eventsList.forEach( (event) => {
      Events.add(event)
    })
  }

  // search for events in table
  const searchAllEvents = () => {
    Events.fetch()
  }


//create event table
// let eventTable = client.query( `CREATE TABLE events(${Event Schema})`, (err, res) => {
//   if (err) {
//     return err;
//   } else {
//     return () => client.end();
//   }
// });

// add to event table
// let addToEvents = client.query (
//   `INSERT INTO events(id, name, description, venue_id, url, logo_url, start, end, is_free, category_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [id, name, description, venue_id, url, logo_url, start, end, is_free, category_id], (err, res) => {
//   if (err) {
//     return err;
//   } else {
//   	return () => client.end();
//   }
// });
=======
}); 
>>>>>>> d2dddaafb0e6d0068f58b7feee6e7e9ae11d4ab1

// search event table 
// let searchEvents = client.query((/* add query */));


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
//                    Venues Table
//==========================================================================================

// create join events and categories table
let venues_Table = client.query((/* add query */));

// add to categories_events table 
let addToVenues_Events = client.query (/* add query */ (err, res) => {
  if (err) {
    return err;
  } else {
    return () => client.end();
  }
});

//search categories_events table
let searchVenues_Events = client.query((/* add query */));


//==========================================================================================
//                    Exports
//========================================================================================== 

module.exports.addEvents = addEvents;
module.exports.searchAllEvents = searchAllEvents;
module.exports.addToCategories = addToCategories;
module.exports.searchCategories = searchCategories;
module.exports.addToCategories_Events = addToCategories_Events;
module.exports.searchCategories_Events = searchCategories_Events;










