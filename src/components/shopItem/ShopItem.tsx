import React, { useState } from "react";
import "./shopItem.css";
import Modal from "react-modal";
import Button from "../button/Button";

interface ShopItemProps {
  id: string;
  name: string;
  cost: number;
  handleClick: () => void;
}

const customStyles = {
  content: {
    width: "200px",
    height: "200px",
    margin: "auto",
  },
};

const ShopItem: React.FC<ShopItemProps> = ({ id, name, cost, handleClick }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className="shopItem">
      <h2>{name}</h2>
      <h3>{cost}</h3>
      <Button onClick={() => setModalOpen(true)} title="Buy" />
      <Modal isOpen={isModalOpen} style={customStyles}>
        <Button onClick={() => setModalOpen(false)} title="Close" />
        <h4>It cost {cost} gold are you sure you want to but it.</h4>
        <Button onClick={handleClick} title="Buy now" />
        <Button onClick={() => setModalOpen(false)} title="Cancel" />
      </Modal>
    </div>
  );
};

export default ShopItem;
