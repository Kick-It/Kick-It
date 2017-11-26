import React from 'react';
import categories from '../../../categories.json';
import moment from 'moment';

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
				<img src={props.event.image_url||imageUrl}/>
				<div className="card-body">
					<time className="eventTime">{moment(props.event.start_datetime).format("MMM Do YY")}</time>
					<div className="card-title">{props.event.name.text||props.event.name}</div>
					<div className="eventLocation"></div>
					<div className="event">{props.event.is_free ? 'Free' : '$'}</div>
					<div className="eventCategory">{getCategory(props.event.category_id)}</div>
				</div>
			</a>
		</div>
	)
};

export default EventEntry;

//https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F37366948%2F218111667493%2F1%2Foriginal.jpg$8h=200&w=450&rect=0%2C18%2C800%2C400&s=f2b505ed5825534f2694106e7ed37b2e
//https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F36156815%2F181755422853%2F1%2Foriginal.jpg?h=200&amp;w=450&amp;rect=0%2C0%2C2160%2C1080&amp;s=de7dedd432b49bc9ca1b09b4f47349c7