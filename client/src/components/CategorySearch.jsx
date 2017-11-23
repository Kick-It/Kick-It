import React from 'react';

class CategorySearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: [],
		}
		this.onCheck = this.onCheck.bind(this);
	}

	onCheck(e) {
		let category = this.state.category;
		if (category.includes(e.target.value)) {
			category.splice(category.indexOf(e.target.value), 1);
		} else {
			category.push(e.target.value);
		}
		this.setState({category: category});
		this.props.onChange('category', category);
	}

	render() {
		return (
			<div className="col-6">
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="music" onChange={this.onCheck}/> Music
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="food" onChange={this.onCheck}/> Food/Drinks
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="community" onChange={this.onCheck}/> Community Events
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox7" value="dating" onChange={this.onCheck}/> Dating
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="entertainment" onChange={this.onCheck}/> Entertainment
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="science" onChange={this.onCheck}/> Science/Tech
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox6" value="autoBoatAir" onChange={this.onCheck}/> Auto-Boat-Air
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox8" value="active" onChange={this.onCheck}/> Active
					</label>
				</div>
			</div>
		);
	}
};

export default CategorySearch;