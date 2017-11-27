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

describe('<EventListContainer />', () => {

  let props = events ;

  it('contains an <EventEntry/> component', () => {
    const wrapper = mount(<EventListContainer todayEvents={props} weekendEvents={props}/>);
    expect(wrapper.find(EventEntry)).to.have.length(1);
  });

});







