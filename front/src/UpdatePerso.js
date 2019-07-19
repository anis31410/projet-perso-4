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

class UpdatePerso extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      anime_id: null,
      picture: '',
      power: null,
      power_levelup: null,
      perso: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTeam = this.handleChangeTeam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.persoNew = this.persoNew.bind(this);
  }

  componentDidMount() {
    this.persoNew();
  }

  persoNew() {
    const { idC } = this.props;
    axios.get(`/api/players/${this.props.idC}`)
      .then(res => res.data)
      .then(data => this.setState({ perso: data }))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeTeam(event, { value }) {
    this.setState({ anime_id: value });
    console.log({ value });
  }

  onSubmit() {
    const data = { ...this.state };
    delete data.perso;
    axios.put(`/api/players/update/${this.props.idC}`, data)
      .then(() => console.log(data))
  }

  render() {
    const { perso } = this.state;
    return (
      <Form onSubmit={this.onSubmit} style={{ marginTop: "50px" }}>
        <Form.Group widths='equal'>
          <Form.Input fluid name='firstname' label='First name' placeholder={perso.firstname} onChange={this.handleChange} />
          <Form.Input fluid name='lastname' label='Last name' placeholder={perso.lastname} onChange={this.handleChange} />
          <Form.Input fluid name='picture' label='Picture' placeholder={perso.picture} onChange={this.handleChange} />
          <Form.Input fluid name='power' label='Power' placeholder={perso.power} onChange={this.handleChange} />
          <Form.Input fluid name='power_levelup' label='Power_levelup' placeholder={perso.power_levelup} onChange={this.handleChange} />
          <Form.Select fluid name='anime_id' label='Team' options={options} placeholder={perso.team} onChange={this.handleChangeTeam} />

        </Form.Group>
        <p>Remplir tous les champs obligatoirement</p>
        <Form.Button onSubmit={this.onSubmit}>Submit</Form.Button>
      </Form>
    )
  }
}

export default UpdatePerso;
