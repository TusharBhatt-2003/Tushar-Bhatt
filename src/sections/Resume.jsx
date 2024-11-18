import { useColor } from '../context/ColorContext';
import { ResumeContainer, Buttons } from '../Components/resume/index.js';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
const Resume = () => {
  const { color, textColor } = useColor();
  const sectionRef = useRef(null);
  const letterRefs = useRef([]); // Reference for each letter

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate the "About Me" text when the section is visible
          gsap.fromTo(
            letterRefs.current,
            { opacity: 0, y: 50 }, // Initial state: letters start lower with 0 opacity
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              stagger: 0.1, // Animate letters one by one
              ease: 'elastic.out(1, 0.3)',
            },
          );
        }
      },
      { threshold: 0.5 }, // Trigger animation when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
  return (
    <div
      id="resume"
      ref={sectionRef}
      className="h-screen w-screen grid place-content-center py-20 font-['Aero'] overflow-hidden"
      style={{ color: textColor }}
    >
      <div className="m-5 flex flex-col justify-evenly rounded-3xl px-4 lg:px-10 lg:w-[60vw] h-[80vh]">
        <h1 className="my-5 text-4xl lg:text-6xl font-bold font-['Integral'] inverted-selection">
          {'resume.'.split('').map((letter, index) => (
            <motion.span
              ref={(el) => (letterRefs.current[index] = el)} // Assign each letter ref
              key={index}
              className="cursor-pointer mb-5 font-bold"
              style={{
                display: 'inline-block', // Ensure inline display
                marginRight: letter === ' ' ? '1rem' : '0', // Add space between "About" and "Me"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <ResumeContainer />
        <Buttons color={color} textColor={textColor} />
      </div>
    </div>
  );
};

export default Resume;
