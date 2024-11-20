// src/components/ThemeCardContainer.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { colors } from '../../data/colorData';
import ThemeCard from './ThemeCard';


const ThemeCardContainer = ({ textColor, handleThemeChange }) => {
  const cardRefs = useRef([]);

  // GSAP animation for card elements
  useEffect(() => {
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, x: 1000, scale: 0 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 5,
        stagger: 0.08,
        ease: 'elastic.out(1.1, 1)',
      }
    );
  }, []);

  return (
    <div
      className="flex lg:grid lg:grid-cols-4 overflow-auto hide-scrollbar w-[99vw] lg:w-fit h-fit gap-2 border-b pb-2"
      style={{
        borderColor: textColor,
      }}
    >
      {colors.map((theme, index) => (
        <ThemeCard
          key={index}
          index={index}
          theme={theme}
          handleThemeChange={handleThemeChange}
          cardRef={(el) => (cardRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default ThemeCardContainer;
