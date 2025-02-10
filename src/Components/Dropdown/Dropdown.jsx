import { useState, useRef } from 'react';
import { useColor } from '../../context/ColorContext';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import { motion } from 'framer-motion';

function Dropdown() {
  const { color, textColor } = useColor();
  const [activeItem, setActiveItem] = useState(null);
  const menuRefs = useRef([]);

  const menuItems = [
    { id: 4, label: 'Contact', href: 'contactme' },
    { id: 5, label: 'Projects', href: 'projects' },
    { id: 3, label: 'Resume', href: 'resume' },
    { id: 2, label: 'About', href: 'aboutme' },
  ];

  const hexToRgba = (hex, alpha) => {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const backgroundColorWithOpacity = hexToRgba(color, 0.5);

  return (
    <div className="md:hidden overflow-hidden fixed bottom-5 right-0 left-0 w-full flex items-center drop-shadow-2xl z-50 ">
      <div className="flex w-full items-center justify-center gap-2">
        <div
          className="mobile-nav px-5 py-2 backdrop-blur-lg items-center text-center rounded-full overflow-hidden select-none"
          style={{
            color: textColor,
            borderColor: textColor,
            backgroundColor: backgroundColorWithOpacity,
          }}
        >
          {/* Menu Items */}
          <div className="dropdown-menu flex flex-row-reverse justify-center items-center  w-full">
            {menuItems.map((menu, index) => (
              <ScrollLink
                key={menu.id}
                to={menu.href}
                smooth={true}
                duration={1000}
              >
                <motion.div
                  onClick={() => setActiveItem(menu.id)}
                  className={`p-2 font-["Aero"] flex justify-center items-center rounded-full border-2 border-transparent`}
                  style={{
                    backgroundColor: activeItem === menu.id ? textColor : '',
                    color: activeItem === menu.id ? color : '',
                    borderColor: activeItem === menu.id ? color : '',
                  }}
                  ref={(el) => (menuRefs.current[index] = el)}
                  initial={{ scale: 1 }} // Initial state
                  whiletap={{
                    scale: 1.2, // Enlarges slightly on hover
                    rotate: [0, 10, -10, 0], // Adds subtle jelly-like rotation
                  }}
                  whileTap={{ scale: 0.5 }} // Shrinks slightly when clicked
                  transition={{
                    type: 'spring', // Bouncy spring animation
                    stiffness: 900, // Controls bounce tightness
                    damping: 10, // Controls bounce duration
                  }}
                >
                  <p className="text-xl font-medium ">{menu.label}</p>
                </motion.div>
              </ScrollLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
