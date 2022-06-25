import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ShopItem from "../components/shopItem/ShopItem";
import { GameIdContext } from "../context/GameIdContext";
import { PlayerDetailsContext } from "../context/PlayerDetailsContext";

interface ShopItem {
  id: string;
  name: string;
  cost: number;
}

const Shop = () => {
  const { gameId } = useContext(GameIdContext);
  const { playerDetails, setPlayerDetails } = useContext(PlayerDetailsContext);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  const handleItemPurchase = async (itemId: string) => {
    const { data } = await axios.post(`https://dragonsofmugloar.com/api/v2/${gameId}/shop/buy/${itemId}`);
    if (data.shoppingSuccess) {
      setPlayerDetails({
        ...playerDetails,
        level: data.level,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`https://dragonsofmugloar.com/api/v2/${gameId}/shop`);
      setShopItems(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>this is shop</h1>
      {shopItems.map((item) => (
        <ShopItem id={item.id} name={item.name} cost={item.cost} handleClick={() => handleItemPurchase(item.id)} />
      ))}
    </div>
  );
};

export default Shop;
