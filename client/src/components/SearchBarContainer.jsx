import React from 'react';
import DateSearch from './DateSearch.jsx';
import CategorySearch from './CategorySearch.jsx';
import PriceSearch from './PriceSearch.jsx';

class SearchBarContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<form className="container">
				<DateSearch />
				<CategorySearch />
				<PriceSearch />
			</form>
		)
	}
}

export default SearchBarContainer;