// MEU CSS
import { useRef, useState } from "react";
import "./Game.css";

const Game = ({ endGame, pickWord, pickCategory, letters, guessLetter, guesses, score, wrongLetter }) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    endGame(letter);
    setLetter("");
    letterInputRef.current.focus();
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: { score } </span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{ pickCategory }</span>
      </h3>
      <p>Você ainda tem { guesses } tentativa(s)</p>
      <div className="wordContainer">
        { letters.map((letter, i) => (
          guessLetter.includes(letter) ? (
            <span key={i} className="letter">{ letter }</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
         ))}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={ handleSubmit }>
          <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={ letter } ref={ letterInputRef }/>
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongContainer">
        <p>Letras já utilizadas:</p>
        { wrongLetter.map((letter, i) => (
          <span key={i}>{ letter }, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;