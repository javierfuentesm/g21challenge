import React from "react";

interface CTAButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

function CTAButton({ onClick, text, disabled }: CTAButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default CTAButton;