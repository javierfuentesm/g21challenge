import React from "react";

interface RadioItem {
  id: number;
  value: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface RadioButtonsProps {
  items: Array<RadioItem>;
}

function RadioButtons({ items }: RadioButtonsProps): JSX.Element {
  return (
    <div>
      {items.map((item) => (
        <label key={item.id}>
          <input
            type="radio"
            name="radio"
            value={item.value}
            onChange={item.onChange}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
}

export default RadioButtons;