import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useColor } from '../context/ColorContext';
import { colors } from '../data/colorData'; // Import colors array
import '../css/welcome.css';

const Loader = () => {
  const textData = [
    { text: 'タシャール', font: 'Rampart One' },
    { text: '투샤르', font: 'Single Day' },
    { text: 'तुषार', font: 'Kalam' },
    { text: 'TUSHAR', font: 'Bagel Fat One' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const { color, textColor } = useColor();

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textData.length);
    }, 750);

    const percentageInterval = setInterval(() => {
      setLoadingPercentage((prevPercentage) => {
        if (prevPercentage >= 100) {
          clearInterval(percentageInterval);
          return 100;
        }
        return prevPercentage + 1;
      });
    }, 28);

    return () => {
      clearInterval(textInterval);
      clearInterval(percentageInterval);
    };
  }, [textData.length]);

  const textVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.6 } },
  };

  const currentColorIndex = Math.floor(
    (loadingPercentage / 100) * (colors.length - 1),
  );
  const loadingTextColor = colors[currentColorIndex].textColor;

  return (
    <div
      className="flex flex-col justify-center items-center h-[100dvh]"
      style={{ backgroundColor: color }}
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className={`absolute w-fit top-50 text-5xl md:text-7xl drop-shadow-2xl select-none`}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          translate="no"
          style={{
            color: textColor,
            display: 'inline-block',
            fontFamily: textData[currentIndex].font,
            textRendering: 'optimizeLegibility',
          }}
        >
          {textData[currentIndex].text}
        </motion.div>
        <div className="w-1/2 lg:w-1/4 h-2 mt-32 rounded-3xl overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${loadingPercentage}%` }}
            transition={{ duration: 0.2, ease: 'linear' }}
            className="h-full"
            style={{ backgroundColor: loadingTextColor }}
          />
        </div>
      </AnimatePresence>
      {/* Loading bar */}

      <motion.div
        initial={{ opacity: 0.3, y: 0 }}
        animate={{ opacity: 0.5, y: 0, transition: { duration: 4 } }}
        className="text-3xl lg:text-7xl flex font-['Bigger'] absolute bottom-2 md:right-5 mt-10 text-center select-none"
        style={{
          color: loadingTextColor,
        }}
      >
        <h1
          className="pr-2 uppercase"
          style={{
            color: textColor,
            opacity: 1,
          }}
        >
          Loading
        </h1>
        {loadingPercentage}%
      </motion.div>
    </div>
  );
};

export default Loader;
