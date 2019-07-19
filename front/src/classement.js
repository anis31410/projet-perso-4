import React from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';

class Classement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classement: []
    }
    this.returnNewClass = this.returnNewClass.bind(this);
  }

  componentDidMount() {
    this.returnNewClass();
  }

  returnNewClass() {
    axios.get('/api/team/classement')
      .then(res => res.data)
      .then(data => this.setState({ classement: data }));
  }

  render() {
    const { classement } = this.state;
    const otherClass = [...classement];
    const newArr = otherClass.splice(0, 1);
    let count = 0;
    return (
      <div>
        <List vertical style={{ color: 'black' }}>
          {classement.map(element => (
            <List.Item>
              <h1 style={{ color: 'red', marginBottom: '2px', marginTop: '2px' }}><strong style={{ color: 'black' }}>{count = count + 1}</strong></h1>
              <List.Content>
                <List.Header style={{ color: 'black' }}>{element.name}</List.Header>
                Victory Number: {element.victory}
              </List.Content>
              <hr />
            </List.Item>

          ))}
        </List>
      </div>
    );
  }
}

export default Classement;
