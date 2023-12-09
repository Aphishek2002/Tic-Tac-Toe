export default function Gameover({ winner, onRema }) {
  return (
    <div id="game-over">
      <h2>Game over!</h2>

      <p>{winner ? `${winner} won` : `Its a draw`}</p>
      <button onClick={onRema}>Rematch</button>
    </div>
  );
}
