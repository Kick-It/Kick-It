import React from 'react';
import ReactDOM from 'react-dom';
import SearchBarContainer from './components/SearchBarContainer.jsx';
import EventListContainer from './components/EventListContainer.jsx';
import WeekendListContainer from './components/WeekendListContainer.jsx';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			today: [],
			weekend: [],
		}
	}
	componentDidMount() {
		fetch('/loadWeekend')
			.then((response) =>{
				return response.json();
			})
			.then((data) =>{
				let events = JSON.parse(data).events;
				this.setState({
					weekend: events,
				});
				console.log('WEEKEND EVENTS', this.state.weekend)
			});
		fetch('/loadToday')
			.then((response) =>{
				return response.json()
			})
			.then((data) =>{
				let events = JSON.parse(data).events;
				this.setState({
					today: events,
				});
				console.log('TODAYS events', this.state.today);
			});
		fetch('/loadVenues')
			.then()
	}

	//create a function that is passed down to search Container
	// makes a post request to the server with the data
	runFilters(filters) {
		console.log(filters);
		fetch('/filter', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(filters),
		});
	}

	render() {
		return (
			<div>
				<h1>Kick It</h1>
				<SearchBarContainer runFilters={this.runFilters.bind(this)}/>
				<div className="album text-muted">
					<div className="container">
						<EventListContainer 
							todayEvents={this.state.today}
							weekendEvents={this.state.weekend} 
						/>
					</div>
				</div>
				
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

// using fetch in the post request. data field (in ajax) is the body