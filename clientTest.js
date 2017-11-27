import Enzyme from 'enzyme';
import 'jsdom-global/register';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import { events } from './music-events.json';

import  EventListContainer from './client/src/components/EventListContainer';

// ======================================================================
//                   Client Tests
// ======================================================================

// let expect = require('chai').expect;
//let React = require('react');
let ReactTestUtils = require('react-dom/test-utils');

// describe('App', function() {
//   var {
//     Simulate,
//     renderIntoDocument,
//     findRenderedDOMComponentWithClass,
//     scryRenderedDOMComponentsWithClass
//   } = ReactTestUtils;

//   var app;

//   beforeEach(function() {
//     app = renderIntoDocument(
//       <App />
//     );
//   });

//   it('should be a stateful class component', function() {
//     expect(React.Component.isPrototypeOf(App)).to.be.true;
//   });

// });

// import jsdom from 'jsdom';

// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.document = doc;
// global.window = doc.defaultView;

describe('<EventListContainer />', () => {

  let props = events ;

  it('contains an <EventEntry/> component', () => {
    const wrapper = mount(<EventListContainer todayEvents={props} weekendEvents={props}/>);
    expect(wrapper.find(EventEntry)).to.have.length(1);
  });

});







