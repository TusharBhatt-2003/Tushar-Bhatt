import { useState, useEffect } from 'react';

const HintPopup = ({ isVisible }) => {
  return (
    <div
      className={`select-none cursor-pointer  text-sm rounded-md px-4 py-2 transition-opacity duration-300 ${
        isVisible ? 'opacity-70' : 'opacity-0'
      }`}
    >
      Change the color theme!
    </div>
  );
};

export default HintPopup;
