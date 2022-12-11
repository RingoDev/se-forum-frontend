import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<Props> = ({ children, onClick, className }) => {
  return (
    <button
      className={"hover:bg-gray-400 rounded p-2 " + className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
