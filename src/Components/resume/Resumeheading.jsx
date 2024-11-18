import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Heading = ({ text, textColor }) => {
  const letterRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            letterRefs.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              stagger: 0.1,
              ease: 'elastic.out(1, 0.3)',
            },
          );
        }
      },
      { threshold: 0.5 },
    );

    return () => observer.disconnect();
  }, []);

  return (
    <h1 className="mb-5 text-4xl lg:text-6xl font-bold font-['Integral']">
      {text.split('').map((letter, index) => (
        <motion.span
          ref={(el) => (letterRefs.current[index] = el)}
          key={index}
          className="cursor-pointer font-bold mb-5"
          style={{
            display: 'inline-block',
            marginRight: letter === ' ' ? '1rem' : '0',
            color: textColor,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </h1>
  );
};

export default Heading;
