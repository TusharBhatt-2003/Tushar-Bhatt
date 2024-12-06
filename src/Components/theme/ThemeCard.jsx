// src/components/ThemeCard.jsx
import { motion } from 'framer-motion';
import { T } from '../../const';
const ThemeCard = ({ theme, index, handleThemeChange, cardRef }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.9 }}
      whileTap={{ scale: 0.5 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 5,
        ease: 'easeOut',
      }}
      ref={cardRef}
      key={index}
      className="flex z-[999] rounded-3xl  p-7 h-fit lg:w-[10vw] lg:h-[10vh] flex-col items-center justify-center lg:py-6 lg:px-7 lg:rounded-xl"
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
        className="text-xl lg:text-2xl font-extrabold border-b-2 font-['themeTUSHAR']"
        style={{
          borderColor: theme.textColor,
        }}
      >
        {T}
      </p>
      {/* <div className="mt-1 md:flex gap-1">
        <p className="text-xs lg:text-lg font-['themeFont']">FrontEnd</p>
        <p className="text-xs lg:text-lg font-['themeFont']">developer</p>
      </div> */}
    </motion.div>
  );
};

export default ThemeCard;
