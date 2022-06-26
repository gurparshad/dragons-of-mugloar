import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopItem from "../components/shopItem/ShopItem";
import { gameIdContext } from "../context/GameIdContext";
import { playerDetailsContext } from "../context/PlayerDetailsContext";
import { MugloarDragonApi } from "../api";
import { AppRoutes } from "../utils/constants";
import "../styles/shop.css";
import Button from "../components/button/Button";

type ShopItemType = {
  id: string;
  name: string;
  cost: number;
};

const Shop = () => {
  const mugloarDragonApi = new MugloarDragonApi();
  const { gameId } = useContext(gameIdContext);
  const { playerDetails, setPlayerDetails } = useContext(playerDetailsContext);
  const [shopItems, setShopItems] = useState<ShopItemType[]>([]);
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
      <Button onClick={() => navigate(AppRoutes.ADS)} title="Back to playground" />
      <div className="shopItems">
        {shopItems.map((item) => (
          <ShopItem id={item.id} name={item.name} cost={item.cost} handleClick={() => handleItemPurchase(item.id)} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
