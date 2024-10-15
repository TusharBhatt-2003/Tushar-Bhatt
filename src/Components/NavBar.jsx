import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../css/welcome.css';
import { useColor } from "../context/ColorContext";
import { colors } from '../data/colorData'; // Import colors array
import Dropdown from './Dropdown/Dropdown';

export default function NavBar() {
  const { textColor, color, changeColor } = useColor(); // Destructure changeColor from context
  const [showHomeLink, setShowHomeLink] = useState(false); // State to track Home link visibility
  const homeLinkRef = React.useRef(null); // Reference for the Home link

  const handleColorChange = () => {
    const currentColorIndex = colors.findIndex(c => c.bgColor === color);
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    const { bgColor, textColor } = colors[nextColorIndex];
    changeColor(bgColor, textColor);
  };

  useEffect(() => {
    const landingPage = document.getElementById('landingPage');
  
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowHomeLink(false); // Hide Home link
      } else {
        setShowHomeLink(true); // Show Home link
      }
    });
  
    if (landingPage) {
      observer.observe(landingPage);
    }
  
    return () => {
      if (landingPage) {
        observer.unobserve(landingPage);
      }
    };
  }, []);
  
  useEffect(() => {
    if (homeLinkRef.current) {
      if (showHomeLink) {
        // Animate in
        gsap.fromTo(
          homeLinkRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 1, ease: "bounce.out" }
        );
      } else {
        // Animate out
        gsap.to(homeLinkRef.current, {
          opacity: 1,
          x: 100,
          duration: 1,
          ease: "bounce.out"
        });
      }
    }
  }, [showHomeLink]); // Dependency on showHomeLink
  
  // Function to convert hex to RGBA
  const hexToRgba = (hex, alpha) => {
    // Remove the leading '#' if it's there
    hex = hex.replace(/^#/, '');
    // Parse r, g, b values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    // Return the RGBA string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Update the background color with desired opacity (0.8 for example)
  const backgroundColorWithOpacity = hexToRgba(color, 0.2);

  return (
    <nav 
      className="border-2 z-50 fixed top-0 right-0 left-0 px-3 py-1 items-center text-center flex justify-between m-2 rounded-lg font-['Aero'] backdrop-blur"
      style={{ color: textColor, '--after-bg-color': textColor, borderColor: textColor, backgroundColor: backgroundColorWithOpacity }}
    >
      <a onClick={handleColorChange}> {/* Add onClick event to logo */}
        <h1 className='logo text-md cursor-pointer select-none'>
          Tushar
        </h1>
      </a> 
      <ul className="md:flex space-x-4 justify-center select-none hidden" style={{ color: textColor }}>
        {showHomeLink && 
        <li ref={homeLinkRef}>
            <a href='/'>Home</a>
        </li>} {/* Conditionally render Home link */}
        <li><a href="#aboutme">About me</a></li>
        <li><a href="#resume">Resume</a></li>  
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contactme">Contact</a></li> 
      </ul>
      <Dropdown />
    </nav>
  );
}
