import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useColor } from '../context/ColorContext';
import { motion } from 'framer-motion';
import { colors, paragraphs } from '../data/colorData'; // Import the colors and paragraphs
import '../css/welcome.css';
import GithubIcon from '../assets/logos/github-logo-fill'; // Import the GithubIcon component
import HintPopup from './popUps/HintPopup'; // Import the HintPopup component
import Location from '../assets/logos/location';

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
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // GSAP Animation on mount and language change
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            letterRefs.current,
            { opacity: 0, autoAlpha: 0, scale: 0 },
            {
              opacity: 1,
              autoAlpha: 1,
              scale: 1,
              duration: 2,
              stagger: 0.2,
              ease: "elastic.out(1.5, 0.5)"
            }
          );
        }
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [currentLanguage]);

  // Automatically cycle through languages with reverse stagger
  useEffect(() => {
    const languages = Object.keys(translations);
    let languageIndex = 0;

    const languageInterval = setInterval(() => {
      const timeline = gsap.timeline();

      // Step 1: Fade out the current text with normal stagger
      timeline.to(letterRefs.current, {
        opacity: 0, // Fade out to invisible
        autoAlpha: 0,
        scale: 0,
        duration: 0.5, // Quick exit
        stagger: 0.2, // Forward stagger for exit
        ease: "power1.inOut",
        onComplete: () => {
          // Step 2: Change the language after fading out
          languageIndex = (languageIndex + 1) % languages.length;
          setCurrentLanguage(languages[languageIndex]);
        },
      });

      // Step 3: Fade in the new text with reverse stagger
      timeline.fromTo(
        letterRefs.current,
        { opacity: 0, autoAlpha: 0, scale: 0 },
        {
          opacity: 1,
          autoAlpha: 1,
          scale: 1,
          duration: 1.5,
          stagger: {
            amount: .5, // Total time to stagger
            from: "end" // Reverse the order of stagger
          },
          ease: "elastic.out(1.5, 0.5)" // Elastic bounce in
        }
      );
    }, 3000); // Change language every 3 seconds

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
                whileTap={{ scale: 0.7, rotate: -10 }}
                translate="no"
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 5,
                }}
                key={index}
                className="cursor-pointer text-4xl lg:text-6xl font-bold select-none hover:drop-shadow-2xl"
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

        <p className='text-xl lg:text-3xl mt-10 md:mt-5 font-medium drop-shadow-2xl'>A Frontend Developer</p>
        <div className='flex flex-col justify-center items-center font-thin lg:items-start text-sm lg:text-xl'>
          <p className='flex justify-center items-center'>Faridabad, Haryana. <Location color={textColor} size="20" /></p>
          <p>INDIA</p>
        </div>
      </div>

      <div 
        data-scroll data-scroll-speed="0.1"
        className='lg:ml-56 flex flex-col justify-center items-center lg:items-start text-center w-full'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-2xl font-light mx-10 font-["Aero"]'>
            {paragraphs[currentColorIndex]} {/* Change the paragraph based on the color index */}
          </p>
          <div className='w-fit btn flex gap-5'>
            {/* Button with dynamic border color and text color */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.1, color: color, borderColor: 'transparent', transition: 0.5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10, mass: 1 }}
              className='mt-10 justify-center motion-btn flex items-center text-center border-2 rounded-lg text-xl select-none'
              style={{
                '--after-bg-col': textColor,
                borderColor: textColor, // Use textColor from context for border color
                color: textColor, // Use textColor from context for text color
              }}
            >
              <p className='px-3 py-2'>Projects</p>
            </motion.a>

            {/* Button with dynamic border color and text color */}
            <motion.a
              onHoverStart={() => setIsHovered(true)} // Set hover state to true
              onHoverEnd={() => setIsHovered(false)}  // Reset hover state
              href="https://github.com/TusharBhatt-2003"
              target='_blank' rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: textColor, borderColor: color, transition: 0.5 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10, mass: 1
              }}
              className='mt-10 justify-center flex items-center border-2 rounded-lg text-xl select-none'
              style={{
                '--after-bg-col': color,
                borderColor: textColor, // Use textColor from context for border color
                color: textColor, // Use textColor from context for text color
              }}
            >
              <p className='flex gap-3 items-center justify-center px-3 py-2'>
                <GithubIcon color={textColor} /> Github
              </p>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
