//jshint esversion:6
let request = require('supertest');
let server = require('./server/index.js');
let Promise = require('bluebird');
Promise.promisifyAll(server);

// ======================================================================
//                   Server Tests
// ======================================================================

describe('Server Handles Requests', function () {

  // increases time allowed for tests to run 
  this.timeout(15000);
  
  // checks for homepage to have 'Kick It' as title
  it('loads Homepage', (done) => {
    request(server)
    .get('/')
    .expect(200)
    .expect(/Kick It/, done);
  });

// checks if /loadToday will return data 
  it('gets todays events', (done) => {
    setTimeout(done, 15000);
    request(server)
    .get('/loadToday')
    .expect('Content-Type', /json/, done);
  });

// checks if /loadToday will return data 
  it('gets this weekends events', (done) => {
    setTimeout(done, 15000);
    request(server)
    .get('/initialLoad')
    .expect('Content-Type', /json/, done);
  });
  
  // checks if /loadToday will return data 
  it('gets venue information', (done) => {
    setTimeout(done, 15000);
    request(server)
    .get('/loadVenues')
    .expect('Content-Type', /json/, done);
  });

  // it('searches DB for events', (done) => {
  //   setTimeout(done, 15000);
  //   request(server)
  //   .post('/loadVenues')
  //   .expect('Content-Type', /json/, done);
  // });

// checks all other requests
  it('404 all other requests', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
  
});















