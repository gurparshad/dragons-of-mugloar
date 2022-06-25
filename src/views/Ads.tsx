import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ad from "../components/ad/Ad";
import { Levels } from "../utils/constants";
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
  const navigate = useNavigate();
  const { gameId } = useContext(GameIdContext);
  const [ads, setAds] = useState<Ad[]>([]);
  const { playerDetails, setPlayerDetails } = useContext(PlayerDetailsContext);
  const [isVictoryAnimation, setVictoryAnimation] = useState<boolean>(false);
  const [confettiPieces, setConfettiPieces] = useState<number>(0);

  const fetchData = async () => {
    const { data } = await axios.get(`https://dragonsofmugloar.com/api/v2/${gameId}/messages`);
    setAds(data);
  };

  const handlePlay = async (adId: string) => {
    const { data } = await axios.post(`https://dragonsofmugloar.com/api/v2/${gameId}/solve/${adId}`);
    const handleAnimation = () => {
      setConfettiPieces(0);
    };
    setPlayerDetails({
      ...playerDetails,
      score: data.score,
      gold: data.gold,
      lives: data.lives,
    });
    if (data.success) {
      setVictoryAnimation(true);
      setConfettiPieces(500);
      setTimeout(handleAnimation, 3000);
    }
    await fetchData();
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
          message={ad.message}
          reward={ad.reward}
          expiresIn={ad.expiresIn}
          probability={ad.probability}
          handlePlay={() => handlePlay(ad.adId)}
          adId={ad.adId}
          isVictoryAnimation={isVictoryAnimation}
          confettiPieces={confettiPieces}
        />
      ))}
    </div>
  );
};

export default Ads;
