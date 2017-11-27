import React from 'react';
import ReactDOM from 'react-dom';
import SearchBarContainer from './components/SearchBarContainer.jsx';
import EventListContainer from './components/EventListContainer.jsx';
//import WeekendListContainer from './components/WeekendListContainer.jsx';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			featured: [],
			weekend: [],
		}
	}
	componentDidMount() {
		fetch('/initialLoad')
			.then((response) =>{
				return response.json();
			})
			.then((data) =>{
				this.setState({
					featured: data.today,
				});
			})
		.then(()=>{
			fetch('/weekend')
			.then((response) =>{
				return response.json();
			})
			.then((data) =>{
				let events = JSON.parse(data).events;
				this.setState({
					weekend: events,
				});
			})
		})
	}

	runFilters(filters) {
		fetch('/filter', {
			headers: {
				//'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(filters),
		})
		.then((response)=> {

			return response.json();
		})
		.then((events)=> {
			this.setState({
				featured: events.rows
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
							featuredEvents={this.state.featured}
							weekendEvents={this.state.weekend.slice(0,10)} 
						/>
					</div>
				</div>
				
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
