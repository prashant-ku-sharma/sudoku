import { useState } from "react";
import { createContext } from "react";

const TimeTravelContext = createContext();

const state = {
  0: [],
};

const TimeTravelContextProvider = ({ children }) => {
  const [board, setBoard] = useState([]);
  const [timeTravel, setTimeTravel] = useState(state);
  const [stateNumber, setStateNumber] = useState(0);

  const handleUndo = () => {
    if (stateNumber > 0) {
      setBoard(timeTravel[stateNumber - 1]);
      setStateNumber(stateNumber - 1);
    }
  };
  const handleRedo = () => {
    if (timeTravel.hasOwnProperty(stateNumber + 1)) {
      setBoard(timeTravel[stateNumber + 1]);
      setStateNumber(stateNumber + 1);
    }
  };

  const value = {
    board,
    setBoard,
    timeTravel,
    setTimeTravel,
    stateNumber,
    setStateNumber,
    handleUndo,
    handleRedo,
  };

  return (
    <TimeTravelContext.Provider value={value}>
      {children}
    </TimeTravelContext.Provider>
  );
};

export { TimeTravelContext, TimeTravelContextProvider };
