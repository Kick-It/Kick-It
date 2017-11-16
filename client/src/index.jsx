import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Componenets {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<SearchContainer />
				<EventListContainer />
				<WeekendListContainer />
			</div>
		)
	}
}