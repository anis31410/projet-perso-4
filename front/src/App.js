import React from 'react';
import axios from 'axios'
import './App.css';
import Login from './formRecognize';
import MenuExampleTabularOnLeft from './Navbar';
import NewUserForm from './newUserForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token') || '';
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    this.state = {
      token
      // ou token: token
    }
    this.setToken = this.setToken.bind(this);
    this.disableToken = this.disableToken.bind(this);
  }

  setToken(token) {
    this.setState({ token })
  }

  disableToken() {
    this.setState({ token: '' })
    localStorage.setItem('token', '');
  }

  render() {
    const { token } = this.state;
    return (
      <div className="App">
        {
          token
            ?
            <div>
              <MenuExampleTabularOnLeft disableToken={this.disableToken}/>
              {/* <Switch>
                <Route exact path="/match" component={Matchhh} />
                <Route path="/classement" component={Classement} />
              </Switch> */}
            </div>
            :
            <div>
              <Login setToken={this.setToken} />
              <NewUserForm />
              {/* <CarouselP /> */}
            </div>
        }


      </div>
    );
  }
}

export default App;
