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
				//let events = JSON.parse(data.today);
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
				console.log(events);
				this.setState({
					weekend: events,
				});
			})
		})
	}



	runFilters(filters) {
		//console.log(filters);
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
				<img src='https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F37619820%2F38889254454%2F1%2Foriginal.jpg?h=200&amp;w=450&amp;rect=3%2C69%2C1126%2C563&amp;s=a46e83d8544ecfa1924cecba6bd9d083'/>
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

//incorrect - DB
//https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F37619820%2F38889254454%2F1%2Foriginal.jpg$2h=200&w=450&rect=3%2C69%2C1126%2C563&s=a46e83d8544ecfa1924cecba6bd9d083

//correct - API 
//https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F37619820%2F38889254454%2F1%2Foriginal.jpg?h=200&amp;w=450&amp;rect=3%2C69%2C1126%2C563&amp;s=a46e83d8544ecfa1924cecba6bd9d083
//https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F37619820%2F38889254454%2F1%2Foriginal.jpg$2h=200&amp;w=450&amp;rect=3%2C69%2C1126%2C563&amp;s=a46e83d8544ecfa1924cecba6bd9d083	
// sample from music line 67
//https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F37426751%2F24250841862%2F1%2Foriginal.jpg?h=200&w=450&s=5187ea855ebde91de60a379af7fed198
