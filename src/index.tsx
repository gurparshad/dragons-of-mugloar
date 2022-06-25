import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GameIdProvider } from "./context/GameIdContext";
import { PlayerDetailsProvider } from "./context/PlayerDetailsContext";
require("dotenv").config();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GameIdProvider>
        <PlayerDetailsProvider>
          <App />
        </PlayerDetailsProvider>
      </GameIdProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
