import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DateSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment(),
		}
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(date) {
		this.setState({
			date: date
		});
		this.props.onChange('date', moment(date).format());
	}

	render() {
		return (
			<div className="col">
				<DatePicker selected={this.state.date} onChange={this.handleChange} placeholderText="Enter a Date"/>

			</div>
		);
	}
}

export default DateSearch;