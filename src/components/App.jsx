import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Alphabet from './Alphabet';
import HangmanContainer from './Hangman'
import ReactHelpers from '../../utils/react-helpers.js';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      secretWord: 'Ryan',
      letters: [],
      guessedLetter: 'testing',
      mappedWord: {},
      step: '3'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckLetter = this.handleCheckLetter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reactHelpers = new ReactHelpers();
  }

  componentDidMount() {
    fetch('/all')
      .then(response => response.json())
      .then((word) => {
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

  handleClick(e) {
    let currentGuessedLetter = e.target.textContent;
    let choosenLetters = this.state.letters;

    choosenLetters = choosenLetters.concat(currentGuessedLetter);

    this.setState({
      letters: choosenLetters,
      guessedLetter: currentGuessedLetter
    }, () => {
      this.handleCheckLetter();
    })
  }

    handleCheckLetter() {
      let currentGuessedLetter = this.state.guessedLetter;
      console.log('Guessed letter in handlechecker', this.state.guessedLetter)
      let choosenLetters = this.state.letters;
      let secretWord = this.state.secretWord;
      let mappedWord = this.state.mappedWord;

      this.reactHelpers.checkLetterAlgo(mappedWord, currentGuessedLetter, (numberOfOccurences, isWinner, newMappedWord) => {

        this.setState({
          letters: choosenLetters,
          mappedWord: newMappedWord
        })
        if (isWinner === true) {
          alert('You Won the Game!');
        } else if (!isWinner) {

        }
      });
    }

    handleAjax(setting) {
      let self = this;
      let difficultySetting;

      if (setting === 'easy') {
        difficultySetting = Math.floor(Math.random() * (4 - 1 + 1) + 1);
      } else if (setting === 'medium') {
        difficultySetting = Math.floor(Math.random() * (7 - 5 + 1) + 5);
      } else {
        difficultySetting = Math.floor(Math.random() * (10 - 8 + 1) + 8);
      }

      $.ajax({
        url: 'http://localhost:3000/difficulty',
        type: 'GET',
        dataType: 'json',
        data: JSON.stringify(difficultySetting),
        contentType: 'application/json',
        success: function (wordsArray) {
          //this is coming back from getWordByDifficulty
          self.setState({
            secretWord: wordsArray[0],
            mappedWord: wordsArray[1],
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
          Guessed Letters:
          <h1> {this.state.letters} </h1>
          <br />
          <HangmanContainer step={this.state.step}/>
          <br />
          <br />
          <Alphabet choosenLetters={this.state.letters} onClick={this.handleClick} />
        </div>
      );
    }
  }

  export default App;






























