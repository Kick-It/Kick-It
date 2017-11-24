import React from 'react';
import { Menu, Image, Icon, Header } from 'semantic-ui-react'

class WeekendEvent extends React.Component{
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<Menu.Item>
			{this.props.event.name.text}
			</Menu.Item>
		)
	}
}

export default WeekendEvent;
