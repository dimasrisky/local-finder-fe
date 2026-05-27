import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
}: PrimaryButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold tracking-wide transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
  >
    {children}
  </button>
);

export default PrimaryButton;
