import React from 'react';

const CategorySearch = (props) => {
	return (
		<div className="col-6">
			<div className="row">
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="music" /> Music
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="food" /> Food/Drinks
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="community" /> Community Events
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox7" value="dating" /> Dating
					</label>
				</div>
			</div>
			<div className="row">
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="entertainment" /> Entertainment
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox5" value="science" /> Science/Tech
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox6" value="autoBoatAir" /> Auto-Boat-Air
					</label>
				</div>
				<div className="form-check form-check-inline">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox" id="inlineCheckbox8" value="active" /> Active
					</label>
				</div>
			</div>
		</div>
	);
};

export default CategorySearch;