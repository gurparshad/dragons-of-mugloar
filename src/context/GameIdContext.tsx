import { createContext, useState, useEffect } from "react";

export const GameIdContext = createContext({
  gameId: "",
  setGameId: (value: string) => {},
});

export const GameIdProvider = ({ children }: any) => {
  const [gameId, setGameId] = useState("");

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
