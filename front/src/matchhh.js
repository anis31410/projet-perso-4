import React from 'react';
import axios from 'axios';
import { Card, Icon, Image, Grid, Button } from 'semantic-ui-react';
import './game.css';

const style = {
  height: {
    value: '10vw',
    important: 'true'
  }
}

class Matchhh extends React.Component {
  constructor(props) {
    // eslint-disable-next-line no-undef
    super(props);
    this.state = {
      playersOne: [],
      playersTwo: [],
      victory: null,
      show: false,
      playersWin: [],
      count: 0,
      count2: 0,
      all: []
    }
    this.getOne = this.getOne.bind(this);
    this.getOpponent = this.getOpponent.bind(this);
    this.comparePower = this.comparePower.bind(this);
    this.newVictoryTotal = this.newVictoryTotal.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.countPlayers = this.countPlayers.bind(this);
  }

  componentDidMount() {
    this.countPlayers();
  }

  countPlayers() {
    axios.get('/api/players')
      .then(res => res.data)
      .then(data => this.setState({ count: data.length, all: data }))
      .then(() => this.setState({ count2: this.state.all[this.state.count - 1].id }))
      .then(() => this.getOne())
      .then(() => this.getOpponent())
  }

  getOne() {
    const { count2 } = this.state;
    const id = Math.floor(Math.random() * Math.floor(count2));
    axios.get(`api/players/${id + 1}`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          playersOne: data,
        });
      });
  }

  getOpponent() {
    const { count2 } = this.state;
    const id = Math.floor(Math.random() * Math.floor(count2));
    axios.get(`/api/players/${id + 1}`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          playersTwo: data,
        });
      });
  }

  comparePower() {
    const { playersOne, playersTwo, show } = this.state;
    if (playersOne.power > playersTwo.power) {
      this.setState({ playersWin: playersOne })
      axios.get(`/api/team/numberVictory/${playersOne.anime_id}`)
        .then(resp => resp.data)
        .then(data => this.setState({ victory: data.victory }))
        .then(() => this.newVictoryTotal())
    } else {
      this.setState({ playersWin: playersTwo })
      axios.get(`/api/team/numberVictory/${playersTwo.anime_id}`)

        .then(resp => resp.data)
        .then(data => this.setState({ victory: data.victory }))
        .then(() => this.newVictoryTotal())
    }
  }

  newVictoryTotal() {
    const { playersOne, playersTwo } = this.state;
    const data = { ...this.state };
    delete data.playersOne;
    delete data.playersTwo;
    delete data.show;
    delete data.playersWin;
    delete data.count;
    delete data.count2;
    delete data.all;
    if (playersOne.power > playersTwo.power) {
      data.victory = data.victory + 1;
      axios.put(`/api/team/increment-victory/${playersOne.anime_id}`, data)
    } else if (playersTwo.power > playersOne.power) {
      data.victory = data.victory + 1;
      axios.put(`/api/team/increment-victory/${playersTwo.anime_id}`, data)
    } else {
      console.log("match nul")
    }
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    const { playersOne, playersTwo, victory } = this.state;
    if (playersOne.id === playersTwo.id || playersOne.anime_id === playersTwo.anime_id || playersOne.power === undefined || playersTwo.power === undefined) {
      return <div>
        <h1>Appuyer sur f5 pour relancer un match</h1>
        <h3>Match impossible</h3>
        <p>Les deux adversaires font partis de la même équipe ou le personnage a été supprimé</p>
        <button type="button" onClick={this.refreshPage}> <span>Reload Page</span> </button>
      </div>
    }
    return (
      <div>
        <Grid columns={2}>
          <Grid.Column>
            <Card style={{ width: "70%" }}>
              <Image src={playersOne.picture} wrapped className="img-size" style={style} />
              <Card.Content>
                <Card.Header>{playersOne.firstname}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  {playersOne.power}
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card style={{ width: "70%" }}>
              <Image src={playersTwo.picture} wrapped className="img-size" style={style} />
              <Card.Content>
                <Card.Header>{playersTwo.firstname}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  {playersTwo.power}
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
        <Button onClick={this.comparePower}
          style={{ backgroundColor: 'black', color: 'white' }}
        >Match</Button>
      </div>
    )

  }
}

export default Matchhh;

// INSERT INTO `players`
// (firstname, lastname, picture, anime_id, power, power_levelup) VALUES
// ('Zoro', 'Roronoa', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 2, 87, 94), 
// ('Luffy', 'Monkey D.', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 2, 89, 97), 
// ('Goku', 'San', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 3, 93, 99), 
// ('Vegeta', 'Prince', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 3, 90, 94), 
// ('Livai', 'Ackermann', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 6, 90, 95), 
// ('Mikasa', 'Ackermann', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 6, 83, 88), 
// ('Escanor', 'Le Lion', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 4, 88, 97), 
// ('Meliodas', 'Le prince', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 4, 91, 96), 
// ('Gon', 'Freegs', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 5, 85, 92), 
// ('Killua', 'Zoldyck', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 5, 84, 87), 
// ('Itachi', 'Uchiha', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 1, 95, 100), 
// ('Naruto', 'Uzumaki', 'https://a.wattpad.com/cover/115410047-352-k530436.jpg', 1, 90, 96);