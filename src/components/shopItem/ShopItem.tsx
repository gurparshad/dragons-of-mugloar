import React, { useState } from "react";
import Button from "../button/Button";
import ModalComponent from "../modal/ModalComponent";
import "./shopItem.css";

interface ShopItemProps {
  id: string;
  name: string;
  cost: number;
  handleClick: () => void;
}

const ShopItem: React.FC<ShopItemProps> = ({ id, name, cost, handleClick }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className="shopItem">
      <h2>{name}</h2>
      <h3>{cost}</h3>
      <Button onClick={() => setModalOpen(true)} title="Buy" />
      <ModalComponent isOpen={isModalOpen}>
        <h4>It cost {cost} gold are you sure you want to but it.</h4>
        <Button onClick={handleClick} title="Buy now" />
        <Button onClick={() => setModalOpen(false)} title="Cancel" />
      </ModalComponent>
    </div>
  );
};

export default ShopItem;
