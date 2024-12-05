import { useState, useCallback } from "react";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import GameStatus from "./components/GameStatus";
import { checkWinner, checkDraw } from "./utils/gameLogic";
import "./App.css";

function App() {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [winningCells, setWinningCells] = useState([]);

  const { winner } = checkWinner(board, gridSize, winStreak);
  const isDraw = !winner && checkDraw(board);

  const handleGridSizeChange = useCallback(
    (size) => {
      setGridSize(size);
      setWinStreak(Math.min(winStreak, size)); // Ensure winStreak is valid
      setBoard(Array(size * size).fill(null));
      setIsXNext(true);
      setGameStarted(false);
      setWinningCells([]);
    },
    [winStreak]
  );

  const handleWinStreakChange = useCallback((streak) => {
    setWinStreak(streak); // Allow any value for winStreak
  }, []);

  const handleCellClick = useCallback(
    (index) => {
      if (board[index] || winner) return;

      setGameStarted(true);
      const newBoard = [...board];
      newBoard[index] = isXNext ? "X" : "O";
      setBoard(newBoard);
      setIsXNext(!isXNext);

      const result = checkWinner(newBoard, gridSize, winStreak);
      if (result.winner) {
        setWinningCells(result.winningCells);
      }
    },
    [board, isXNext, winner, gridSize, winStreak]
  );

  const handleReset = useCallback(() => {
    setBoard(Array(gridSize * gridSize).fill(null));
    setIsXNext(true);
    setGameStarted(false);
    setWinningCells([]);
  }, [gridSize]);

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>

      <GameControls
        gridSize={gridSize}
        winStreak={winStreak}
        onGridSizeChange={handleGridSizeChange}
        onWinStreakChange={handleWinStreakChange}
        onReset={handleReset}
        disabled={gameStarted && !winner && !isDraw}
      />

      <GameStatus winner={winner} isXNext={isXNext} isDraw={isDraw} />

      <GameBoard
        board={board}
        size={gridSize}
        onCellClick={handleCellClick}
        winningCells={winningCells}
      />
    </div>
  );
}

export default App;
