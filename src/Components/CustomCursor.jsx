import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useColor } from '../context/ColorContext';
import Catcursor from '../assets/logos/catcursor';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { color, textColor } = useColor();

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.pageX, // Use pageX for scroll offset
        y: e.pageY, // Use pageY for scroll offset
      });
    };

    // Add event listener for mouse move
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const hexToRgba = (hex, alpha) => {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const colorOpacity = hexToRgba(color, 0.7);
  const textColorOpacity = hexToRgba(textColor, 0.7);

  return (
    <motion.div
      className="absolute w-12 h-12 drop-shadow-2xl pointer-events-none"
      //   style={{
      //     backgroundColor: backgroundColorWithOpacity,
      //     borderColor: textColor
      //   }}
      animate={{
        x: mousePos.x - 16, // Adjust to center the cursor on mouse position
        y: mousePos.y - 16, // Adjust to center the cursor on mouse position
        rotate: 360, // Spinning effect
      }}
      transition={{
        type: 'spring', // Smooth animation
        stiffness: 300,
        damping: 25,
        // repeat: Infinity, // Repeat the animation infinitely
        repeatType: 'loop', // Keep spinning
        duration: 0.6, // Duration of one full rotation
      }}
    >
      <Catcursor color={colorOpacity} textColor={textColorOpacity} />
    </motion.div>
  );
};

export default CustomCursor;
