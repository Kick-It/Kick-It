import React from 'react';
import DateSearch from './DateSearch.jsx';
import CategorySearch from './CategorySearch.jsx';
import PriceSearch from './PriceSearch.jsx';
import moment from 'moment';

class SearchBarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment().format(),
			category: [],
			price: 'all'
		};
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onChange(option, value) {
		let newCriteria = {};
		newCriteria[option] = value;
		this.setState(newCriteria);
	}

	onClick(e) {
		this.props.runFilters(this.state);
		e.preventDefault();
	}

	render() {
		return (
			<form className="container">
				<div className="row">
					<DateSearch onChange={this.onChange}/>
					<CategorySearch onChange={this.onChange}/>
					<PriceSearch onChange={this.onChange}/>
					<button type="button" onClick={this.onClick}>Search</button>
				</div>
			</form>
		)
	}
}

export default SearchBarContainer;