import { motion } from 'framer-motion';
import { useRef } from 'react';

const ProjectTitle = ({ text, textColor }) => {
  const letterRefs = useRef([]);

  return (
    <h1
      className="mt-10 lg:-mt-5 lg:w-1/6 text-6xl lg:text-8xl flex lg:flex-col justify-center lg:leading-[4.3rem] font-extrabold transition-colors duration-500 ease-in-out"
      style={{ color: textColor, transition: 'color 2s ease-in-out' }}
    >
      {text.split('').map((item, index) => (
        <motion.span
          transition={{ type: 'spring', stiffness: 900, damping: 5 }}
          whileHover={{ scale: 1.2, rotate: -9 }}
          whileTap={{ scale: 0.9, rotate: 9 }}
          ref={(el) => (letterRefs.current[index] = el)}
          key={index}
          className="lg:text-left text-center drop-shadow cursor-pointer font-['Integral'] select-none hover:drop-shadow-2xl"
        >
          {item}
        </motion.span>
      ))}
    </h1>
  );
};

export default ProjectTitle;
