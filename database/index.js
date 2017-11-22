// pg allows node to use postgres
const pg = require('pg');
const config = require('../knexfile.js');  
const dev = 'development';
const prod = 'production';
let knex = require('knex')(config[dev]);

knex.raw('DROP DATABASE IF EXISTS kickit;').then( () => {
  knex.raw('CREATE DATABASE kickit;').then( () => {
    knex.destroy();
    config[dev]['connection']['database'] = 'kickit';
    knex = require('knex')(config[dev]);
    module.exports = knex;
  })
  .then( () => {
    knex.raw(`DROP TABLE IF EXISTS events;`).then( (res) => {
      knex.schema.createTable('events', (table) => {
        table.string('id').primary();
        table.string('name');
        table.text('description', 'longtext');
        table.foreign('venue_id');
        table.string('price');
        table.string('url');
        table.string('image_url');
        table.dateTime('start_datetime');
        table.dateTime('end_datetime');
        table.foreign('category_id');
      })
      .then( (res) => {
        console.log('CREATE TABLE res: ', res);
      }).catch( ( err) => {
        console.log('Error occurred when creating events table: ', err);
      })
    }).then( () => {
      knex.raw(`DROP TABLE IF EXISTS venues;`).then( (res) => {
        knex.schema.createTable('venues', (table) => {
          table.string('id').primary();
          table.text('address', 'longtext');
        })
        .then( (res) => {
          console.log('CREATE TABLE res: ', res);
        }).catch( ( err) => {
          console.log('Error occurred when creating venues table: ', err);
        })
      })
    }).then( () => {
      knex.raw(`DROP TABLE IF EXISTS categories;`).then( (res) => {
        knex.schema.createTable('categories', (table) => {
          table.string('id').primary();
          table.string('shortname');
          table.string('name');
        })
        .then( (res) => {
          console.log('CREATE TABLE res: ', res);
        }).catch( ( err) => {
          console.log('Error occurred when creating categories table: ', err);
        })
      })
    })
  })
})


const bookshelf = require('bookshelf')(knex);
const _ = require('lodash');
const Promise = require('bluebird');
const moment = require('moment');

const categoryList = require('../category_map.json');



//==========================================================================================
//                    Events Table
//==========================================================================================

class Event extends bookshelf.Model {
  get tableName() {
    return 'events';
  }
}

const Events = bookshelf.Collection.extend({
  model: Event
})


module.exports = {
  // add events to table
  // eventsList should be an array of event objects
  // an event object should look like the following:
    // {name: '', description: '', venue_id: '', price: '', url: '', image_url: '', start_datetime: '', end_datetime: '', category_id: '' }
  addEvents: (eventsList) => {
    // {merge: true} updates existing models
    Events.add(eventsList, [{merge: true}]);
  },

  // search for events in table
  // categories will always be a list of category
  searchAllEvents: (date, categories, price) => {
    Promise.resolve(Events.query( (qb) => {
      qb.where('start_datetime', '=', date).andWhere('category_id', 'in', categories).andWhere('price', '=', price)
    }).fetchAll({
      withRelated: [{
        'venues': (qb) => {
          qb.select('venues.id');
          qb.columns('venues.name');
        }
      },
      {
        'categories': (qb) => {
          qb.select('categories.id', 'categories.shortname');
          qb.columns('categories.name');
        }
      }]
    }));
  }
}


//==========================================================================================
//                    Categories Table
//==========================================================================================

class Category extends bookshelf.Model {
  get tableName() {
    return 'categories'
  }
}

const Categories = bookshelf.Collection.extend({
  model: Category
})

// add categories to table
const addCategories = (categoryList) => {
  Categories.add(categoryList.categories);
}

addCategories(categoryList);


//==========================================================================================
//                    Venues Table
//==========================================================================================

class Venue extends bookshelf.Model {
  get tableName() {
    return 'venues'
  }
}

const Venues = bookshelf.Collection.extend({
  model: Venue
})

// add categories to table
const addVenue = (venue) => {
  Venues.add(venue, [{merge: true}]);
}

