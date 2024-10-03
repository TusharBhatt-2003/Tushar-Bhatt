// src/pages/Resume.jsx
import { useColor } from "../context/ColorContext";
import ResumeCard from './ResumeCard/Resumecard';
import resumeData from '../data/resumeData';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function Resume() {
  const { color, textColor } = useColor();
  const letterRefs = useRef([]); // Reference for each letter
  const sectionRef = useRef(null); // Reference for the entire resume section

  // Animation for letters when the resume section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate the "Resume." text when the section is visible
          gsap.fromTo(
            letterRefs.current,
            { opacity: 0, y: 50 }, // Initial state: letters start lower with 0 opacity
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              stagger: 0.1, // Animate letters one by one
              ease: "elastic.out(1, 0.3)" 
            }
          );
        }
      },
      { threshold: 0.5 } // Trigger animation when 50% of the section is visible
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
     ref={sectionRef} // Attach the section reference for the IntersectionObserver
     className='h-fit w-screen flex justify-center items-center py-20 font-["Aero"]'
         style={{ backgroundColor: color, color: textColor }}>
      <div className="border-4 m-5  rounded px-4 lg:px-10 lg:py-5 lg:w-[60vw] lg:h-fit"
           style={{ borderColor: textColor }}>
        <h1 className="my-5 text-4xl lg:text-6xl font-bold font-['Integral']">
        {/* Animate each letter in "Resume" */}
        {"Resume.".split("").map((letter, index) => (
            <motion.span
              ref={(el) => (letterRefs.current[index] = el)} // Assign each letter ref
              key={index}
              className="cursor-pointer font-bold"
              style={{
              display: "inline-block", // Ensure inline display
              marginRight: letter === " " ? "1rem" : "0", // Add space between "About" and "Me"
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <div className="resume-container flex flex-col md:grid md:grid-cols-2  gap-4">
          <ResumeCard title="Education" items={resumeData.education} />
          <ResumeCard title="Courses" items={resumeData.courses} />
          <ResumeCard title="Skills" items={resumeData.skills} /> 
          <ResumeCard title="Certificates" items={resumeData.certificates} />
          <div className="flex  justify-center items-center">
          <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10, mass: 1 }}
                  className="border-2 rounded-lg w-fit my-5 px-2 py-1"
                  style={{ borderColor: textColor,  }}
                  >My CV.
          </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
