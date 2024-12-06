import './App.css';
import { useState, useEffect } from 'react';

function useCountdownTimer(initialTime: number) {
  const [timer, setTimer] = useState(initialTime);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive]);

  const startTimer = () => {
    setTimer(initialTime);
    setTimerActive(true);
  };

  return { timer, startTimer, timerActive, setTimerActive };
}

function Square({ color, onSquareClick, isFalling }: { color: string; onSquareClick: () => void; isFalling: boolean }) {
  return (
    <button className="square" onClick={onSquareClick}>
      <span className={`disk ${isFalling ? 'falling' : ''}`} style={{ backgroundColor: color }}></span>
    </button>
  );
}

export default function App() {
  const [premier, setPremier] = useState(Boolean(Math.round(Math.random())));
  const [joueurCourant, setJoueurCourant] = useState(premier);
  const [squares, setSquares] = useState(Array(42).fill('white'));
  const [nbCoup, setNbCoup] = useState(0);
  const [lastCoup, setLastCoup] = useState(-1);
  const { timer, startTimer, timerActive, setTimerActive } = useCountdownTimer(30);
  const [fallingSquares, setFallingSquares] = useState(Array(42).fill(false));

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (calculateWinner(squares, lastCoup) || calculateEgalite(nbCoup) || !timerActive) {
      setTimerActive(false);
    }
  }, [squares, lastCoup, nbCoup, timerActive]);

  function handleClick(col: number) {
    if (calculateWinner(squares, lastCoup) || calculateEgalite(nbCoup) || !timerActive) {
      return;
    }
    for (let row = 5; row >= 0; row--) {
      const ind = row * 7 + col;
      if (squares[ind] === 'white') {
        const nextSquares = squares.slice();
        nextSquares[ind] = joueurCourant ? 'black' : 'red';
        setNbCoup(nbCoup + 1);

        setSquares(nextSquares);
        setFallingSquares((prev) => {
          const newFalling = prev.slice();
          newFalling[ind] = true;
          return newFalling;
        });
        setJoueurCourant(!joueurCourant);
        setLastCoup(ind);
        startTimer();
        return;
      }
    }
  }

  const winner = calculateWinner(squares, lastCoup);
  const egalite = calculateEgalite(nbCoup);
  let status;

  if (winner) {
    status = `${winner} a gagné`;
  } else if (egalite) {
    status = 'Egalité !';
  } else if (!timerActive) {
    status = `${joueurCourant ? 'black' : 'red'} a gagné par forfait de son adversaire`;
  } else {
    status = `Prochain tour : ${joueurCourant ? 'black' : 'red'}`;
  }

  function newGame() {
    setPremier(Boolean(Math.round(Math.random())));
    setJoueurCourant(premier);
    setSquares(Array(42).fill('white'));
    setNbCoup(0);
    setLastCoup(-1);
    startTimer();
    setFallingSquares(Array(42).fill(false));
  }

  function restartGame() {
    setJoueurCourant(premier);
    setSquares(Array(42).fill('white'));
    setNbCoup(0);
    setLastCoup(-1);
    startTimer();
    setFallingSquares(Array(42).fill(false));
  }

  return (
    <>
      <div className="app">
        <h1>Connect 4 game</h1>
      </div>
      <div className="status">{status}</div><br />
      {timerActive && (
        <div className="timer">Temps restant: {timer}s</div>
      )}
      {(() => {
        const rows = [];
        for (let numRow = 0; numRow < 6; numRow++) {
          const carres = [];
          for (let numCol = 0; numCol < 7; numCol++) {
            const index = numRow * 7 + numCol;
            carres.push(
              <Square
                key={index}
                color={squares[index]}
                onSquareClick={() => handleClick(numCol)}
                isFalling={fallingSquares[index]}
              />
            );
          }
          rows.push(
            <div className="board-row" key={numRow}>
              {carres}
            </div>
          );
        }
        return rows;
      })()}
      <br />
      <button className="button" onClick={restartGame}>
        Recommencer
      </button>

      {(winner || egalite || !timerActive) && (
        <button className="button" onClick={newGame}>
          Nouveau jeu
        </button>
      )}
    </>
  );
}

function calculateWinner(squares: Array<string>, lastCoup: number) {
  if (lastCoup === -1) {
    return null;
  }

  const row = Math.floor(lastCoup / 7);
  const col = lastCoup % 7;

  // Horizontal
  for (let c = Math.max(0, col - 3); c <= Math.min(6 - 3, col); c++) {
    if (squares[row * 7 + c] === squares[lastCoup] &&
      squares[row * 7 + c + 1] === squares[lastCoup] &&
      squares[row * 7 + c + 2] === squares[lastCoup] &&
      squares[row * 7 + c + 3] === squares[lastCoup]) {
      return squares[lastCoup];
    }
  }

  // Vertical
  for (let r = Math.max(0, row - 3); r <= Math.min(5 - 3, row); r++) {
    if (squares[r * 7 + col] === squares[lastCoup] &&
      squares[(r + 1) * 7 + col] === squares[lastCoup] &&
      squares[(r + 2) * 7 + col] === squares[lastCoup] &&
      squares[(r + 3) * 7 + col] === squares[lastCoup]) {
      return squares[lastCoup];
    }
  }

  // Diagonale gauche à droite vers le haut
  for (let r = 0; r <= 5; r++) {
    for (let c = 0; c <= 6; c++) {
      if (
        squares[r * 7 + c] === squares[lastCoup] &&
        squares[(r + 1) * 7 + (c + 1)] === squares[lastCoup] &&
        squares[(r + 2) * 7 + (c + 2)] === squares[lastCoup] &&
        squares[(r + 3) * 7 + (c + 3)] === squares[lastCoup] &&
        r + 3 <= 5 && c + 3 <= 6
      ) {
        return squares[lastCoup];
      }
    }
  }

  // Diagonale gauche à droite vers le bas
  for (let r = 3; r <= 5; r++) {
    for (let c = 0; c <= 6; c++) {
      if (
        squares[r * 7 + c] === squares[lastCoup] &&
        squares[(r - 1) * 7 + (c + 1)] === squares[lastCoup] &&
        squares[(r - 2) * 7 + (c + 2)] === squares[lastCoup] &&
        squares[(r - 3) * 7 + (c + 3)] === squares[lastCoup] &&
        r - 3 >= 0 && c + 3 <= 6
      ) {
        return squares[lastCoup];
      }
    }
  }

  return null;
}

function calculateEgalite(nbCoup: number) {
  return nbCoup === 42;
}
