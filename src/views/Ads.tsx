import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ad from "../components/ad/Ad";
import { Levels } from "../constants";
import { GameIdContext } from "../context/GameIdContext";
import { PlayerDetailsContext } from "../context/PlayerDetailsContext";

interface Ad {
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  probability: string;
}

const Ads = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { gameId } = useContext(GameIdContext);
  const [ads, setAds] = useState<Ad[]>([]);
  const [levelCode, setLevelCode] = useState<number>(0);
  const { playerDetails, setPlayerDetails } = useContext(PlayerDetailsContext);
  const [isVictoryAnimation, setVictoryAnimation] = useState<boolean>(false);
  const [confettiPieces, setConfettiPieces] = useState<number>(0);

  const fetchData = async () => {
    const { data } = await axios.get(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`);
    setAds(data);
  };

  const handlePlay = async (ad: Ad) => {
    console.log("inside handle play");
    console.log("adId-->>", ad);
    const { data } = await axios.post(`https://dragonsofmugloar.com/api/v2/${gameId}/solve/${ad.adId}`);
    console.log("data-->>", data);
    const handleAnimation = () => {
      setConfettiPieces(0);
    };
    if (data.success) {
      setVictoryAnimation(true);
      setConfettiPieces(1000);
      setTimeout(handleAnimation, 5000);
    }
    setPlayerDetails({
      ...playerDetails,
      score: data.score,
      gold: data.gold,
      lives: data.lives,
    });
  };

  const getGameLevelCode = (probability: string) => {
    // replace it with foreach
    for (let i = 0; i < Levels.length; i++) {
      if (Levels[i].probability === probability) {
        setLevelCode(Levels[i].value);
      }
    }
    return;
  };

  const handleAdClick = (ad: Ad) => {
    setModalOpen(true);
    getGameLevelCode(ad.probability);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Ads</h1>
      <button onClick={() => navigate("/shop")}>Shop</button>
      <button onClick={fetchData}>Load more</button>
      {ads.map((ad) => (
        <Ad
          handleClick={() => handleAdClick(ad)}
          message={ad.message}
          reward={ad.reward}
          expiresIn={ad.expiresIn}
          probability={ad.probability}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          levelCode={levelCode}
          handlePlay={() => handlePlay(ad)}
        />
      ))}
    </div>
  );
};

export default Ads;
