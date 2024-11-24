import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useColor } from '../context/ColorContext';
import { motion } from 'framer-motion';
import {
  aboutMeNote,
  aboutMeParagraph,
  aboutMeParagraph2,
  aboutName,
} from '../const';

const About = () => {
  const { color, textColor } = useColor(); // Context values for color
  const letterRefs = useRef([]); // Reference for each letter
  const sectionRef = useRef(null); // Reference for the entire About section
  const lastParaRef = useRef(null); // Reference for the last paragraph

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
              ease: 'elastic.out(1, 0.3)',
            },
          );

          // Animate the last paragraph when it becomes visible
          gsap.fromTo(
            lastParaRef.current,
            { opacity: 1, y: 900, scale: 0 }, // Start lower and hidden
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, // Fade in and slide up
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

  // Convert hex or CSS color names to rgba with desired opacity
  const rgbaColor = (color, opacity = 0.7) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const rgb = window.getComputedStyle(tempDiv).color.match(/\d+/g);
    document.body.removeChild(tempDiv);
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
  };

  return (
    <div
      id="aboutme"
      ref={sectionRef} // Attach the section reference for the IntersectionObserver
      className="h-screen w-screen flex flex-col justify-center items-center font-['Aero']"
      style={{
        backgroundColor: textColor,
        color: color,
        '--after-bg-color': color,
      }}
    >
      <div
        className="m-5 rounded-3xl px-4 lg:px-10 lg:py-5 lg:w-[60vw] lg:h-fit"
        data-scroll
        data-section
        data-scroll-speed="1"
      >
        <style>
          {`
            .inverted-selection::selection {
              background: ${rgbaColor(color, 0.7)} !important;
              color: ${rgbaColor(textColor, 1)} !important;
            }
          `}
        </style>

        <h1 className="my-5 text-4xl lg:text-6xl font-bold font-['Integral'] inverted-selection">
          {'About me.'.split('').map((letter, index) => (
            <motion.span
              ref={(el) => (letterRefs.current[index] = el)}
              key={index}
              className="cursor-pointer mb-5 font-bold"
              style={{
                display: 'inline-block',
                marginRight: letter === ' ' ? '1rem' : '0',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <p className="my-5 inverted-selection">
          <div className="flex underlineCssAbout text-3xl inverted-selection">
            I’m&nbsp;
            <p className="font-bold overflow-hidden inverted-selection">
              <a
                href="https://www.instagram.com/_tush_ar._._/"
                className="inverted-selection"
              >
                {aboutName}
              </a>
              ,
            </p>
          </div>
          {aboutMeParagraph}
        </p>

        <p className="my-5 inverted-selection">{aboutMeParagraph2}</p>

        {/* Last paragraph with GSAP animation */}
        <motion.p
          ref={lastParaRef}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 800, damping: 20 }}
          className="my-5 py-5 paper relative overflow-hidden px-10 rounded-lg"
          style={{ backgroundColor: color, color: textColor }}
        >
          {aboutMeNote}
        </motion.p>
      </div>
    </div>
  );
};

export default About;
