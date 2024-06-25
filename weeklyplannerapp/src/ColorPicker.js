import React from 'react';
import './ColorPicker.css';  // Assuming styles are defined here

const ColorPicker = ({ selectedColor, onChangeColor }) => {
  const colors = ['#e1bee7', '#ffcdd2', '#c8e6c9', '#bbdefb', '#fff9c4', '#d7ccc8'];

  return (
    <div className="color-picker">
      {colors.map(color => (
        <button
          key={color}
          className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onChangeColor(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
