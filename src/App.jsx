import React, { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import LandingPage from './Components/LandingPage';
import About from './Components/About';
import Resume from './Components/Resume';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import "./App.css";
import { useColor } from "./context/ColorContext";

const App = () => {
  const { color, textColor } = useColor();

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    });

    return () => {
      locomotiveScroll.destroy();
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
      className='w-full h-full'
      data-scroll-container
      style={{ backgroundColor: color, color: textColor }}
    >
      {/* Dynamic style element for ::selection with opacity control */}
      <style>
        {`
          ::selection {
            background: ${rgbaColor(textColor, 0.7)}; /* Use rgba to control opacity */
            color: ${color};
          }
        `}
      </style>

      {/* Component hierarchy */}
      <LandingPage />
      <About />
      <Resume />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
