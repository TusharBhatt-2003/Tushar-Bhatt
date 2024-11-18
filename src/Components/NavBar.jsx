import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../css/welcome.css';
import { useColor } from "../context/ColorContext";
import { colors } from '../data/colorData'; // Import colors array
import Dropdown from './Dropdown/Dropdown';
import { Link } from 'react-scroll'; // Import Link from react-scroll

export default function NavBar() {
  const { textColor, color, changeColor } = useColor(); // Destructure changeColor from context
  const [showHomeLink, setShowHomeLink] = useState(false); // State to track Home link visibility
  const homeLinkRef = React.useRef(null); // Reference for the Home link
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
  const handleColorChange = () => {
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextColorIndex);
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
          opacity: 0,
          x: 500,
          duration: .5,
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
  const backgroundColorWithOpacity = hexToRgba(color, 0.5);

  return (
    <nav 
      className="underlineCss z-50 fixed top-0 right-0 left-0 px-3 py-1 items-center text-center flex justify-between m-2 rounded-lg font-['Aero'] md:overflow-hidden"
      style={{ color: textColor, '--after-bg-color': textColor, borderColor: textColor, backgroundColor: backgroundColorWithOpacity }}
    >
      <div onClick={handleColorChange}> {/* Add onClick event to logo */}
        <h1 className='logo text-2xl cursor-pointer select-none'>
          Tushar
        </h1>
      </div> 
      <ul className="md:flex text-xl font-thin space-x-4 pt-1 justify-center select-none hidden" style={{ color: textColor }}>

        <li ref={homeLinkRef}>
            <Link 
              to="landingPage" // Smooth scroll to landingPage
              smooth={true} // Enable smooth scrolling
              duration={500} // Duration of the scroll
              offset={-50} // Adjust the offset if needed (for fixed navbar)
              className="cursor-pointer"
            >
              Home
            </Link>
        </li>{/* Conditionally render Home link */}
        <li>
          <Link 
            to="aboutme" // Smooth scroll to aboutme
            smooth={true}
            duration={500}
            offset={-50}
            className="cursor-pointer"
          >
            About me
          </Link>
        </li>
        <li>
          <Link 
            to="resume" // Smooth scroll to resume
            smooth={true}
            duration={500}
            offset={-50}
            className="cursor-pointer"
          >
            Resume
          </Link>
        </li>
        <li>
          <Link 
            to="projects" // Smooth scroll to projects
            smooth={true}
            duration={500}
            offset={-50}
            className="cursor-pointer"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link 
            to="contactme" // Smooth scroll to contactme
            smooth={true}
            duration={500}
            offset={-50}
            className="cursor-pointer"
          >
            Contact
          </Link>
        </li>
      </ul>
      <Dropdown />
    </nav>
  );
}
