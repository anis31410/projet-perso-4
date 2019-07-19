import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import CreatePerso from './createNewPerso';
import Matchhh from './matchhh';
import Classement from './classement';
import DeletePerso from './deletePerso';
import Update from './ComposantUniqueUpdate';

export default class MenuExampleTabularOnLeft extends Component {
  state = { activeItem: 'Match' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;


    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item style={{ color: 'black' }} name='Match' active={activeItem === 'Match'} onClick={this.handleItemClick} />
            <Menu.Item style={{ color: 'black' }} name='Classement' active={activeItem === 'Classement'} onClick={this.handleItemClick} />
            <Menu.Item style={{ color: 'black' }} name='Create perso' active={activeItem === 'Create perso'} onClick={this.handleItemClick} />
            <Menu.Item style={{ color: 'black' }} name='Delete perso' active={activeItem === 'Delete perso'} onClick={this.handleItemClick} />
            <Menu.Item style={{ color: 'black' }} name='Update perso' active={activeItem === 'Update perso'} onClick={this.handleItemClick} />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment style={{ backgroundColor: 'lightblue' }}>
            {activeItem === 'Match' &&
              <Matchhh />
            }
            {activeItem === 'Classement' &&
              <Classement />
            }
            {activeItem === 'Create perso' &&
              <CreatePerso />
            }
            {activeItem === 'Delete perso' &&
              <DeletePerso />
            }
            {activeItem === 'Update perso' &&
              <Update />
            }
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}