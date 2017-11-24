import React from 'react';
import { Menu, Image, Icon, Header } from 'semantic-ui-react'
import moment from 'moment';

class WeekendEvent extends React.Component{
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<Menu.Item>
			{this.props.event.name.text}<div>{moment(this.props.event.start.local).calendar()}</div>
			</Menu.Item>
		)
	}
}

export default WeekendEvent;
