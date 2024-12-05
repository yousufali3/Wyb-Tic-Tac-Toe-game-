import PropTypes from "prop-types";
import { memo } from "react";
import "../styles/GameControls.css";

const GameControls = ({
  gridSize,
  winStreak,
  onGridSizeChange,
  onWinStreakChange,
  onReset,
  disabled,
}) => {
  return (
    <div className="game-controls">
      <div className="control-group">
        <label htmlFor="gridSize">Grid Size (3-10):</label>
        <input
          type="number"
          id="gridSize"
          value={gridSize || ""}
          min="3"
          max="10"
          onChange={(e) => {
            const value = e.target.value;
            onGridSizeChange(
              value === "" ? null : Math.max(3, Math.min(10, Number(value)))
            );
          }}
          disabled={disabled}
        />
      </div>

      <div className="control-group">
        <label htmlFor="winStreak">Win Streak (3-{gridSize}):</label>
        <input
          type="number"
          id="winStreak"
          value={winStreak || ""}
          min="3"
          max={gridSize}
          onChange={(e) => {
            const value = e.target.value;
            onWinStreakChange(
              value === ""
                ? null
                : Math.max(3, Math.min(gridSize, Number(value)))
            );
          }}
          disabled={disabled}
        />
      </div>

      <button className="reset-button" onClick={onReset}>
        Reset Game
      </button>
    </div>
  );
};

GameControls.propTypes = {
  gridSize: PropTypes.number.isRequired,
  winStreak: PropTypes.number.isRequired,
  onGridSizeChange: PropTypes.func.isRequired,
  onWinStreakChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default memo(GameControls);
