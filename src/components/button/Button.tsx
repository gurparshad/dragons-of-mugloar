import React from "react";
import "./button.css";
import classNames from "classnames";

interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, className, disabled }) => {
  return (
    <button className={classNames(className, "button")} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
