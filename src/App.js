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

const guessesQtd = 3;

function App() {

  const [gameStage, setGameStage ] = useState(stages[0].name);
  const [word] = useState(wordList);
  const [guessLetter, setGuessLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState (0);

  // CONFIGURAÇÃO DO GAME
  const [pickCategory, setPickCategory] = useState("");
  const [pickWord, setPickWord] = useState ("");
  const [letters, setLetters]  =useState([])

const pickWordAndCategory = useCallback(() => {
  const categories = Object.keys(word)
  const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

  const myWord = word[category][Math.floor(Math.random() * word[category].length)];

  return {myWord, category};
}, [word]);

  //INICIAR O GAME
  const startGame = useCallback(() => {
    clearLetterState();
    const {myWord, category} = pickWordAndCategory();

    let wordLetters = myWord.split("");
    
    wordLetters = wordLetters.map((w) => w.toLowerCase());
    console.log(wordLetters);

    setPickCategory(category);
    setPickWord(myWord);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // FINALIZAR O GAME
  const endGame = (letter) => {
    const normalizeLetter = letter.toLowerCase();

    if (guessLetter.includes(normalizeLetter) || wrongLetter.includes(normalizeLetter)){
      return;
    }
    
    if (letters.includes(normalizeLetter)) {
      setGuessLetter((actualGuessLetter) => [
        ...actualGuessLetter, normalizeLetter
      ])
    } else {
      setWrongLetter((actualWrongLetter) => [
        ...actualWrongLetter, normalizeLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  // RETRY DO GAME
  const retry = () => {
    setScore(0);
    setGuesses(guessesQtd);
    setGameStage(stages[0].name);
  }

  //CLEAR LETTER STATE
  const clearLetterState = () => {
    setGuessLetter([]);
    setWrongLetter([]);
  }

  //CHECK GUESSES
  useEffect(() => {
    if (guesses === 0) {
      clearLetterState();

      setGameStage(stages[2].name);
    }
  },[ guesses ]);

  // CHECK WIN
  useEffect(() => {
    const uniqueLetter = [...new Set (letters)];

    console.log(uniqueLetter);
    console.log(guessLetter);

    if (guessLetter.length === uniqueLetter.length) {
      setScore((actualScore) => (actualScore += 50))
      startGame();
    }
  },[letters, guessLetter, startGame]);


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame = { startGame } />}
      {gameStage === "game" && <Game endGame={endGame} pickWord={pickWord} pickCategory={pickCategory} letters={letters} guessLetter={guessLetter} guesses={guesses} score={score} wrongLetter={wrongLetter} /> }
      {gameStage === "end" && <GameOver retry={ retry } score={ score } />}
    </div>
  );
}

export default App;
