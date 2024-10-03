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
        gsap.to(homeLinkRef.current, { opacity: 0, y: -20, duration: 0.5 }); // Animate out
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
        observer.unobserve(landingPage); // Cleanup observer on component unmount
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    if (showHomeLink) {
      gsap.from(homeLinkRef.current, 
        { 
          opacity: 0, x: -100, 
          duration: 1 }); // Animate in
    }
  }, [showHomeLink]);

  return (
    <nav className="border z-50 fixed top-0 right-0 left-0 px-3 py-1 items-center text-center flex justify-between mt-2 m-1 rounded font-['Aero']"
         style={{ color: textColor, '--after-bg-color': textColor, borderColor: textColor }}>
      <a onClick={handleColorChange}> {/* Add onClick event to logo */}
        <h1 className='logo text-md cursor-pointer'>
          Tushar
        </h1>
      </a> 
      <ul className="md:flex space-x-4 justify-center  hidden" style={{ color: textColor }}>
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