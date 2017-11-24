import React from 'react';
import EventEntry from './EventEntry.jsx';
import events from '../../../music-events.json';
import WeekendListContainer from './WeekendListContainer.jsx';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import WeekendEvent from './WeekendEvent.jsx';

class EventListContainer extends React.Component {
	constructor(props) {
		super(props);
	    this.state = { 
	      visible: false 
    	}
    	this.toggleVisibility = this.toggleVisibility.bind(this);
	}
 
	toggleVisibility() {
	   this.setState({ visible: !this.state.visible });
	}

	render() {
	    const { visible } = this.state

		let todayRows = [];
		this.props.todayEvents.forEach((event, index) => {
			todayRows.push(<EventEntry event={event} key={index} />);
		});

		let weekendRows = [];
		this.props.weekendEvents.forEach((event,index) => {
			weekendRows.push(<WeekendEvent event={event} key={index} />)
		})

		return (
		      <div>
		        <Button onClick={this.toggleVisibility}>Weekend Events</Button>
		        <Sidebar.Pushable as={Segment}>
		          <Sidebar
		            as={Menu} 					//as -> Sidebar controls logic of sliding out and in.  as refers to WHAT element is sliding in and out
		            animation='overlay'
		            width='wide'
		            direction='right'
		            visible={visible}
		            icon='labeled'
		            vertical
		            inverted
		          >
		          {weekendRows}
		          {
		            // <Menu.Item name='home'>
		            //   <Icon name='home' />
		            //   Home
		            // </Menu.Item>
		            // <Menu.Item name='gamepad'>
		            //   <Icon name='gamepad' />
		            //   Games
		            // </Menu.Item>
		            // <Menu.Item name='camera'>
		            //   <Icon name='camera' />
		            //   Channels
		            // </Menu.Item>
		  	      }
		          </Sidebar>
		          <Sidebar.Pusher>
		              <Segment basic className="row">
		              	{todayRows}
		              </Segment>  
		          </Sidebar.Pusher>
		        </Sidebar.Pushable>
		      </div>		
		      )
	}
}

export default EventListContainer;