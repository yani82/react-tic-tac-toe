import React, { useState, useEffect } from "react";
import PlayAgainButton from "./PlayAgainButton";
import { WIN_COMBINATIONS } from "./helpers/winCombinations";
import './App.css';

function App() {
  const [gameData, setGameData] = useState ({
    board: Array(9).fill(""),
    currentPlayer: "X",
    winner: false,
    isDraw: false
  });

  useEffect(() => {
    const winningCombo = WIN_COMBINATIONS.find((combo) => {
      return (
        gameData.board[combo[0]] !== "" && 
        gameData.board[combo[0]] === gameData.board[combo[1]] && 
        gameData.board[combo[1]] === gameData.board[combo[2]] 
      );
    });
    if (winningCombo) {
      setGameData({
        ...gameData, 
        winner: gameData.currentPlayer === "X" ? "O" : "X"
      });
    } else if (gameData.board.every((squareValue) => squareValue !== "")){
      setGameData({
        ...gameData,
        isDraw: true
      });
    }
    }, [gameData.board]);

    function handleClick(e) {
      if (gameData.board[e.target.dataset.position] === "" && !gameData.winner) {
        const newBoard = [...gameData.board];
        newBoard[e.target.dataset.position] = gameData.currentPlayer;
        setGameData({
          ...gameData,
          board: newBoard,
          currentPlayer: gameData.currentPlayer === "X" ? "O" : "X"
        });
      }
    }

    function renderSquares() {
      return gameData.board.map((squareValue, i) => (
        <div 
          data-position={i} 
          onClick={handleClick}
          key={i}
          className="square" 
        >
          {squareValue}
          </div>
      ));
    }

    function resetGame() {
      setGameData({
        board: Array(9).fill(""),
        currentPlayer: "X",
        winner: false,
        isDraw: false
      }); 
    }

    return (
      <div className="App">
        <h1>Let's Play Tic-Tac-Toe!</h1>
        {gameData.winner ? (
          <>
            <h2>Congratulations {gameData.winner}!</h2>
            <PlayAgainButton resetGame={resetGame} />
          </>
        ) : null}

        {gameData.isDraw ? (
          <>
            <h2>This Game is a Draw!</h2>
            <PlayAgainButton resetGame={resetGame} /> 
          </>
        ) : null}
        <div className="board-container">{renderSquares()}</div>
      </div>
    );
  }

export default App;
