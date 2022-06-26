import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Ads from "./views/Ads";
import Home from "./views/Home";
import Shop from "./views/Shop";
import { PlayerDetailsContext } from "./context/PlayerDetailsContext";
import { AppRoutes } from "./utils/constants";
import ProtectedRoutes from "./protectedRoutes";

const App = () => {
  const { playerDetails } = useContext(PlayerDetailsContext);
  const { score, gold, lives, level } = playerDetails;
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <h2 style={{ cursor: "pointer" }} onClick={() => navigate(AppRoutes.HOME)}>
          Dragons of Mugloar
        </h2>
        <div className="details">
          <h2>Score: {score}</h2>
          <h2>Gold: {gold}</h2>
          <h2>Lives: {lives}</h2>
          <h2>Level: {level}</h2>
        </div>
      </div>
      <div className="main">
        <Routes>
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={AppRoutes.ADS} element={<Ads />} />
            <Route path={AppRoutes.SHOP} element={<Shop />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
