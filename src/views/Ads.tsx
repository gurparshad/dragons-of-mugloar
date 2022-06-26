import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ad from "../components/ad/Ad";
import { AppRoutes } from "../utils/constants";
import { gameIdContext } from "../context/GameIdContext";
import { playerDetailsContext } from "../context/PlayerDetailsContext";
import { MugloarDragonApi } from "../api";
import "../styles/ads.css";
import Button from "../components/button/Button";
import ModalComponent from "../components/modal/ModalComponent";

type AdType = {
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
};

const Ads = () => {
  const mugloarDragonApi = new MugloarDragonApi();
  const navigate = useNavigate();
  const { gameId } = useContext(gameIdContext);
  const [ads, setAds] = useState<AdType[]>([]);
  const { playerDetails, setPlayerDetails } = useContext(playerDetailsContext);
  const [isVictoryAnimation, setVictoryAnimation] = useState<boolean>(false);
  const [confettiPieces, setConfettiPieces] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isMissionSuccess, setMissionSuccess] = useState<boolean>(false);

  const fetchData = async () => {
    const data = await mugloarDragonApi.getAds(gameId);
    setAds(data);
  };

  const handlePlay = async (adId: string) => {
    const data = await mugloarDragonApi.solveAd(gameId, adId);
    setModalOpen(true);
    const handleAnimation = () => {
      setConfettiPieces(0);
    };
    setPlayerDetails({
      ...playerDetails,
      score: data.score,
      gold: data.gold,
      lives: data.lives,
    });
    if (data.lives === 0) {
      localStorage.removeItem("gameId");
      setPlayerDetails({
        ...playerDetails,
        score: 0,
        gold: 0,
        lives: 4,
      });
      navigate(AppRoutes.HOME);
    }
    if (data.success) {
      setMissionSuccess(true);
      setVictoryAnimation(true);
      setConfettiPieces(200);
      setTimeout(handleAnimation, 2000);
    } else {
      setMissionSuccess(false);
    }
    await fetchData();
  };

  const handleGameQuit = () => {
    localStorage.removeItem("gameId");
    setPlayerDetails({
      ...playerDetails,
      score: 0,
      gold: 0,
      lives: 4,
    });
    navigate(AppRoutes.HOME);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Ads</h1>
      <Button onClick={() => navigate(AppRoutes.SHOP)} title="Shop" />
      <Button onClick={handleGameQuit} title="Quit" />
      <ModalComponent isOpen={isModalOpen}>
        {isMissionSuccess ? (
          <>
            <h4>Congrats you won</h4>
            <Button onClick={() => setModalOpen(false)} title="Continue Playing" />
          </>
        ) : (
          <>
            <h3>You Lose</h3>
            <Button title="close" onClick={() => setModalOpen(false)} />
          </>
        )}
      </ModalComponent>
      <div className="ads">
        {ads.map((ad) => (
          <Ad
            message={ad.message}
            reward={ad.reward}
            expiresIn={ad.expiresIn}
            probability={ad.probability}
            handlePlay={() => handlePlay(ad.adId)}
            isVictoryAnimation={isVictoryAnimation}
            confettiPieces={confettiPieces}
          />
        ))}
      </div>
    </div>
  );
};

export default Ads;
