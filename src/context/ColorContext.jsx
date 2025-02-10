import { createContext, useContext, useState } from 'react';
import { colors } from '../data/colorData'; // Import the colors array

// Create a Color Context
const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  // Use the first color in the colors array as the initial state
  const [color, setColor] = useState(colors[0].bgColor);
  const [textColor, setTextColor] = useState(colors[0].textColor);
  const [currentColorIndex, setCurrentColorIndex] = useState(0); // Add the currentColorIndex state

  const changeColor = (bgColor, txtColor) => {
    setColor(bgColor);
    setTextColor(txtColor);
  };

  // Function to change the color and update the index
  const handleColorChange = () => {
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextColorIndex);
    const { bgColor, textColor } = colors[nextColorIndex];
    changeColor(bgColor, textColor);
  };

  return (
    <ColorContext.Provider
      value={{
        color,
        textColor,
        changeColor,
        currentColorIndex,
        handleColorChange,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook to use the ColorContext
export const useColor = () => useContext(ColorContext);
