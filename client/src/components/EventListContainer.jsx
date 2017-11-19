import React from 'react';
import EventEntry from './EventEntry.jsx';
import events from '../../../music-events.json';

class EventListContainer extends React.Component {
	constructor(props) {
		super(props);
	}
 
	render() {
		let rows = [];
		events.events.forEach((event, index) => {
			rows.push(<EventEntry event={event} key={index} />);
		});
		return (
			<div>
				{rows}
			</div>
		)
	}
}

export default EventListContainer;