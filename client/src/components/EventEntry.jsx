import React from 'react';
import categories from '../../../categories.json';
import moment from 'moment';

const EventEntry = (props) => {
	// API data
	let imageURL = props.event.logo ? props.event.logo.url : 'https://cdn.evbstatic.com/s3-build/perm_001/f8c5fa/django/images/discovery/default_logos/4.png';
	// DB data - Postgres URL formatting replaces '?' with '$*'.
	// need to undo the change
	let dbURL = props.event.image_url;
	if (dbURL) {
		imageURL = dbURL.replace(/\$.{1}/i, '?');
	}

	

	return (
		<div className="card">
			<a href={props.event.url}>		
				<img src={imageURL}/>
				<div className="card-body">
					<time className="eventTime">{moment(props.event.start_datetime).format("MMM Do YY")}</time>
					<div className="card-title">{props.event.name}</div>
					<div className="eventLocation"></div>
					<div className="event">{props.event.price === 'free' ? 'Free' : '$'}</div>
					<div className="eventCategory">{props.event.category_name}</div>
				</div>
			</a>
		</div>
	)
};

export default EventEntry;
