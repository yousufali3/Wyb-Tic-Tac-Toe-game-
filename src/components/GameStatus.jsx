import PropTypes from 'prop-types';
import { memo } from 'react';
import '../styles/GameStatus.css';

const GameStatus = ({ winner, isXNext, isDraw }) => {
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Game Draw!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-status">
      {status}
    </div>
  );
};

GameStatus.propTypes = {
  winner: PropTypes.string,
  isXNext: PropTypes.bool.isRequired,
  isDraw: PropTypes.bool.isRequired
};

export default memo(GameStatus);