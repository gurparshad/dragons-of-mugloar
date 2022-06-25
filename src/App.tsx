import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Ads from "./views/Ads";
import Home from "./views/Home";
import Shop from "./views/Shop";
import { PlayerDetailsContext } from "./context/PlayerDetailsContext";

const App = () => {
  const { playerDetails } = useContext(PlayerDetailsContext);
  const { score, gold, lives, level } = playerDetails;
  return (
    <>
      <div className="header">
        <h2>Dragon of Mugloar</h2>
        <div className="details">
          <h2>Score: {score}</h2>
          <h2>Gold: {gold}</h2>
          <h2>Lives: {lives}</h2>
          <h2>Level: {level}</h2>
        </div>
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
