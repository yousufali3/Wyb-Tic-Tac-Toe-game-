export const checkWinner = (board, size, streak) => {
  const winningCells = [];
  
  // Check rows
  for (let row = 0; row < size; row++) {
    for (let col = 0; col <= size - streak; col++) {
      const cells = [];
      let match = true;
      const startValue = board[row * size + col];
      
      if (!startValue) continue;
      
      for (let k = 0; k < streak; k++) {
        const index = row * size + col + k;
        cells.push(index);
        if (board[index] !== startValue) {
          match = false;
          break;
        }
      }
      
      if (match) {
        winningCells.push(...cells);
        return { winner: startValue, winningCells };
      }
    }
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    for (let row = 0; row <= size - streak; row++) {
      const cells = [];
      let match = true;
      const startValue = board[row * size + col];
      
      if (!startValue) continue;
      
      for (let k = 0; k < streak; k++) {
        const index = (row + k) * size + col;
        cells.push(index);
        if (board[index] !== startValue) {
          match = false;
          break;
        }
      }
      
      if (match) {
        winningCells.push(...cells);
        return { winner: startValue, winningCells };
      }
    }
  }

  // Check diagonals
  for (let row = 0; row <= size - streak; row++) {
    for (let col = 0; col <= size - streak; col++) {
      // Check diagonal from top-left to bottom-right
      const cells1 = [];
      let match1 = true;
      const startValue1 = board[row * size + col];
      
      if (startValue1) {
        for (let k = 0; k < streak; k++) {
          const index = (row + k) * size + (col + k);
          cells1.push(index);
          if (board[index] !== startValue1) {
            match1 = false;
            break;
          }
        }
        
        if (match1) {
          winningCells.push(...cells1);
          return { winner: startValue1, winningCells };
        }
      }

      // Check diagonal from top-right to bottom-left
      const cells2 = [];
      let match2 = true;
      const startValue2 = board[row * size + (col + streak - 1)];
      
      if (startValue2) {
        for (let k = 0; k < streak; k++) {
          const index = (row + k) * size + (col + streak - 1 - k);
          cells2.push(index);
          if (board[index] !== startValue2) {
            match2 = false;
            break;
          }
        }
        
        if (match2) {
          winningCells.push(...cells2);
          return { winner: startValue2, winningCells };
        }
      }
    }
  }

  return { winner: null, winningCells: [] };
};

export const checkDraw = (board) => {
  return board.every(cell => cell !== null);
};