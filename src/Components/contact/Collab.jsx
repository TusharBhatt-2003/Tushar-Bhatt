import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

function Collab({ color, textColor }) {
  const instaRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      instaRefs.current,
      { opacity: 0, y: 1000 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        stagger: 0.1,
        ease: 'elastic.out(1.5, .7)',
      },
    );
  }, []);

  const hexToRgba = (hex, alpha) => {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const backgroundColorWithOpacity = hexToRgba(textColor, 0.5);

  return (
    <div
      className="collab py-5 backdrop-blur self-center mt-10 select-none paper z-0 relative overflow-hidden rounded-xl px-8 lg:px-10 lg:py-5 w-fit lg:h-fit"
      style={{ backgroundColor: backgroundColorWithOpacity, color: color }}
    >
      <h1 className="text-4xl">Collab?</h1>
      <p className="text-3xl">Let me know</p>
      <p className="text-4xl">DM me</p>
      <a
        className="text-4xl"
        href="https://www.instagram.com/_tush_ar._._/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {' _tush_ar._._'.split('').map((letter, index) => (
          <motion.span
            key={index}
            ref={(el) => (instaRefs.current[index] = el)}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 5, rotate: -10 }}
            transition={{ type: 'spring', stiffness: 100, damping: 1 }}
            className="cursor-pointer font-bold select-none"
            style={{ display: 'inline-block' }}
          >
            {letter}
          </motion.span>
        ))}
      </a>
    </div>
  );
}

export default Collab;
