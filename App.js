/// IMPORTATION DES FICHIERS ET COMPOSANTS REACT

import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';


// FOOD ALEATOIRE DU SERPENT 

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

// ETAT INITIAL DES CARACTERISTIQUES DU SERPENT

const initialState = {
  food: getRandomCoordinates(),
  speed: 150,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]
}
const initialState2 = {
  food: getRandomCoordinates(),
  speed: 80,
  direction: 'DOWN',
  snakeDots: [
    [0,2],
    [2,0]
  ]
}


/** 
const initialState3 = {
  food: getRandomCoordinates(),
  speed: 50,
  direction: 'DOWN',
  snakeDots: [
    [0,2],
    [2,0]
  ]
}*/


// CLASSE APP POUR TOUS LES COMPOSANTS

class App extends Component {

  state = initialState;
  state2 = initialState2;
  //state3 = initialState3;
  

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

// POUR DIRIGER LE SERPENT

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

/// DEPLACEMENT DU SERPENT

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

 // MARGE POUR LE SERPENT

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

// SERPENT SE HEURTE AU OBSTACLE : CE QU IL ADVIENT!

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    })
  }



// VERIFICATION APRES AVOIR PRIS UN FOOD

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  
  }


// L'AGRANDISSEMENT DU SERPENT

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }




// L'AUGMENTATION DE LA VITESSE

  increaseSpeed() {

    if ( this.state.snakeDots.length == 4) {
      this.setState(initialState2);
      alert("Félications vous passez au niveau 2 ")
      setInterval(this.moveSnake, this.state2.speed);
    }
    /*
    else if (this.state.snakeDots.length=6 )
    {
      this.setState(initialState3);
      alert("Félications vous passez au niveau 3 ")
      setInterval(this.moveSnake, this.state3.speed);
    }
    */
  }

  /// Alerte lorsque vous perdez!!

  onGameOver() {
    alert(`Perdu! la taille finale du serpent est : ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }

  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/>
      </div>
    );
  }
}

export default App;
