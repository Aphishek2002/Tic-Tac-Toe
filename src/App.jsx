import { useState } from "react";
import Log from "./components/Log.jsx";
import Gameover from "./components/Gameover.jsx";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameboard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameboard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    } /*  we should return when it is inside the same component */
  }
  return winner;
}

function deriveGameboard(gameTurns) {
  let gameboard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  }
  return gameboard;
}
function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function App() {
  /*  const [activePlayer, setActivePlayer] = useState("X"); */
  const [players, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameboard = deriveGameboard(gameTurns);

  const winner = deriveWinner(gameboard, players);

  function handleSelectSquare(rowIndex, colIndex) {
    /*  setActivePlayer((currActivePlayer) =>
      currActivePlayer === "X" ? "O" : "X"
    ); */
    setGameTurns((prevTurns) => {
      /* let currPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currPlayer = "O";
      } */
      const currPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleRematch() {
    setGameTurns([]);
  }

  function onChangePlayerName(symbol, newName) {
    setPlayerName((prevNames) => {
      return {
        ...prevNames,
        [symbol]: newName,
      };
    });
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={onChangePlayerName}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={onChangePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <Gameover winner={winner} onRema={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
