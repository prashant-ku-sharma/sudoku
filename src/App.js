import { useEffect, useState, useContext } from "react";
import { BoardContext } from "./SudokuContextHelpers/Board";
import "./App.css";

let initialBoard = [];
function App() {
  const [board, setBoard] = useState(initialBoard);
  const {
    isChecking,
    setIsChecking,
    solvedByUser,
    loader,
    compareBoard,
    getRandomBoard,
    solve,
  } = useContext(BoardContext);

  useEffect(() => {
    getRandomBoard().then((res) => {
      setBoard(res.board);
      initialBoard = res.board;
    });
  }, []);

  const handleChange = (e, row, col) => {
    const value = +e.target.value,
      duplicate = JSON.parse(JSON.stringify(board));

    if (value === -1 || (value >= 1 && value <= 9)) {
      duplicate[row][col] = value;
    }
    setBoard(duplicate);
  };

  const check = () => compareBoard(initialBoard, board);
  const getSolution = () => setBoard(solve(initialBoard));
  const reset = () => {
    setIsChecking(false);
    setBoard(initialBoard);
  };

  return (
    <div className="App">
      <section>
        <h1>SUDOKU</h1>
        <p
          style={{ display: isChecking ? "inline-block" : "none" }}
          className={solvedByUser ? "user-result green" : "user-result red"}
        >
          {solvedByUser ? "You win!" : "You lose!"}
        </p>
        <p className={loader ? "loader" : "hide"}>
          Loading<span></span>
          <span></span>
          <span></span>
        </p>
        <div className="sudoku-board">
          {board.map((rowArray, row) => {
            return rowArray.map((cellValue, col) => {
              return (
                <input
                  type="text"
                  value={cellValue === 0 ? "" : cellValue}
                  onChange={(e) => handleChange(e, row, col)}
                  disabled={cellValue !== 0}
                  key={row + col}
                  className="board-cell"
                  style={{ backgroundColor: cellValue === 0 ? "" : "pink" }}
                />
              );
            });
          })}
        </div>
      </section>
      <section className="btns">
        <button onClick={check}>Check</button>
        <button onClick={getSolution}>Solution</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
}

export default App;
