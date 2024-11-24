import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable'; // Import the Draggable component
import Cat from '../../../assets/logos/cat';
import { useColor } from '../../../context/ColorContext';

const DraggableCat = ({ position, onPositionChange }) => {
  const { color, textColor, changeColor } = useColor();

  const catWidth = 80; // The width of the cat image (adjust as needed)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Initialize with window's innerWidth

  // Calculate screen width on mount and resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDragStop = (e, data) => {
    // Update position on drag stop
    if (onPositionChange) {
      onPositionChange(data.x); // Pass new x position to parent
    }
  };

  return (
    <>
      <Draggable
        axis="x" // Restrict dragging to the X axis (horizontal)
        bounds={{
          left: 0, // Prevent the cat from going to the left of the screen
          right: screenWidth - catWidth, // Prevent the cat from going past the right edge
        }}
        // Use the passed position prop for horizontal position
        onStop={handleDragStop} // Trigger position update when dragging stops
      >
        <div className="drop-shadow mb-5">
          <Cat
            color={textColor}
            size={catWidth}
            position={{ x: position, y: 0 }}
          />
        </div>
      </Draggable>
    </>
  );
};

export default DraggableCat;
