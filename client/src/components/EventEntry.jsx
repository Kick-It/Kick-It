import React from 'react';
import categories from '../../../categories.json';

const EventEntry = (props) => {
	let imageUrl = props.event.logo ? props.event.logo.url : 'https://cdn.evbstatic.com/s3-build/perm_001/f8c5fa/django/images/discovery/default_logos/4.png';
	let getCategory = (id) => {
		for (let category of categories.categories) {
			if (category.id === id) {
				return category.name;
			}
		}
	};


	return (
		<div className="card">
			<a href={props.event.url}>
				<img src={imageUrl}/>
				<div className="card-body">
					<time className="eventTime">{props.event.start_datetime}</time>
					<div className="card-itle">{props.event.name.text}</div>
					<div className="eventLocation"></div>
					<div className="event">{props.event.is_free ? 'Free' : 'FEE'}</div>
					<div className="eventCategory">{getCategory(props.event.category_id)}</div>
				</div>
			</a>
		</div>
	)
};

export default EventEntry;
