import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
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
    axios('/api/auth/signin', {
      method: 'POST',
      headers: {
        'CONTENT-Type': 'application/json'
      },
      data: JSON.stringify(this.state)
    })
      .then(res => res.data)
      .then(token => {
        // localStorage n'est pas la façon recommandée pour stocker des token attention
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { setToken } = this.props;
        setToken(token);
      })
  }

  render() {
    return (
      <div className="Login">
        <h1> Déjà inscrit ? Connectez-vous</h1>
        <form onSubmit={this.handleSubmit} style={{ width: "100px", marginLeft: "42%" }}>
          <FormGroup controlId="email" bsSize="large" style={{ marginBottom: "10px" }}>
            <label>Email</label>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large" style={{ marginBottom: "10px" }}>
            <label>Password</label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            style={{ color: "white", backgroundColor: "blue" }}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
