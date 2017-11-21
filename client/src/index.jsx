import React from 'react';
import ReactDOM from 'react-dom';
import SearchBarContainer from './components/SearchBarContainer.jsx';
import EventListContainer from './components/EventListContainer.jsx';
import WeekendListContainer from './components/WeekendListContainer.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			today: [],
			week: [],
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
					week: events,
				});
				console.log(this.state.week.length);
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
				console.log(this.state.today.length);
			});
	}

	render() {
		return (
			<div>
				<h1>Kick It</h1>
				<SearchBarContainer />
				<EventListContainer />
				<WeekendListContainer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

// using fetch in the post request. data field (in ajax) is the body