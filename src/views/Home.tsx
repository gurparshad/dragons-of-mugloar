import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameIdContext } from "../context/GameIdContext";
import { MugloarDragonApi } from "../api";

const Home = () => {
  const mugloarDragonApi = new MugloarDragonApi();
  const navigate = useNavigate();
  const { setGameId } = useContext(GameIdContext);
  console.log("process.env.API_BASE_UR-->>", process.env.API_BASE_URL);
  const handleGameStart = async () => {
    const data = await mugloarDragonApi.startGame();
    console.log("data-->", data);
    setGameId(data.gameId);
    navigate("ads");
  };
  return (
    <div>
      <button onClick={handleGameStart}>Start game</button>
    </div>
  );
};

export default Home;
