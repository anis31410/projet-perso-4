import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import axios from 'axios';
// import { Button } from 'react-bootstrap';

class DeletePerso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persos: []
    }
    this.persoNew = this.persoNew.bind(this);
    this.deleteCharacter = this.deleteCharacter.bind(this);
  }

  componentDidMount() {
    this.persoNew();
  }

  persoNew() {
    axios.get('/api/players')
      .then(res => res.data)
      .then(data => this.setState({ persos: data }))
  }

  deleteCharacter(id) {
    console.log({ id })
    axios.delete(`/api/players/${id}`)
      .then(() => console.log(`delete ${id}`))
  }

  render() {
    const { persos } = this.state;
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
            <Button onClick={() => this.deleteCharacter(perso.id)}> Delete this character </Button>
          </Card.Content>
        </Card>

      ))


    );
  }
}

export default DeletePerso;

// INSERT INTO `players`(firstname, lastname, picture, anime_id, power, power_levelup) VALUES('Zoro', 'roronoa', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 2, 90, 94);