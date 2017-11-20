import React from 'react';

const PriceSearch = (props) => {
	return (
		<div className="col">
			<label htmlFor="priceSelect">Price</label>
			<select className="form-control" id="priceSelect">
				<option>All</option>
				<option>Free</option>
				<option>Paid</option>
			</select>
		</div>
	);
};

export default PriceSearch;