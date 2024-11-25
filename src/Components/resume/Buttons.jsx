import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buttonData } from '../../const';
import { motion } from 'framer-motion';
gsap.registerPlugin(ScrollTrigger);

const Buttons = ({ color, textColor }) => {
  const buttonRefs = useRef([]);

  useEffect(() => {
    // Animate buttons coming from the bottom
    buttonRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { y: 100, opacity: 1 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 100%', // Start animation when the button is near the viewport
            end: 'top 10%',
            scrub: true, // Smooth scrolling
            toggleActions: 'play reverse play reverse', // Play animation and reverse it on scroll
          },
        },
      );
    });

    // Clean up ScrollTrigger instances
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

 

  return (
    <div className="flex justify-evenly items-center select-none">
      {buttonData.map(({ text, href }, index) => (
        <motion.a
          whileHover={{ scale: 1.5, color: color, backgroundColor: textColor, borderColor: color}}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'twin', damping: 5, duration: .5}}
          key={text}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          ref={(el) => (buttonRefs.current[index] = el)} // Attach ref to each button
          className="border-2 shine rounded-lg w-fit my-5 px-2 pt-1 flex justify-center items-center overflow-hidden"
          style={{ borderColor: textColor, color: textColor, backgroundColor: color,}}
        >
         <p className='z-[99]'> {text}</p>
        </motion.a>
      ))}
    </div>
  );
};

export default Buttons;
