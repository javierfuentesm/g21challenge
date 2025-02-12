import React from "react";

interface CardProps {
  children?: React.ReactNode;
}

function Card({ children }: CardProps) {
  return <div>{children}</div>;
}

export default Card;