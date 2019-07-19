import React from 'react';
import CardUpdate from './CardForUpdate';
import UpdatePerso from './UpdatePerso';

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      cardId: 0
    }
    this.visibilityC = this.visibilityC.bind(this);
    this.goodId = this.goodId.bind(this);
  }

  visibilityC() {
    this.setState({ visibility: !this.state.visibility })
  }

  goodId(id) {
    this.setState({ cardId: id })
  }

  render() {
    const { visibility } = this.state;
    if (visibility === true) {
      return (
        <CardUpdate visibilityC={this.visibilityC} goodId={this.goodId} />
      );
    } else {
      return (
        <UpdatePerso idC={this.state.cardId} />
      );
    }
  }
}

export default Update;