import React from 'react';
import Cat from '../assets/logos/cat';
import { useColor } from '../context/ColorContext';
const CatGame = () => {
  const { color, textColor, changeColor } = useColor();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Cat color={textColor} size="80" className="my-custom-class drop-shadow" />
      {/* Add the actual cat game logic here */}
    </div>
  );
};

export default CatGame;
