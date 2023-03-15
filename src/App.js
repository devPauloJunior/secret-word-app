// MEUS CSS
import './App.css';

// MEUS COMPONENTES
import StartScreen from './Components/StartScreen';
import Game from './Components/Game'
import GameOver from './Components/GameOver'

// MEU REACT
import { useCallback, useEffect, useState } from 'react';

// MEUS DADOS
import { wordList } from './data/word';

// STAGIOS DO GAME
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }, 
];

function App() {

  const [gameStage, setGameStage ] = useState(stages[0].name);
  const [word] = useState(wordList);
  const [guessLetter, setGuessLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState (0);

  // CONFIGURAÇÃO DO GAME
  const [pickCategory, setPickCategory] = useState("");
  const [pickWord, setPickWord] = useState ("");
  const [letters, setLetters]  =useState([])

const pickWordAndCategory = () => {
  const categories = Object.keys(word)
  const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

  const myWord = word[category][Math.floor(Math.random() * word[category].length)];

  return {myWord, category};
}

  //INICIAR O GAME
  const startGame = () => {
    const {myWord, category} = pickWordAndCategory();

    let wordLetters = myWord.split("");
    
    wordLetters = wordLetters.map((w) => w.toLowerCase());
    console.log(wordLetters);

    setPickCategory(category);
    setPickWord(myWord);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  };

  // FINALIZAR O GAME
  const endGame = (letter) => {
    const normalizeLetter = letter.toLowerCase()
    
    if ( guessLetter.includes(normalizeLetter) || wrongLetter.includes(normalizeLetter) ) {
      return;
    }

    if (letters.includes(normalizeLetter)) {
      setGuessLetter((actualGuessLetter) => [
        ...actualGuessLetter,
        normalizeLetter
      ])
    } else {
      setWrongLetter((actualWrongLetter) => [
        ...actualWrongLetter,
        normalizeLetter,
      ]);
    }
    console.log(guessLetter);
    console.log(wrongLetter);
  };

  // RETRY DO GAME
  const retry = () => {
    setGameStage(stages[0].name);
  }
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame = { startGame } />}
      {gameStage === "game" && <Game endGame={endGame} pickWord={pickWord} pickCategory={pickCategory} letters={letters} guessLetter={guessLetter} guesses={guesses} score={score} wrongLetter={wrongLetter} /> }
        {gameStage === "end" && <GameOver retry={ retry } />}
    </div>
  );
}

export default App;
