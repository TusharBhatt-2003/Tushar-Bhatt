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

  // State to keep track of which text to show
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set an interval to change the text index every 1 second (adjust as needed)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textData.length);
    }, 700); // Change to 1000ms (1 second) intervals

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [textData.length]);

  // Variants for the text animation
  const textVariants = {
    initial: { opacity: 0, x: 10 }, // Start slightly below and transparent
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }, // Move to center and appear
    exit: { opacity: 0, x: -10, transition: { duration: 0.6 } }, // Move up and disappear
  };


  const { color, textColor, changeColor } = useColor(); // Destructure changeColor from context

  const handleColorChange = () => {
    const currentColorIndex = colors.findIndex(c => c.bgColor === color);
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    const { bgColor, textColor } = colors[nextColorIndex];
    changeColor(bgColor, textColor);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* AnimatePresence to animate the presence and exit of elements */}
      <AnimatePresence>
        <motion.div
          onClick={handleColorChange}
          key={currentIndex} // Use the index as the key to uniquely identify each text
          className={`absolute text-5xl elect-none drop-shadow-2xl`} // Centered text with custom font
          variants={textVariants} // Apply variants to control entry and exit animations
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
          display: 'inline-block', // Ensure inline display
          fontFamily: textData[currentIndex].font, // Set unique font for each language
          textRendering: 'optimizeLegibility'
        }}
        >
          {textData[currentIndex].text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Loader;
