import React from 'react';
import ReactDOM from 'react-dom';
import SearchBarContainer from './components/SearchBarContainer.jsx';
import EventListContainer from './components/EventListContainer.jsx';
import WeekendListContainer from './components/WeekendListContainer.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Kick It</h1>
				<SearchBarContainer />
				<div className="album text-muted">
					<EventListContainer />
				</div>
				<WeekendListContainer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));