import React from 'react';
import EventEntry from './EventEntry.jsx';

class EventListContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<EventEntry />
				<EventEntry />
				<EventEntry />
				<EventEntry />
				<EventEntry />
			</div>
		)
	}
}

export default EventListContainer;