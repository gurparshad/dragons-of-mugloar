import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "./utils/constants";

const ProtectedRoutes = () => {
  const gameId = localStorage.getItem("gameId");
  return gameId ? <Outlet /> : <Navigate to={AppRoutes.HOME} />;
};

export default ProtectedRoutes;
