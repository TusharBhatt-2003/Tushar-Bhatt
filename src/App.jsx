import React, { useEffect, useState, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

import LandingPage from './Components/LandingPage';
import About from './Components/About';
import Resume from './Components/Resume';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Loader from './Components/Loader';
import "./App.css";
import { useColor } from "./context/ColorContext";

const App = () => {
  const { color, textColor } = useColor();
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null); // Reference to scroll container
  const scrollInstance = useRef(null); // Reference to LocomotiveScroll instance

  // Function to convert color to RGBA with opacity
  const rgbaColor = (color, opacity = 0.7) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const rgb = window.getComputedStyle(tempDiv).color.match(/\d+/g);
    document.body.removeChild(tempDiv);
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2800); // Adjust time to match the number of text animations in Loader.jsx
  }, []);

  useEffect(() => {
    if (!loading) {
      // Initialize Locomotive Scroll
      scrollInstance.current = new LocomotiveScroll({
        el: scrollContainerRef.current,
        smooth: true, // Enable smooth scrolling
        lerp: 0.08,   // Adjust scrolling speed (default is 0.1)
        multiplier: 1, // Adjust scroll speed (higher values speed it up)
        smartphone: {
          smooth: true, // Enable smooth scrolling on smartphones
        },
        tablet: {
          smooth: true, // Enable smooth scrolling on tablets
        }
      });

      // Clean up Locomotive Scroll on component unmount
      return () => {
        if (scrollInstance.current) scrollInstance.current.destroy();
      };
    }
  }, [loading]);

  return (
    <div ref={scrollContainerRef} data-scroll-container style={{ backgroundColor: color, color: textColor }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <style>
            {`
              ::selection {
                background: ${rgbaColor(textColor, 0.7)};
                color: ${color};
              }
            `}
          </style>
          <LandingPage />
          <About />
          <Resume />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
