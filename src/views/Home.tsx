import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gameIdContext } from "../context/GameIdContext";
import { MugloarDragonApi } from "../api";
import { AppRoutes } from "../utils/constants";
import Button from "../components/button/Button";

const Home = () => {
  const mugloarDragonApi = new MugloarDragonApi();
  const navigate = useNavigate();
  const { setGameId } = useContext(gameIdContext);

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
      <div>
        <h3>Rules</h3>
        <ul>
          <li>The tasks have different difficulty level.</li>
          <li>As you will complete the tasks you will get gold.</li>
          <li>You can use the gold to purchase the items from shop that will help you in level up.</li>
          <li>Some of the task are of green color and some are of red color</li>
          <li>You might get failed in completing the red color task as they are much more difficult then green ones</li>
          <li>Earn the gold, level up the, at certain level the red cards will automatically change to green.</li>
        </ul>
      </div>
      <Button onClick={handleGameStart} title="Start Game" />
    </div>
  );
};

export default Home;
