import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../css/welcome.css';
import { useColor } from '../context/ColorContext';
import { colors } from '../data/colorData'; // Import colors array
import Dropdown from './Dropdown/Dropdown';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import { navLinks, T } from '../const';
import HomeButton from './HomeButton';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { ThemeIcon } from '../assets/logos';

export default function NavBar() {
  const { textColor, color, changeColor } = useColor();
  const [showHomeLink, setShowHomeLink] = useState(false);
  const homeLinkRef = React.useRef(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const location = useLocation();

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
        setShowHomeLink(false);
      } else {
        setShowHomeLink(true);
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
        gsap.fromTo(
          homeLinkRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 1, ease: 'bounce.out' },
        );
      } else {
        gsap.to(homeLinkRef.current, {
          opacity: 0,
          x: 500,
          duration: 0.5,
          ease: 'bounce.out',
        });
      }
    }
  }, [showHomeLink]);

  const hexToRgba = (hex, alpha) => {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const backgroundColorWithOpacity = hexToRgba(color, 0.5);

  return (
    <nav
      className="underlineCss z-50 fixed top-0 right-0 left-0 px-3 py-1 items-center text-center flex justify-between m-2 rounded-lg font-['Aero'] md:overflow-hidden"
      style={{
        color: textColor,
        '--after-bg-color': textColor,
        borderColor: textColor,
        backgroundColor: backgroundColorWithOpacity,
      }}
    >
      <div onClick={handleColorChange}>
        <h1 className="logo text-2xl cursor-pointer select-none">{T}</h1>
      </div>

      {location.pathname === '/' && (
        <ul
          className="md:flex text-xl font-thin space-x-4 pt-1 justify-center select-none hidden"
          style={{ color: textColor }}
        >
          {navLinks.map((item) => (
            <li
              key={item.id}
              ref={item.id === 'landingPage' ? homeLinkRef : null}
            >
              <Link
                to={item.id}
                smooth={true}
                duration={1500}
                className="cursor-pointer"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <RouterLink to="/theme">
            <li
              className="cursor-pointer"
              style={{
                color: textColor,
              }}
            >
              <ThemeIcon color={textColor} size={20} />
            </li>
          </RouterLink>
        </ul>
      )}

      {location.pathname != '/' ? <HomeButton /> : <Dropdown />}
    </nav>
  );
}
