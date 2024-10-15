import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useColor } from '../context/ColorContext';
import { motion } from 'framer-motion';
import { colors, paragraphs } from '../data/colorData'; // Import the colors and paragraphs
import '../css/welcome.css';
import GithubIcon from '../assets/logos/github-logo-fill'; // Import the GithubIcon component
import HintPopup from './popUps/HintPopup'; // Import the HintPopup component


// Translations for "TUSHAR" in different languages
const translations = {
  english: { text: "TUSHAR", font: "Bagel Fat One" },
  japanese: { text: "タシャール", font: "Rampart One" },
  korean: { text: "투샤르", font: "Single Day"},
  hindi: { text: "तु षा र", font: "Kalam"},
};

const LandingPage = () => {
  const { color, textColor, changeColor } = useColor(); // Destructure textColor from context
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState("japanese"); // Start with Japanese language
  const letterRefs = useRef([]); // Reference for each letter
  const sectionRef = useRef(null); // Reference for the entire contact section

  // GSAP Animation on mount and language change
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate the text when the section is visible
          gsap.fromTo(
            letterRefs.current,
            { opacity: 0, 
              x: 50,
              
            }, // Initial state: letters start lower with 0 opacity
            {
              opacity: 1,
              x: 0,
              duration: 2,
              stagger: 0.5, // Animate letters one by one
              ease: "circ.inOut ()",
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
  }, [currentLanguage]); // Re-run effect when language changes

  // Automatically cycle through languages
  useEffect(() => {
    const languages = Object.keys(translations);
    let languageIndex = 0;

    const languageInterval = setInterval(() => {
      languageIndex = (languageIndex + 1) % languages.length;
      setCurrentLanguage(languages[languageIndex]);
    }, 3000); // Change language

    return () => clearInterval(languageInterval);
  }, []);

  const handleColorChange = () => {
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextColorIndex);
    const { bgColor, textColor } = colors[nextColorIndex];
    changeColor(bgColor, textColor);
  };


  const [showHint, setShowHint] = useState(false);

  return (
    <div
      data-scroll data-scroll-section data-scroll-speed="-0.5"
      ref={sectionRef} // Attach the section reference for the IntersectionObserver
      id='landingPage'
      className='w-screen items-center justify-evenly gap-7 h-screen flex flex-col lg:flex-row lg:justify-center'
      style={{ backgroundColor: color, color: textColor }} // Use context textColor
    >
      <div 
        data-scroll data-scroll-speed="0.5"
        className='lg:ml-10 w-fit lg:w-full flex flex-col justify-center lg:items-start items-center lg:items-left'>
        <h1 className='text-5xl lg:text-6xl font-bold font-["Bright"] drop-shadow-2xl'>Hey There!</h1>
        <h1 className='text-4xl lg:text-5xl mt-7 md:mt-5 drop-shadow-2xl'>
          I'm{' '}
       {translations[currentLanguage].text
       // Conditionally split based on the language
    .split(currentLanguage === 'hindi' ? ' ' : '')
    .map((letter, index) => (
      <motion.span
        ref={(el) => (letterRefs.current[index] = el)} // Assign each letter ref
        whileHover={{ scale: 1.2, rotate: 3 }} // Slight rotation for emphasis
        whileTap={{ scale: 1.4, rotate: -10 }}
        translate="no"
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        key={index}
        className="cursor-pointer text-4xl lg:text-6xl font-bold select-none drop-shadow-2xl"
        style={{
          display: 'inline-block', // Ensure inline display
          fontFamily: translations[currentLanguage].font, // Set unique font for each language
          textRendering: 'optimizeLegibility'
        }}
        onClick={handleColorChange}
        onMouseEnter={() => setShowHint(true)} // Show hint on hover
        onMouseLeave={() => setShowHint(false)} // Hide hint when not hovering
      >
        {letter}
      </motion.span>
    ))}
</h1>
   <HintPopup isVisible={showHint} /> {/* Show the hint when hovered */}

        <p className='text-xl lg:text-3xl mt-10 md:mt-5 font-light drop-shadow-2xl'>A Frontend Developer</p>
      </div>

      <div 
      data-scroll data-scroll-speed="0.1"
      className='lg:ml-56 flex flex-col justify-center items-center lg:items-start text-center w-full'>
        <div className='flex flex-col items-center justify-center'>
          <p 
            className='text-2xl font-light mx-10 font-["Aero"]'>
            {paragraphs[currentColorIndex]} {/* Change the paragraph based on the color index */}
          </p>
          <div className='w-fit flex gap-5'>
            {/* Button with dynamic border color and text color */}
            <motion.button
             
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10, mass: 1 }}
              className='mt-10 flex items-center text-center border-2 rounded-lg px-3 py-2 text-xl select-none'
              style={{
                borderColor: textColor, // Use textColor from context for border color
                color: textColor, // Use textColor from context for text color
              }}
            >
              <a href="#projects">Projects</a>
            </motion.button>
              
            {/* Button with dynamic border color and text color */}
            <motion.button
             
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={
                { type: "spring",
                  stiffness: 400,
                  damping: 10, mass: 1 }
                  }
              className='w-full mt-10 px-5 flex justify-center items-center text-center border-2 rounded-lg text-xl select-none'
              style={{
                backgroundColor: textColor, // Use textColor from context for background color
                borderColor: color, // Use textColor from context for border color
                color: color, // Use textColor from context for text color
              }}
            >
              <GithubIcon color={color} size="32" /> {/* Use the GithubIcon component */}
              <a className='flex' href="https://github.com/TusharBhatt-2003"> Git Hub</a>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
