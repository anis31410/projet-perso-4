import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 
class CarouselP extends Component {
  constructor(props) {
    super(props);
    this.state={
      persos: []
    }
    this.persosF = this.persosF.bind(this);
  }

  componentDidMount() {
    this.persosF();
  }

  persosF() {
    axios.get('/api/players')
      .then(res => res.data)
      .then(data => this.setState({ persos: data }))
  }

    render() {
      const { persos } = this.state;
        return (
            <Carousel style={{ width:"35px", height: "10vw"}}>
              {persos.map(perso => (
                <div>
                  <img src={perso.picture} />
                  <p>{perso.firstname}</p>
                </div>
              ))}
                {/* <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div> */}
            </Carousel>
        );
    }
}

export default CarouselP;