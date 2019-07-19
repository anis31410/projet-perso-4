import React from 'react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import axios from 'axios';

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullname: ''
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post('/api/auth/signup', this.state)
      .then(res => res.data)
      .then(this.setState({ password: '' }))
      .then(this.setState({ email: '' }))
      .then(this.setState({ fullname: '' }))
      .then(() => console.log(this.state))
      .then(() => console.log("connection good"))
  }

  render() {
    return (
      <div className="Login" style={{ marginTop: "50px" }} >
        <h1> Inscris-toi si ce n'est pas déjà fait </h1>
        <p> Les champs marqués d'un astérique sont obligatoires</p>
        <form onSubmit={this.handleSubmit} style={{ width: "100px", marginLeft: "42%" }}>
          <FormGroup controlId="email" bsSize="large" style={{ marginBottom: "10px" }}>
            <label>Email *</label>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large" style={{ marginBottom: "10px" }}>
            <label>Password *</label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="fullname" bsSize="large" style={{ marginBottom: "10px" }}>
            <label>Fullname</label>
            <FormControl
              value={this.state.fullname}
              onChange={this.handleChange}
              type="fullname"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            style={{ color: "white", backgroundColor: "blue" }}
          >
            Signup
        </Button>
        </form>
      </div>
    );
  }
}

export default NewUserForm;