import React from 'react';
import HintPopup from './popUps/HintPopup';
import { motion } from 'framer-motion';
const Hero = ({
  currentLanguage,
  translations,
  letterRefs,
  handleColorChange,
  showHint,
  setShowHint,
  textColor,
}) => {
  return (
    <>
      <div className="md:ml-10 w-fit lg:w-full flex flex-col justify-center lg:items-start items-center">
        <h1 className="text-5xl lg:text-6xl font-bold font-['Bright'] drop-shadow-2xl">
          Hey There!
        </h1>
        <h1 className="text-4xl lg:text-5xl mt-7 md:mt-5 drop-shadow-2xl">
          I'm{' '}
          {translations[currentLanguage].text
            .split(currentLanguage === 'hindi' ? ' ' : '')
            .map((letter, index) => (
              <motion.span
                ref={(el) => (letterRefs.current[index] = el)}
                key={index}
                className="cursor-pointer text-4xl lg:text-6xl font-bold select-none hover:drop-shadow-2xl"
                style={{
                  display: 'inline-block',
                  fontFamily: translations[currentLanguage].font,
                }}
                onClick={handleColorChange}
                onMouseEnter={() => setShowHint(true)}
                onMouseLeave={() => setShowHint(false)}
                whileHover={{ scale: 1.2, rotate: 3 }} // Slight rotation for emphasis
                whileTap={{ scale: 1.4, rotate: -10 }}
                translate="no"
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                }}
              >
                {letter}
              </motion.span>
            ))}
        </h1>
        <HintPopup isVisible={showHint} />
        <p className="text-xl lg:text-3xl font-light drop-shadow-2xl">
          A Frontend Developer
        </p>
      </div>
    </>
  );
};

export default Hero;
