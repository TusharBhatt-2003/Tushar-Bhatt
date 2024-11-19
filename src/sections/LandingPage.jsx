import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useColor } from '../context/ColorContext';
import { colors, paragraphs } from '../data/colorData';
import {
  Hero,
  ParagraphSection,
  Button,
  LocationInfo,
} from '../Components/Landing/index.js';
const translations = {
  english: { text: 'TUSHAR', font: 'Bagel Fat One' },
  japanese: { text: 'タシャール', font: 'Rampart One' },
  korean: { text: '투샤르', font: 'Single Day' },
  hindi: { text: 'तु षा र', font: 'Kalam' },
};

const LandingPage = () => {
  const { color, textColor, changeColor } = useColor();
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('japanese');
  const letterRefs = useRef([]);
  const sectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // GSAP Animation on mount and language change
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Animate the text when the section is visible
        gsap.fromTo(
          letterRefs.current,
          { opacity: 0, y: 0, scale: 0 }, // Initial state: letters start lower with 0 opacity
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2,
            stagger: 0.1, // Animate letters one by one
            ease: 'elastic.out',
          },
        );
      }
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [currentLanguage]);

  useEffect(() => {
    const languages = Object.keys(translations);
    const languageInterval = setInterval(() => {
      setCurrentLanguage(
        (prev) => languages[(languages.indexOf(prev) + 1) % languages.length],
      );
    }, 3000);
    return () => clearInterval(languageInterval);
  }, []);

  const handleColorChange = () => {
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextColorIndex);
    const { bgColor, textColor } = colors[nextColorIndex];
    changeColor(bgColor, textColor);
  };

  return (
    <div
    id='landingPage'
      ref={sectionRef}
      className="w-screen h-screen flex flex-col lg:flex-row items-center justify-evenly"
    >
      <div className="lg:w-[40vw]">
        <Hero
          currentLanguage={currentLanguage}
          translations={translations}
          letterRefs={letterRefs}
          handleColorChange={handleColorChange}
          showHint={showHint}
          setShowHint={setShowHint}
        />
        <LocationInfo textColor={textColor} />
      </div>
      <div className="lg:w-[60vw] flex flex-col items-center text-center">
        <ParagraphSection
          paragraphs={paragraphs}
          currentColorIndex={currentColorIndex}
        />
        <Button
          color={color}
          textColor={textColor}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />
      </div>
    </div>
  );
};

export default LandingPage;
