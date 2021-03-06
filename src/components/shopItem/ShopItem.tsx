import React, { useState, useContext } from "react";
import Button from "../button/Button";
import ReactModal from "../modal/ReactModal";
import { playerDetailsContext } from "../../context/PlayerDetailsContext";
import "./shopItem.css";

interface ShopItemProps {
  id: string;
  name: string;
  cost: number;
  handleClick: () => void;
}

const ShopItem: React.FC<ShopItemProps> = ({ name, cost, handleClick }) => {
  const { playerDetails } = useContext(playerDetailsContext);
  const handleShopItemClick = () => {
    handleClick();
    setModalOpen(false);
  };
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className="shopItem">
      <h2>{name}</h2>
      <h3>Gold: {cost}</h3>
      <Button onClick={() => setModalOpen(true)} title="Buy" disabled={playerDetails.gold < cost} />
      <ReactModal isOpen={isModalOpen}>
        <h4>It cost {cost} gold are you sure you want to but it.</h4>
        <Button onClick={handleShopItemClick} title="Buy now" />
        <Button onClick={() => setModalOpen(false)} title="Cancel" />
      </ReactModal>
    </div>
  );
};

export default ShopItem;
