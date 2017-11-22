import React from 'react';

const PriceSearch = (props) => {
	const onSelect = (e) => {
		console.log(e.target.value);
		props.onChange('price', e.target.value);
	};

	return (
		<div className="col">
			<label htmlFor="priceSelect">Price</label>
			<select className="form-control" id="priceSelect" onChange={onSelect}>
				<option value="all">All</option>
				<option value="free">Free</option>
				<option value="paid">Paid</option>
			</select>
		</div>
	);
};

export default PriceSearch;