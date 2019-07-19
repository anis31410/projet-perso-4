import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import axios from 'axios';

const options = [
  { key: 'n', text: 'Naruto', value: '1' },
  { key: 'o', text: 'One piece', value: '2' },
  { key: 'd', text: 'Dragon Ball', value: '3' },
  { key: 's', text: 'Seven deadly Signs', value: '4' },
  { key: 'h', text: 'Hunter x Hunter', value: '5' },
  { key: 'a', text: 'Attaque des Titans', value: '6' }
]

class CreatePerso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      anime_id: null,
      picture: '',
      power: null,
      power_levelup: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeTeam(event, { value }) {
    this.setState({ anime_id: value });
    console.log({ value });
  }

  onSubmit() {
    axios.post('/api/players/new', this.state)
      .then(() => console.log(this.state))
      .then(() => this.setState({ firstname: '' }))
  }

  render() {
    // const { value } = this.state
    return (
      <Form onSubmit={this.onSubmit} style={{ marginTop: "50px" }}>
        <Form.Group widths='equal'>
          <Form.Input fluid name='firstname' label='First name' placeholder='First name' onChange={this.handleChange} />
          <Form.Input fluid name='lastname' label='Last name' placeholder='Last name' onChange={this.handleChange} />
          <Form.Input fluid name='picture' label='Picture' placeholder='picture' onChange={this.handleChange} />
          <Form.Input fluid name='power' label='Power' placeholder='power' onChange={this.handleChange} />
          <Form.Input fluid name='power_levelup' label='Power_levelup' placeholder='power_levelup' onChange={this.handleChange} />
          <Form.Select fluid name='anime_id' label='Team' options={options} placeholder='Team' onChange={this.handleChangeTeam} />

        </Form.Group>
        <Form.Button onSubmit={this.onSubmit}>Submit</Form.Button>
      </Form>
    )
  }
}

export default CreatePerso;
