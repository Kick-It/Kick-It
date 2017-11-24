import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class WeekendListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false 
    }
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state
    return (
      <div>
        <Button 
          onClick={this.toggleVisibility}>Weekend Events
        </Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            width='thin'
            direction='right'
            visible={visible}
            icon='labeled'
            vertical
            inverted
          >
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
              <div basic  className="row">
              {rows}
              </div>  
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default WeekendListContainer