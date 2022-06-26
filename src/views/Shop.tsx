import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopItem from "../components/shopItem/ShopItem";
import { GameIdContext } from "../context/GameIdContext";
import { PlayerDetailsContext } from "../context/PlayerDetailsContext";
import { MugloarDragonApi } from "../api";
import { AppRoutes } from "../utils/constants";

interface ShopItem {
  id: string;
  name: string;
  cost: number;
}

const Shop = () => {
  const mugloarDragonApi = new MugloarDragonApi();
  const { gameId } = useContext(GameIdContext);
  const { playerDetails, setPlayerDetails } = useContext(PlayerDetailsContext);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const navigate = useNavigate();

  const handleItemPurchase = async (itemId: string) => {
    const data = await mugloarDragonApi.purchaseItem(gameId, itemId);
    if (data.shoppingSuccess) {
      setPlayerDetails({
        ...playerDetails,
        level: data.level,
        gold: data.gold,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await mugloarDragonApi.shop(gameId);
      setShopItems(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>this is shop</h1>
      <button onClick={() => navigate(AppRoutes.ADS)}>Back to playground</button>
      {shopItems.map((item) => (
        <ShopItem id={item.id} name={item.name} cost={item.cost} handleClick={() => handleItemPurchase(item.id)} />
      ))}
    </div>
  );
};

export default Shop;
