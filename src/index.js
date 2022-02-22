import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BoardContextProvider } from "./SudokuContextHelpers/Board";
import { TimeTravelContextProvider } from "./SudokuContextHelpers/TimeTravel";

ReactDOM.render(
  <React.StrictMode>
    <BoardContextProvider>
      <TimeTravelContextProvider>
        <App />
      </TimeTravelContextProvider>
    </BoardContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
