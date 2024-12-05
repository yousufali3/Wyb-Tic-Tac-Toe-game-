import PropTypes from 'prop-types';
import { memo } from 'react';
import '../styles/GameBoard.css';

const GameBoard = ({ board, size, onCellClick, winningCells = [] }) => {
  return (
    <div 
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`
      }}
    >
      {board.map((cell, index) => (
        <button
          key={index}
          className={`cell ${winningCells.includes(index) ? 'winning' : ''}`}
          onClick={() => onCellClick(index)}
          disabled={cell !== null}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.number.isRequired,
  onCellClick: PropTypes.func.isRequired,
  winningCells: PropTypes.arrayOf(PropTypes.number)
};

export default memo(GameBoard);