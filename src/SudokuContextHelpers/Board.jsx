import { createContext, useState } from "react";

const BoardContext = createContext();

const BoardContextProvider = ({ children }) => {
  const [solvedByUser, setSolvedByUser] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  let BackupBoard = [
    [0, 0, 0, 9, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 5, 0, 0, 0, 9],
    [6, 0, 0, 0, 2, 8, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 8, 9, 0],
    [4, 0, 0, 0, 8, 0, 1, 0, 7],
    [0, 9, 0, 6, 1, 3, 4, 0, 0],
    [0, 0, 0, 0, 9, 2, 7, 6, 0],
    [0, 6, 0, 0, 3, 1, 0, 2, 4],
    [9, 0, 2, 0, 4, 0, 0, 0, 3],
  ];

  async function getRandomBoard() {
    try {
      setLoader(true);
      const response = await fetch(`https://sudoku-api.vercel.app/api/dosuku`);
      const result = await response.json();
      setLoader(false);
      const board = {
        board:
          (result &&
            result.newboard &&
            result.newboard.grids &&
            result.newboard.grids[0].value) ||
          BackupBoard,
      };
      return board;
    } catch (error) {
      setLoader(false);
      console.error(`Sorry, try to refresh the page!`);
      return { board: BackupBoard };
    }
  }

  // sudoku-solver
  let storeAllResults;
  function sudokuSolver(board, row, col) {
    if (row === board.length) {
      storeAllResults.push(
        board.map((row) => {
          return row.join(" ").split(" ").map(Number);
        })
      );
      return 0;
    }

    let nxt_row = 0,
      nxt_col = 0;
    if (col === 8) {
      nxt_row = row + 1;
      nxt_col = 0;
    } else {
      nxt_row = row;
      nxt_col = col + 1;
    }

    if (board[row][col] !== 0) {
      sudokuSolver(board, nxt_row, nxt_col);
    } else {
      for (let value = 1; value <= 9; value++) {
        if (check(board, row, col, value)) {
          board[row][col] = value;
          sudokuSolver(board, nxt_row, nxt_col);
          board[row][col] = 0;
        }
      }
    }

    return false;
  }
  // sudoku-value checker
  function check(board, row, col, value) {
    // vertically
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === value) return false;
    }
    // horizontally
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === value) return false;
    }
    // grid 3x3
    let grid_row = Math.floor(row / 3) * 3;
    let grid_col = Math.floor(col / 3) * 3;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (board[grid_row + x][grid_col + y] === value) return false;
      }
    }

    return true;
  }

  function compareBoard(initialBoard, board) {
    let isSolved = false,
      becomeFalse = true;
    setIsChecking(becomeFalse);
    storeAllResults = [];
    sudokuSolver(initialBoard, 0, 0);

    for (let x = 0; x < storeAllResults.length; x++) {
      let res = storeAllResults[x],
        flag = 0;
      res.forEach((row, index) => {
        if (row.join(" ") === board[index].join(" ")) {
          flag++;
        }
      });
      if (flag === 9) {
        isSolved = true;
        becomeFalse = false;
        break;
      }
      if (x === storeAllResults.length - 1) becomeFalse = false;
    }

    setSolvedByUser(isSolved);
  }

  function solve(initialBoard) {
    storeAllResults = [];
    sudokuSolver(initialBoard, 0, 0);
    return storeAllResults[0];
  }

  const value = {
    solvedByUser,
    setSolvedByUser,
    loader,
    setLoader,
    isChecking,
    setIsChecking,
    getRandomBoard,
    solve,
    compareBoard,
  };
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

export { BoardContext, BoardContextProvider };
