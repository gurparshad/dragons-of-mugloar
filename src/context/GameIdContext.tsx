import { createContext, useState, useEffect } from "react";

export const GameIdContext = createContext({
  gameId: localStorage.getItem("gameId") ?? "",
  setGameId: (value: string) => {},
});

export const GameIdProvider = ({ children }: any) => {
  const [gameId, setGameId] = useState(localStorage.getItem("gameId") ?? "");

  return (
    <GameIdContext.Provider
      value={{
        gameId,
        setGameId,
      }}
    >
      {children}
    </GameIdContext.Provider>
  );
};
