import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameIdContext } from "../context/GameIdContext";
import { MugloarDragonApi } from "../api";
import { AppRoutes } from "../utils/constants";

const Home = () => {
  const mugloarDragonApi = new MugloarDragonApi();
  const navigate = useNavigate();
  const { setGameId } = useContext(GameIdContext);
  const handleGameStart = async () => {
    const data = await mugloarDragonApi.startGame();
    setGameId(data.gameId);
    navigate(AppRoutes.ADS);
  };
  return (
    <div>
      <button onClick={handleGameStart}>Start game</button>
    </div>
  );
};

export default Home;
