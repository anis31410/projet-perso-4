import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import axios from 'axios';

class CardUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persos: [],

    }
    this.persoNew = this.persoNew.bind(this);

  }

  componentDidMount() {
    this.persoNew();
  }

  persoNew() {
    axios.get('/api/players')
      .then(res => res.data)
      .then(data => this.setState({ persos: data }))
  }

  render() {
    const { persos } = this.state;
    const { visibilityC, goodId } = this.props;
    return (

      persos.map(perso => (

        <Card style={{ marginBottom: "40px" }}>
          <Image src={perso.picture} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{perso.firstname}</Card.Header>
            <Card.Meta>
              <span className='date'>{perso.power}</span>
            </Card.Meta>
            {/* toujours faire une fonction si on veut passer un parametre a une fonction dans le render */}
            <button onClick={function (event) { visibilityC(); goodId(perso.id) }}>
              Update this character
              </button>
          </Card.Content>
        </Card>

      ))


    );

  }
}

export default CardUpdate;

