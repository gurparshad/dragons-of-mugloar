import React from "react";
import Modal from "react-modal";

interface ModalComponentProps {
  isOpen: boolean;
  children: any;
}

const customModalStyles = {
  content: {
    width: "300px",
    height: "300px",
    margin: "auto",
    background: "black",
    padding: "20px",
    borderRadius: "20px",
  },
};

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, children }) => {
  return (
    <Modal isOpen={isOpen} style={customModalStyles}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
