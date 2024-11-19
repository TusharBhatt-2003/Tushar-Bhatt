import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useColor } from '../context/ColorContext'; // Import the custom useColor hook
import HomeBTN from '../assets/logos/HomeBTN';

const HomeButton = () => {
  const navigate = useNavigate(); // Get the navigate function from useNavigate
  const { textColor } = useColor(); // Access textColor from the context

  const handleHomeClick = () => {
    navigate('/'); // Navigate to the home page when clicked
  };

  return (
    <button
      onClick={handleHomeClick}
      style={{bottom: '20px', right: '20px' }} // Position the button at the bottom-right corner
    >
      <HomeBTN color={textColor} size="40"/> {/* Pass the textColor to HomeBTN */}
    </button>
  );
};

export default HomeButton;
