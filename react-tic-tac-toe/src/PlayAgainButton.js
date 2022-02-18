export default function PlayAgainButton(props) {
  return (
      <button className="play-again-btn" onClick={props.resetGame}>
          Play Again
      </button>
  );
}
