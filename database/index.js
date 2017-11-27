// pg allows node to use postgres
const pg = require('pg');
const config = require('../knexfile.js');  
const dev = 'development';
const prod = 'production';
let knex = require('knex')(config[dev]);
const bookshelf = require('bookshelf')(knex);
const _ = require('lodash');
const Promise = require('bluebird');
const categoryList = require('../category_map.json');
const moment = require('moment');


knex.raw('DROP DATABASE IF EXISTS kickit;').then( () => {
  knex.raw('CREATE DATABASE kickit;').then( () => {
    knex.destroy();
    config[dev]['connection']['database'] = 'kickit';
    knex = require('knex')(config[dev]);
    module.exports = knex;
  }).then( () => {
    // knex.raw(`DROP TABLE IF EXISTS venues;`).then( () => {
      knex.schema.createTable('venues', (table) => {
        table.string('id').primary();
        table.text('address', 'longtext');
        table.string('name');
      }).then( () => {
        // knex.raw(`DROP TABLE IF EXISTS categories;`).then( () => {
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
                  // table.foreign('venue_id').references('venues.id');
                  table.string('price');
                  table.varchar('url');
                  table.varchar('image_url');
                  table.dateTime('start_datetime');
                  table.dateTime('end_datetime');
                  table.string('day');
                  table.string('category_id');
                  table.foreign('category_id').references('categories.id');
                }).catch((err) => { console.log(err) });
              })
            // })
          // })
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
    return new Promise( (resolve, reject) => {
      eventsList.forEach( (event) => {
        Promise.resolve(knex.raw(`INSERT INTO events (id, name, description, venue_id, price, url, image_url, start_datetime, end_datetime, category_id) VALUES ('${event.id}', ${event.name}, ${event.description}, '${event.venue_id}', '${event.price}', '${event.url}', '${event.image_url}', '${event.start_datetime}', '${event.end_datetime}', '${event.category_id}')`)).then( (results) => {
          resolve(results);
        }).catch( (err) => {
          console.log('Error occurred adding events: ', err);
          reject(err);
        });
      })
    });
  },

  getTodaysEvents: () => {
    const todayStart = moment().startOf('day').format();
    const todayEnd = moment().endOf('day').format();
    return new Promise( (resolve, reject) => {
      Promise.resolve(knex.raw(`SELECT * from events e WHERE e.start_datetime BETWEEN '${todayStart}' AND '${todayEnd}'`)).then( (results) => {
        resolve(results);
      }).catch( (err) => {
        console.log('Error occurred adding events: ', err);
        reject(err);
      });
    })
  },

  getWeekendEvents: () => {
    console.log('day of week testing: ', moment().day(3))
    // Promise.resolve( () => {
    //   knex.raw(`SELECT * from events e WHERE e.start_datetime BETWEEN '${todayStart}' AND '${todayEnd}'`).catch( (err) => {
    //     console.log('Error occurred adding events: ', err);
    //   });
    // })
  },

  // search for events in table
  // categories will always be a list of category
  searchAllEvents: (date, categories, price) => {
    const dayStart = moment(date).startOf('day').format();
    const dayEnd = moment(date).endOf('day').format();
    const priceVal = price !== 'all' ? `('${price}')` : `('paid', 'free')` ;
    let query;
    if ( categories.length > 0 ) {   
      let categoryList = categories.join('\',\'')
      categoryList = "'" + categoryList + "'"
      query = `SELECT e.*, c.name AS category_name FROM events AS e JOIN categories AS c ON e.category_id = c.id WHERE e.price IN ${priceVal} AND e.start_datetime BETWEEN '${dayStart}' AND '${dayEnd}' AND c.shortname IN (${categoryList})`;
    } else {
      query = `SELECT e.*, c.name AS category_name FROM events AS e JOIN categories AS c ON e.category_id = c.id WHERE e.price IN ${priceVal} AND e.start_datetime BETWEEN '${dayStart}' AND '${dayEnd}'`;
    }
    return new Promise( (resolve, reject) => {
      resolve(knex.raw(query).catch( (err) => {
          console.log('Error occurred finding events: ', err);
        })
      )
    }).catch((err) => {
      throw err;
    });
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

