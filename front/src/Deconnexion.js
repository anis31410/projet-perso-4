import React, { Component } from 'react';

class Deconnexion extends Component {
  render() {
    return(
      <div>
        <button onClick={this.props.disableToken}>Deconnexion</button>  
      </div>
    );
  }
}

export default Deconnexion;