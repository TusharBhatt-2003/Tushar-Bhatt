import React from 'react';
import { motion } from 'framer-motion';
import GithubIcon from '../../assets/logos/githubLogo';

const Buttons = ({ color, textColor, isHovered, setIsHovered }) => {
  return (
    <div className="w-fit btn flex gap-5">
      <motion.a
        href="#projects"
        whileHover={{
          scale: 1.1,
          color: color,
          borderColor: 'transparent',
          transition: 0.5,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className="mt-10 justify-center motion-btn flex items-center text-center border-2 rounded-lg text-xl select-none"
        style={{
          '--after-bg-col': textColor,
          borderColor: textColor,
          color: textColor,
        }}
      >
        <p className="px-3 py-2">Projects</p>
      </motion.a>
      <motion.a
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        href="https://github.com/TusharBhatt-2003"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          scale: 1.1,
          color: textColor,
          borderColor: color,
          transition: 0.5,
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className="w-fit motion-btn mt-10 px-5 flex justify-center items-center text-center border-2 rounded-lg text-xl select-none"
        style={{
          '--after-bg-col': color,
          backgroundColor: textColor,
          borderColor: color,
          color: color,
        }}
      >
        <GithubIcon color={isHovered ? textColor : color} size="32" />
        <p>GitHub</p>
      </motion.a>
    </div>
  );
};

export default Buttons;
