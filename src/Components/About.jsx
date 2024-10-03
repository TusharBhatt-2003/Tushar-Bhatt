import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useColor } from "../context/ColorContext";
import { motion } from 'framer-motion';

const About = () => {
  const { color, textColor } = useColor(); // Context values for color
  const letterRefs = useRef([]); // Reference for each letter
  const sectionRef = useRef(null); // Reference for the entire About section

  // Animation for letters when the About section is in view
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
      id='aboutme'
      ref={sectionRef} // Attach the section reference for the IntersectionObserver
      className="h-screen w-screen flex flex-col justify-center items-center font-['Aero']"
      style={{ backgroundColor: color, color: textColor }}
    >
      <div
        className="border-4 m-5 rounded px-4 lg:px-10 lg:py-5 lg:w-[60vw] lg:h-fit"
        style={{ borderColor: textColor }}
      >
        {/* Animate each letter in "About Me" */}
        <h1 className="my-5 text-4xl lg:text-6xl font-bold font-['Integral']">
          {"About me.".split("").map((letter, index) => (
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

        {/* About Me paragraph */}
        <p className="my-5">
          I’m&nbsp;
          <span className="font-bold">
            <a href="https://www.instagram.com/_tush_ar._._/" className="hover:underline">
              Tushar Bhatt
            </a>
          </span>
          .<br />
          21-year-old front-end developer currently residing in Faridabad. Freshly graduated with a BCA from MDU, I’ve been honing my skills in web development and problem-solving. With a strong foundation in HTML, CSS, and JavaScript, I’ve also delved into popular frameworks like React, Vite, Tailwind, and Bootstrap. Eager to expand my expertise, I’m currently diving into the MERN stack to become a well-rounded full-stack developer.
        </p>

        {/* Additional paragraph */}
        <p className="my-5">
          Additionally, I'm exploring animation and motion libraries such as Framer Motion, GSAP, and Locomotive, as well as 3D rendering with React Three.
        </p>

        {/* Call to action */}
        <motion.p
            whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           transition={{ type: "spring", stiffness: 800, damping: 20 }}
           className="my-5 py-5 px-10 rounded-lg"
           style={{ backgroundColor: textColor, color: color }}
        >
          Please take a moment to explore my portfolio, where you'll find a curated selection of my projects. If you are interested in working together or have any inquiries, I would love to hear from you. Thank you for visiting my portfolio!
        </motion.p>
      </div>
    </div>
  );
};

export default About;
