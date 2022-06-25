import React, { useContext, useState } from "react";
import "./ad.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { PlayerDetailsContext } from "../../context/PlayerDetailsContext";
import Confetti from "react-confetti";

interface AdProps {
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
  handleClick: () => void;
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  levelCode: number;
  handlePlay: () => void;
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
  handleClick,
  isModalOpen,
  setModalOpen,
  levelCode,
  handlePlay,
}) => {
  const navigate = useNavigate();
  const { playerDetails, setPlayerDetails } = useContext(PlayerDetailsContext);
  const [isVictoryAnimation, setVictoryAnimation] = useState<boolean>(false);
  const [confettiPieces, setConfettiPieces] = useState<number>(0);

  return (
    <div className="ad">
      <h2>{message}</h2>
      <h2>Reward: {reward}</h2>
      <h2>Dificulty: {probability}</h2>
      <h2>ExpiresIn: {expiresIn}</h2>
      <button className="playNowButton" onClick={handleClick}>
        Play now
      </button>

      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={confettiPieces}
        run={isVictoryAnimation}
        gravity={0.2}
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
            <button onClick={handlePlay}>Play anyway</button>
          </>
        ) : (
          <>
            <h3>{levelCode}</h3>
            <button onClick={handlePlay}>Play Now</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Ad;
