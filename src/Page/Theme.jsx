import { useEffect, useState } from 'react';
import { useColor } from '../context/ColorContext';
import ThemeCardContainer from '../Components/theme/ThemeCardContainer';
import { colors } from '../data/colorData';
import Cat from '../assets/logos/cat';
import meowSound from '../assets/sounds/meow.mp3'; // Import the meow sound

const ThemePage = () => {
  const { color, textColor, changeColor } = useColor();
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeChange = (bgColor, textColor) => {
    changeColor(bgColor, textColor);
    setSelectedTheme({ bgColor, textColor });
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component loads

    // Play the meow sound when the page loads
    const audio = new Audio(meowSound);
    audio.volume = 0.03; // Set the volume to 20%
    audio.play();

    // Optional: Handle the case if the sound doesn't play due to browser restrictions
    audio.onplay = () => {
     
    };

    // Clean up if necessary (e.g., if you need to stop the sound when the component unmounts)
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset the audio to the beginning if the component is unmounted
    };
  }, []); // Empty dependency array ensures this only runs once when the page loads

  return (
    <div
      style={{ backgroundColor: color, color: textColor }}
      className="w-full h-screen lg:h-fit pt-10 flex flex-col items-center justify-between"
    >
      <h1 className="text-4xl text-center md:text-5xl mt-10 mb-8 font-['Integral']">
        Select a <br />
        Theme
      </h1>
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg font-['themeFont'] pl-20">Meow*</p>
        <Cat color={textColor} size="80" className="my-custom-class drop-shadow" />
      </div>
      <div>
        {/* Use the ThemeCardContainer component */}
        <ThemeCardContainer textColor={textColor} handleThemeChange={handleThemeChange} />
        <p className="text-xl text-center my-6 font-['themeFont']">There are {colors.length} themes available.</p>
      </div>
    </div>
  );
};

export default ThemePage;
