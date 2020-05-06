import React, { Component } from 'react';
import Keyboard from './Keyboard';
import CurrentWord from './CurrentWord';
import Heart from './Heart';
import './App.css';

class App extends Component {
  
  state = {
    wordCollection:['piano', 'wordpress','gare', 'train', 'glace','code','licorne'],
    currentWord: null,
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase().split(''),
    usedLetter:[],
    win:0,
    attemps:0,
    maxAttemps: 9
  }

  componentDidMount() {
    window.addEventListener('keyup', (e) => {
      if ( e.keyCode === 13) {
        this.initGame()
      }
  })
   // this.initGame()
  }

  clickLetter = (letter) => {

    if (this.state.usedLetter.indexOf(letter) === -1) {

      let attemps = this.state.attemps;
      const usedLetter = [letter, ...this.state.usedLetter];

      if (this.state.currentWord.indexOf(letter) === -1) {
        attemps = this.state.attemps + 1;
      }

      let win = 1;

      for (let i = 0; i < this.state.currentWord.length; i++) {
        if (usedLetter.indexOf(this.state.currentWord[i]) === -1) {
          win = 0;
        }
      }

      if (attemps === 9 && win === 0) {
        win = -1;
      }
      
      this.setState({ usedLetter, win, attemps })


    }
  }

  pickNewWord=()=>{
    const randomIndex = Math.floor(Math.random() * this.state.wordCollection.length);
    return this.state.wordCollection[randomIndex]
  
  }

initGame = () => {
  this.setState({currentWord:this.pickNewWord(), usedLetter:[], win: 0, attemps: 0})
}

  render() {
    return (
      <div id="game">
        <h1>Pendu</h1>
        { this.state.currentWord !== null && 
              <CurrentWord 
              currentWord={ this.state.currentWord }
              usedLetter= { this.state.usedLetter}
              win= { this.state.win }
              />
        }

        {
          this.state.currentWord !== null &&
          <Heart 
            attemps={ this.state.attemps }
            maxAttemps={ this.state.maxAttemps }
          />
        }

        {
          (this.state.win === 0 && this.state.currentWord !== null) &&
        <Keyboard 
          alphabet={ this.state.alphabet }
          action={ this.clickLetter }
          usedLetter={ this.state.usedLetter }
        />
        }

        {
          this.state.win === 1 &&
          <p className='win_msg'>WIN! :-)</p>
        }


        {
          this.state.win === -1 &&
          <p className='lost_msg'>LOST :-(</p>
        }

        {
          (this.state.currentWord === null || this.state.win !== 0) &&
          <button id='play_new_game' onClick={ this.initGame }>Nouvelle partie</button>
        }
        
      </div>
    );
  
  }
  }

export default App;
