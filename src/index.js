import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BoardContextProvider } from "./SudokuContextHelpers/Board";

ReactDOM.render(
  <React.StrictMode>
    <BoardContextProvider>
      <App />
    </BoardContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
