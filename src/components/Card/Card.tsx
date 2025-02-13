import React from "react";

interface CardProps {
  children?: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {children}
    </div>
  );
}

export default Card;