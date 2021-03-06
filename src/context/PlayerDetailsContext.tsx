import { createContext, useState } from "react";

interface PlayerDetails {
  score: number;
  lives: number;
  gold: number;
  level: number;
}

interface PlayerDetailsContext {
  playerDetails: PlayerDetails;
  setPlayerDetails: (value: PlayerDetails) => void;
}

export const playerDetailsContext = createContext<PlayerDetailsContext>({
  playerDetails: {
    score: 0,
    lives: 3,
    gold: 0,
    level: 0,
  },
  setPlayerDetails: () => {},
});

export const PlayerDetailsProvider = ({ children }: any) => {
  const [playerDetails, setPlayerDetails] = useState({
    score: 0,
    lives: 3,
    gold: 0,
    level: 0,
  });

  return (
    <playerDetailsContext.Provider
      value={{
        playerDetails,
        setPlayerDetails,
      }}
    >
      {children}
    </playerDetailsContext.Provider>
  );
};
