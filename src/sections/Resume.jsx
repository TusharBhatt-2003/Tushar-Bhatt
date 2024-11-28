import { useColor } from '../context/ColorContext';
import { ResumeContainer, Buttons } from '../Components/resume/index.js';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedText from '../Components/AnimatedText.jsx';
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
        <AnimatedText text="Resume." textColor={textColor} />
        <ResumeContainer />
        <Buttons color={color} textColor={textColor} />
      </div>
    </div>
  );
};

export default Resume;
