import React from "react";
import "./shopItem.css";

interface ShopItemProps {
  id: string;
  name: string;
  cost: number;
  handleClick: () => void;
}

const ShopItem: React.FC<ShopItemProps> = ({ id, name, cost, handleClick }) => {
  return (
    <div className="shopItem">
      <h2>{name}</h2>
      <h3>{cost}</h3>
      <button onClick={handleClick}>Buy</button>
    </div>
  );
};

export default ShopItem;
