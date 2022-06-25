import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameIdContext } from "../context/GameIdContext";

const Home = () => {
  const navigate = useNavigate();
  const { setGameId } = useContext(GameIdContext);
  const handleGameStart = async () => {
    const { data } = await axios.post("https://dragonsofmugloar.com/api/v2/game/start");
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
