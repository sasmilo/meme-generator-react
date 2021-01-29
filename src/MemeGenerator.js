import React, { Component } from 'react';
import './index.css';

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: '', // Initialization of the top text
      bottomText: '', // Initialization of the bottom text
      randomImg: 'https://api.memegen.link/images/aag.png', // Initialization of the photo
      allMemeImgs: [], // Initialization of the allMemeImgs array
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // ensure that data is fetched at the beginning
    fetch('https://api.memegen.link/templates/') // call to URL
      // .then((response) => response.json())
      .then((response) => {
        // const { arrayOfMemes } = response; // Put the resulting json to the array called arrayOfMemes

        this.setState({ allMemeImgs: response }); // Now allMemeImgs contains an array of objects we fetched
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const randNum = [(Math.random() * this.state.allMemeImgs.length) | 0];
    // const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImgObj = this.state.allMemeImgs[randNum]; // We got a random object from an array of the objects
    const randMemeImg = function () {
      return randMemeImgObj.blank;
    };
    // const randMemeImg = randMemeImgObj.blank;
    this.setState({ randomImg: randMemeImg });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />

          <button>New photo</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
