import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useColor } from '../context/ColorContext';
import { colors } from '../data/colorData';
import { motion } from 'framer-motion';
import { T } from '../const';

const ThemePage = () => {
  const { color, textColor, changeColor } = useColor();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Scroll to the top of the page when the component loads
    window.scrollTo(0, 0);

    // GSAP animation for card elements
    gsap.fromTo(
      cardRefs.current,
      { opacity: 1, y: 800, scale: 0 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 5,
        stagger: 0.08,
        ease: 'elastic.out(1.2, 0.3)',
      },
    );
  }, []);

  const handleThemeChange = (bgColor, textColor) => {
    changeColor(bgColor, textColor);
    setSelectedTheme({ bgColor, textColor });
  };

  return (
    <div
      style={{ backgroundColor: color, color: textColor }}
      className="w-full h-screen lg:h-fit pt-10 flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl text-center md:text-5xl mt-10 mb-8 font-['Integral']">
        Select a <br />
        Theme
      </h1>
      <p className="text-xl mb-6 font-['themeTUSHAR']">There are {colors.length} themes available.</p>

      {/* Ensure the container can scroll */}
        <div className="grid grid-cols-3 lg:grid-cols-4  overflow-scroll hide-scrollbar h-[50vh] lg:h-fit border-2"
         style={{
         borderColor: textColor,
      }}
        >
          {colors.map((theme, index) => (
            <motion.div
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 5,
                ease: 'easeOut',
              }}
              ref={(el) => (cardRefs.current[index] = el)}
              key={index}
              className="flex shadow w-[25vw] lg:w-[20vw] lg:h-[20vh] flex-col items-center justify-center py-6 px-7"
              style={{
                borderColor: theme.textColor,
                backgroundColor: theme.bgColor,
                color: theme.textColor,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={() => handleThemeChange(theme.bgColor, theme.textColor)}
            >
              <p
                className="text-xl lg:text-5xl font-extrabold border-b-2 pb-1 font-['themeTUSHAR']"
                style={{
                  borderColor: theme.textColor,
                }}
              >
                {T}
              </p>
              <div className="mt-1 md:flex gap-1">
                <p className="text-xs lg:text-lg font-['themeFont']">FrontEnd</p>
                <p className="text-xs lg:text-lg font-['themeFont']">developer</p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ThemePage;
