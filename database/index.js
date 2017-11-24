// pg allows node to use postgres
const pg = require('pg');
const config = require('../knexfile.js');  
const dev = 'development';
const prod = 'production';
const knex = require('knex')(config[dev]);
const bookshelf = require('bookshelf')(knex);
const _ = require('lodash');
const Promise = require('bluebird');
const categoryList = require('../category_map.json');


knex.raw('DROP DATABASE IF EXISTS kickit;').then( () => {
  knex.raw('CREATE DATABASE kickit;').then( () => {
    knex.destroy();
    config[dev]['connection']['database'] = 'kickit';
    knex = require('knex')(config[dev]);
    module.exports = knex;
  }).then( () => {
    knex.raw(`DROP TABLE IF EXISTS venues;`).then( () => {
      knex.schema.createTable('venues', (table) => {
        table.string('id').primary();
        table.text('address', 'longtext');
        table.string('name');
      }).then( () => {
        knex.raw(`DROP TABLE IF EXISTS categories;`).then( () => {
          knex.schema.createTable('categories', (table) => {
            table.string('id').primary();
            table.string('shortname');
            table.string('name');
          }).then( () => {
            console.log('Inserting values to categories table..');
            Promise.resolve(addCategories(categoryList)).then( () => {
              knex.raw(`DROP TABLE IF EXISTS events;`).then( () => {
                console.log('Creating events table..');
                knex.schema.createTable('events', (table) => {
                  table.string('id').primary();
                  table.string('name');
                  table.text('description', 'longtext');
                  table.string('venue_id');
                  table.foreign('venue_id').references('venues.id');
                  table.string('price');
                  table.string('url');
                  table.string('image_url');
                  table.dateTime('start_datetime');
                  table.dateTime('end_datetime');
                  table.string('category_id');
                  table.foreign('category_id').references('categories.id');
                }).catch((err) => { console.log(err) });
              })
            })
          })
        })
      })
    })
  })
});

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
    Events.forge().add(eventsList, [{merge: true}]);
    // Events.add(eventsList, [{merge: true}]);
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
    }).catch( (err) => {
      console.log('Error search events: ', err);
    }));
  }
}

//==========================================================================================
//                    Categories Table
//==========================================================================================

let Category = bookshelf.Model.extend({
  tableName: 'categories'
})


// add categories to table
const addCategories = (categoryList) => {
  categoryList.categories.map( (category) => {
    knex.raw(`INSERT INTO categories (id, shortname, name) VALUES (${category.id}, '${category.shortname}', '${category.name}')`).catch( (err) => {
      console.log('Error occurred adding categories: ', err);
    });
  });
}


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
  Venues.forge().add(venue, [{merge: true}]);
}

