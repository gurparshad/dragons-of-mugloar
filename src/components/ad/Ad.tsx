import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerDetailsContext } from "../../context/PlayerDetailsContext";
import Confetti from "react-confetti";
import { getGameLevelCode } from "../../utils/helpers";
import { AppRoutes } from "../../utils/constants";
import Button from "../button/Button";
import ModalComponent from "../modal/ModalComponent";
import "./ad.css";

interface AdProps {
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
  handlePlay: () => {};
  isVictoryAnimation: boolean;
  confettiPieces: number;
}

const Ad: React.FC<AdProps> = ({
  message,
  reward,
  expiresIn,
  probability,
  handlePlay,
  isVictoryAnimation,
  confettiPieces,
}) => {
  const navigate = useNavigate();
  const { playerDetails } = useContext(PlayerDetailsContext);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [levelCode, setLevelCode] = useState<number>(0);

  const handleAdClick = (probability: string) => {
    setModalOpen(true);
    //@ts-ignore
    setLevelCode(getGameLevelCode(probability));
  };

  const handleClickPlay = () => {
    setModalOpen(false);
    handlePlay();
  };

  return (
    // @ts-ignore
    <div className="ad" style={{ background: playerDetails.level < getGameLevelCode(probability) ? "red" : "green" }}>
      <h2>{message}</h2>
      <h2>Reward: {reward}</h2>
      <h2>Difficulty: {probability}</h2>
      <h2>ExpiresIn: {expiresIn}</h2>
      <Button onClick={() => handleAdClick(probability)} title="Play now" />
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={confettiPieces}
        run={isVictoryAnimation}
        gravity={0.5}
      />
      <ModalComponent isOpen={isModalOpen}>
        <Button onClick={() => setModalOpen(false)} title="Close" />
        {levelCode > playerDetails.level ? (
          <>
            <h3>
              You are at level {playerDetails.level} which is not sufficient for this task. We recommend to upgrade.
            </h3>
            <Button onClick={() => navigate(AppRoutes.SHOP)} title="Upgrade" />
            <Button onClick={handleClickPlay} title="Play anyway" />
          </>
        ) : (
          <>
            <Button onClick={handleClickPlay} title="Play Now" />
          </>
        )}
      </ModalComponent>
    </div>
  );
};

export default Ad;
