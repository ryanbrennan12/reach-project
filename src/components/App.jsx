import React from "react";
import axios from "axios";
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: 'Ryan',
      letters: [],
      guessedLetter: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/all')
      .then(response => response.json())
      .then((word) => {
        console.log(typeof word)
        this.setState({
          secretWord: word
        })
      })
      .catch((err) => {
        console.log('We have an error, ', err)
      })
  }

  handleEasy() {
    this.handleAjax('easy');
  }

  handleMedium() {
    this.handleAjax('medium');
  }

  handleSuperSmart() {
    this.handleAjax('hard');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckLetter() {
    let letters = this.state.letters.concat(this.state.guessedLetter)
    this.state.secretWord.indexOf(this.state.guessedLetter) > -1 ? console.log('YUP') : console.log('nope');

    this.setState({
      letters
    })
  }


  handleAjax(setting) {
    let self = this;
    let difficultySetting;
    // Math.floor(Math.random() * (max - min + 1) + min);
    if (setting === 'easy') {
      difficultySetting = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    } else if (setting === 'medium') {
      difficultySetting = Math.floor(Math.random() * (7 - 5 + 1) + 5);
    } else {
      difficultySetting = Math.floor(Math.random() * (10 - 8 + 1) + 8);
    }
    console.log(difficultySetting)

    $.ajax({
      url: 'http://localhost:3000/difficulty',
      type: 'GET',
      dataType: 'json',
      data: JSON.stringify(difficultySetting),
      contentType: 'application/json',
      success: function (easyWord) {
        self.setState({
          secretWord: easyWord
        })
      },
      error: function (data) {
        console.error('Error in handleEasy', data);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <button onClick={() => this.handleEasy()}>Easy Peezy</button>
          <button onClick={() => this.handleMedium()}>Medium</button>
          <button onClick={() => this.handleSuperSmart()}>Hard</button>
        </div>
        <h1> {this.state.secretWord} </h1>
          <br />
          <br />
          <br />
          <input type='text' onChange={this.handleChange} name='guessedLetter'/>
          <button onClick={() => this.handleCheckLetter()}>Check</button>
      </div>
    );
  }
}


export default App;














