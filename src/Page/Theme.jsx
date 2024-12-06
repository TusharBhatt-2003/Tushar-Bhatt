import { useEffect, useState } from 'react';
import { useColor } from '../context/ColorContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ThemeCardContainer from '../Components/theme/ThemeCardContainer';
import { colors } from '../data/colorData';
import Cat from '../assets/logos/cat';
import meowSound from '../assets/sounds/meow.mp3'; // Import the meow sound

const ThemePage = () => {
  const { color, textColor, changeColor } = useColor();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [clickCount, setClickCount] = useState(0); // State to track the number of clicks
  const navigate = useNavigate(); // Hook to navigate to a new page

  // Function to handle theme change
  const handleThemeChange = (bgColor, textColor) => {
    changeColor(bgColor, textColor);
    setSelectedTheme({ bgColor, textColor });
  };

  // Function to handle cat click
  const handleCatClick = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 6) {
        navigate('/cat-game'); // Navigate to the cat game after 6 clicks
      }
      return newCount;
    });
  };

  // Effect to play the meow sound when the page loads
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component loads

    // Play the meow sound when the page loads
    const audio = new Audio(meowSound);
    audio.volume = 0.03; // Set the volume to a low level (3%)
    audio.play();

    // Optional: Handle the case if the sound doesn't play due to browser restrictions
    audio.onplay = () => {
      // Do something when the sound starts playing, if needed
    };

    // Cleanup if necessary (e.g., if you need to stop the sound when the component unmounts)
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset the audio to the beginning if the component is unmounted
    };
  }, []); // Empty dependency array ensures this only runs once when the page loads

  return (
    <div
      style={{ backgroundColor: color, color: textColor }}
      className="w-full h-screen  pt-10 flex flex-col items-center justify-around lg:justify-normal"
    >
      <h1 className="text-4xl text-center md:text-5xl mt-10 mb-8 font-['Integral']">
        Select a <br />
        Theme
      </h1>
      <div className="lg:flex-row-reverse gap-10 lg:flex items-center justify-around lg:w-full">
        <div
          className="flex flex-col items-center justify-center cursor-pointer my-10"
          onClick={handleCatClick} // Add onClick handler for the cat click
        >
          <p className="pl-20">Meow*</p>
          <Cat
            color={textColor}
            size="80"
            className="my-custom-class drop-shadow"
          />
          <p className="text-xl text-center my-6 font-['themeFont']">
            There are {colors.length} themes available.
          </p>
        </div>
        <div className="">
          {/* Use the ThemeCardContainer component */}
          <ThemeCardContainer
            textColor={textColor}
            handleThemeChange={handleThemeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemePage;
