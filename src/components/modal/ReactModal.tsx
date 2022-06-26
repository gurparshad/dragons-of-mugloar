import React from "react";
import Modal from "react-modal";

interface ReactModalProps {
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

const ReactModal: React.FC<ReactModalProps> = ({ isOpen, children }) => {
  return (
    <Modal isOpen={isOpen} style={customModalStyles}>
      {children}
    </Modal>
  );
};

export default ReactModal;
