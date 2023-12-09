/* import { useState } from "react"; */
/* const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]; */

export default function GameBoard({ onSelectSquare, board }) {
  /* const [gameboard, setGameboard] = useState(initialGameBoard); */
  /* 
  let gameboard = initialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameboard[row][col] = player;
  } */
  /* function handleSelectsquare(rowIndex, colIndex) {
    setGameboard((prevGameboard) => {
      const updatedBoard = [
        ...prevGameboard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      console.log(rowIndex, colIndex);
      return updatedBoard;
    });
    onSelectSquare();
  } */
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          {/* {console.log(row)}  FOR MY FUTURE REFERNCE */}
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* {console.log(playerSymbol)} FOR MY FUTURE REFERNCE */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                  /* this disabled button will make the button disable and not be clicked */
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
