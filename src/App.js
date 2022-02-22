import { useEffect, useState, useContext } from "react";
import { BoardContext } from "./SudokuContextHelpers/Board";
import "./App.css";
import { TimeTravelContext } from "./SudokuContextHelpers/TimeTravel";
import undo from './images/undo.png';
import redo from './images/redo.png';

function App() {
  const {
    isChecking,
    setIsChecking,
    solvedByUser,
    loader,
    compareBoard,
    getRandomBoard,
    solve,
  } = useContext(BoardContext);
  const {
    board,
    setBoard,
    timeTravel,
    setTimeTravel,
    stateNumber,
    setStateNumber,
    handleUndo,
    handleRedo,
  } = useContext(TimeTravelContext);

  useEffect(() => {
    getRandomBoard().then((res) => {
      setBoard(res.board);
      setTimeTravel({ ...timeTravel, [stateNumber]: res.board });
    });
  }, []);

  const handleChange = (e, row, col) => {
    const value = +e.target.value,
      duplicate = JSON.parse(JSON.stringify(board));

    if (value === -1 || (value >= 1 && value <= 9)) {
      duplicate[row][col] = value;
    }
    setBoard(duplicate);
    setStateNumber(stateNumber + 1);
    setTimeTravel({ ...timeTravel, [stateNumber + 1]: duplicate });
  };

  const check = () => compareBoard(timeTravel["0"], board);
  const getSolution = () => setBoard(solve(timeTravel["0"]));
  const reset = () => {
    setIsChecking(false);
    setBoard(timeTravel["0"]);
  };

  return (
    <div className="App">
      <section>
        <h1>SUDOKU</h1>
        <p
          style={{ display: isChecking ? "inline-block" : "none" }}
          className={solvedByUser ? "user-result green" : "user-result red"}
        >
          {solvedByUser ? "You are a genius😊" : "Oops😯, try again👍!"}
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
        <div className="time-travel">
          <button onClick={handleUndo}><img src={undo} alt="undo" /></button>
          <button onClick={handleRedo}><img src={redo} alt="redo" /></button>
        </div>
        <div>
          <button onClick={check}>Check</button>
          <button onClick={getSolution}>Solution</button>
          <button onClick={reset}>Reset</button>
        </div>
      </section>
    </div>
  );
}

export default App;
