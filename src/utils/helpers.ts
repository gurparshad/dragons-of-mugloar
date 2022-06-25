import { Levels } from "./constants";

export const getGameLevelCode = (probability: string) => {
    // replace it with foreach
    for (let i = 0; i < Levels.length; i++) {
      if (Levels[i].probability === probability) {
        return Levels[i].value;
      }
    }
    return
  };