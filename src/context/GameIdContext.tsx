import { createContext, useState } from "react";

interface GameIdContext {
  gameId: string;
  setGameId: (value: string) => void;
}

export const gameIdContext = createContext<GameIdContext>({
  gameId: localStorage.getItem("gameId") ?? "",
  setGameId: (value: string) => {},
});

export const GameIdProvider = ({ children }: any) => {
  const [gameId, setGameId] = useState(localStorage.getItem("gameId") ?? "");

  return (
    <gameIdContext.Provider
      value={{
        gameId,
        setGameId,
      }}
    >
      {children}
    </gameIdContext.Provider>
  );
};
