import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {children}
    </div>
  );
}

export default Container;