import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useColor } from "../context/ColorContext";
import { colors } from '../data/colorData'; // Import colors array
import '../css/welcome.css';

const Loader = () => {
  // Text data for each language with associated font styles
  const textData = [
    { text: "タシャール", font: "Rampart One" },
    { text: "투샤르", font: "Single Day" },
    { text: "तुषार", font: "Kalam" },
    { text: "TUSHAR", font: "Bagel Fat One" },
  ];

  // State to keep track of which text to show and the loading percentage
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const { color, textColor } = useColor();

  useEffect(() => {
    // Interval to change the text index every 700ms
    const textInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textData.length);
    }, 750);

    // Interval to update the loading percentage
    const percentageInterval = setInterval(() => {
      setLoadingPercentage((prevPercentage) => {
        if (prevPercentage >= 100) {
          clearInterval(percentageInterval);
          return 100;
        }
        return prevPercentage + 1; // Increment by 1%
      });
    }, 28); // Adjust the duration to control speed (28ms to reach 100% in approx 3 seconds)

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(textInterval);
      clearInterval(percentageInterval);
    };
  }, [textData.length]);

  // Variants for the text animation
  const textVariants = {
    initial: { opacity: 0, x: 10 }, // Start slightly to the right and transparent
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }, // Move to center and appear
    exit: { opacity: 0, x: -10, transition: { duration: 0.6 } }, // Move to left and disappear
  };

  // Calculate current color index based on loading percentage
  const currentColorIndex = Math.floor((loadingPercentage / 100) * (colors.length - 1));
  const loadingTextColor = colors[currentColorIndex].textColor; // Get text color based on percentage

  return (
    <div className="flex flex-col justify-center items-center h-screen"
         style={{ backgroundColor:  color }} // Set background color
    >
      {/* AnimatePresence to animate the presence and exit of elements */}
      <AnimatePresence>
        <motion.div
          onClick={() => { }} // Placeholder click function
          key={currentIndex} // Use the index as the key to uniquely identify each text
          className={`absolute top-50 text-5xl md:text-7xl drop-shadow-2xl select-none`} // Centered text with custom font
          variants={textVariants} // Apply variants to control entry and exit animations
          initial="initial"
          animate="animate"
          exit="exit"
          translate="no"
          style={{
            color: textColor, // Set loading text color based on percentage
            display: 'inline-block', // Ensure inline display
            fontFamily: textData[currentIndex].font, // Set unique font for each language
            textRendering: 'optimizeLegibility',
          }}
        >
          {textData[currentIndex].text}
        </motion.div>
      </AnimatePresence>

      {/* Display the loading percentage below or alongside the text */}
      
      <motion.div
        initial={{ opacity: 0, y: 0 }} // Start slightly below and transparent
        animate={{ opacity: 1, y: 0, transition: { duration: 4 } }} // Move to center and appear
        className="text-7xl lg:text-7xl flex font-['round'] absolute bottom-2 md:right-5 mt-10 text-center select-none" // Margin-top and text size
        style={{
          color: loadingTextColor, // Change the color of the loading percentage text
          opacity: 1, // Decrease the opacity of the percentage text
        }}
      >
      <h1 
      className='pr-2' 
      style={{
          color: textColor, // Change the color of the loading percentage text
          opacity: 1, // Decrease the opacity of the percentage text
        }}
      >Loading</h1>
      {loadingPercentage}%
      </motion.div>
    </div>
  );
};

export default Loader;
