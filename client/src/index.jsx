import React from 'react';
import ReactDOM from 'react-dom';
import SearchBarContainer from './components/SearchBarContainer.jsx';
import EventListContainer from './components/EventListContainer.jsx';
//import WeekendListContainer from './components/WeekendListContainer.jsx';


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
			});
	}


	runFilters(filters) {
		console.log(filters);
		fetch('/filter', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(filters),
		})
		.then((data)=> {
			console.log('clientside: ', data.body)
			let events = JSON.parse(data.body);
			console.log('FILTERED RETURN _____>', data, events);

			this.setState({
				today: events,
			})
		})
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
							weekendEvents={this.state.weekend.slice(0,20)} 
						/>
					</div>
				</div>
				
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));