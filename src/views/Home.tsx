import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameIdContext } from "../context/GameIdContext";
import { MugloarDragonApi } from "../api";
import { AppRoutes } from "../utils/constants";
import Button from "../components/button/Button";

const Home = () => {
  const mugloarDragonApi = new MugloarDragonApi();
  const navigate = useNavigate();
  const { setGameId } = useContext(GameIdContext);

  useEffect(() => {
    const gameId = localStorage.getItem("gameId");
    if (gameId) {
      navigate(AppRoutes.ADS);
    }
  }, []);

  const handleGameStart = async () => {
    const data = await mugloarDragonApi.startGame();
    setGameId(data.gameId);
    localStorage.setItem("gameId", data.gameId);
    navigate(AppRoutes.ADS);
  };
  return (
    <div>
      <h1>Are you ready to play? Click the button below to start the game</h1>
      <Button onClick={handleGameStart} title="Start Game" />
    </div>
  );
};

export default Home;
