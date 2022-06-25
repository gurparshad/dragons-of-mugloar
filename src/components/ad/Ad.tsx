import React, { useContext, useState } from "react";
import "./ad.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { PlayerDetailsContext } from "../../context/PlayerDetailsContext";
import Confetti from "react-confetti";
import { getGameLevelCode } from "../../utils/helpers";

interface AdProps {
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
  handlePlay: () => void;
  isVictoryAnimation: boolean;
  confettiPieces: number;
}

const customStyles = {
  content: {
    width: "200px",
    height: "200px",
    margin: "auto",
  },
};

const Ad: React.FC<AdProps> = ({
  message,
  reward,
  expiresIn,
  probability,
  handlePlay,
  adId,
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
    <div className="ad">
      <h2>{message}</h2>
      <h2>Reward: {reward}</h2>
      <h2>Dificulty: {probability}</h2>
      <h2>ExpiresIn: {expiresIn}</h2>
      <button className="playNowButton" onClick={() => handleAdClick(probability)}>
        Play now
      </button>

      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={confettiPieces}
        run={isVictoryAnimation}
        gravity={0.5}
      />
      <Modal isOpen={isModalOpen} style={customStyles}>
        <button onClick={() => setModalOpen(false)}>Close</button>
        <button>Start</button>
        {levelCode > playerDetails.level ? (
          <>
            <h3>
              You are at level {playerDetails.level} which is not sufficient for this task. We recommend to upgrade.
            </h3>
            <h3>{levelCode}</h3>
            <button onClick={() => navigate("/shop")}>Upgrade</button>
            <button onClick={handleClickPlay}>Play anyway</button>
          </>
        ) : (
          <>
            <h3>{levelCode}</h3>
            <button onClick={handleClickPlay}>Play Now</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Ad;
