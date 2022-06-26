import React from "react";
import "./button.css";
import classNames from "classnames";

interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, className }) => {
  return (
    <button className={classNames(className, "button")} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
