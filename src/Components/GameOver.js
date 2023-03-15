// MEU CSS
import "./GameOver.css";

const GameOver = ({ retry,  score }) => {
  return (
    <div className="gameover">
      <h1>Fim de Jogo</h1>
      <h2>
        A sua pontuação foi: <span>{ score }</span>
      </h2>
      <button onClick={ retry }>Jogar Novamente</button>
    </div>
  );  
};

export default GameOver;