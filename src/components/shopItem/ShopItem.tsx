import React, { useState } from "react";
import "./shopItem.css";
import Modal from "react-modal";

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
      <button onClick={() => setModalOpen(true)}>Buy</button>
      <Modal isOpen={isModalOpen} style={customStyles}>
        <button onClick={() => setModalOpen(false)}>Close</button>
        <h4>It cost {cost} gold are you sure you want to but it.</h4>
        <button onClick={handleClick}>Buy now</button>
        <button onClick={() => setModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default ShopItem;
