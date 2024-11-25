import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { colors } from '../../data/colorData';
import ThemeCard from './ThemeCard';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css'; //

const ThemeCardContainer = ({ textColor, handleThemeChange }) => {
  const cardRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    const scrollInstance = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 1, // Adjust speed of smooth scrolling
      class: 'is-reveal', // Class added to visible elements
    });

    return () => {
      scrollInstance.destroy(); // Clean up Locomotive Scroll on unmount
    };
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector('.scrollable-container');

    const handleWheel = (e) => {
      scrollContainer.scrollTop += e.deltaY;
    };

    scrollContainer.addEventListener('wheel', handleWheel);

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 500, scale: 0 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2,
        stagger: 0.08,
        ease: 'elastic.out(1.1, 1)',
      },
    );
  }, []);

  return (
    <div
      className="scrollable-container lg:h-[40vh] lg:border-4 overflow-y-auto lg:overflow-x-hidden rounded-3xl mb-5"
      style={{
        borderColor: textColor,
      }}
    >
      <div
         ref={containerRef}
         data-scroll-container
        className="lg:justify-center lg:items-center lg:py-5 flex lg:flex-wrap hide-scrollbar w-[99vw] lg:w-[80vw] gap-2 border-b pb-2"
      >
        {colors.map((theme, index) => (
          <ThemeCard
            key={index}
            index={index}
            theme={theme}
            handleThemeChange={handleThemeChange}
            cardRef={(el) => (cardRefs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeCardContainer;
