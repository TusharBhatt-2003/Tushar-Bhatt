import { useState, useRef, useEffect } from 'react';
import { useColor } from '../../context/ColorContext';
import { gsap } from 'gsap';
import { Spin as Hamburger } from 'hamburger-react';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import { Link as RouterLink } from 'react-router-dom'; // For routing
import { ThemeIcon } from '../../assets/logos/index';

function Dropdown() {
  const { color, textColor } = useColor();
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const menuRefs = useRef([]);

  const menuItems = [
    { id: 4, label: 'Contact', href: 'contactme' },
    { id: 5, label: 'Projects', href: 'projects' },
    { id: 3, label: 'Resume', href: 'resume' },
    { id: 2, label: 'About', href: 'aboutme' },
    { id: 1, label: 'Home', href: 'landingPage' },
  ];

  useEffect(() => {
    if (dropdownToggled) {
      gsap.fromTo(
        menuRefs.current,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'bounce.out',
        },
      );
    }
  }, [dropdownToggled]);

  const handleClick = (id) => {
    setActiveItem(id);
    setDropdownToggled(false);
  };

  const handleMouseEnter = (id) => {
    setHoverItem(id);
  };

  const handleMouseLeave = () => {
    setHoverItem(null);
  };

  return (
    <div className="md:hidden relative flex flex-col items-center drop-shadow-2xl">
      <button onClick={() => setDropdownToggled(!dropdownToggled)}>
        <Hamburger size={30} color={textColor} toggled={dropdownToggled} />
      </button>
      {dropdownToggled && (
        <div className="absolute top-16 -right-4 flex flex-col items-center justify-center gap-5">
          <div
            className="flex flex-col items-center text-center rounded-xl drop-shadow-2xl select-none"
            style={{
              backgroundColor: textColor,
              opacity: 0.9,
              color: color,
              borderColor: color,
            }}
          >
            {/* Menu Items */}
            <div className="dropdown-menu w-full">
              {menuItems.map((menu, index) => (
                <ScrollLink
                  key={menu.id}
                  to={menu.href}
                  smooth={true}
                  duration={1000}
                >
                  <div
                    onClick={() => handleClick(menu.id)}
                    onMouseEnter={() => handleMouseEnter(menu.id)}
                    onMouseLeave={handleMouseLeave}
                    className={`pb-1 pt-2 px-4 m-1 font-["Aero"] rounded-lg`}
                    style={{
                      backgroundColor:
                        activeItem === menu.id
                          ? color
                          : hoverItem === menu.id
                            ? color
                            : '',
                      color:
                        activeItem === menu.id
                          ? textColor
                          : hoverItem === menu.id
                            ? textColor
                            : '',
                      borderColor: hoverItem === menu.id ? color : '',
                      opacity:
                        hoverItem === menu.id && activeItem !== menu.id
                          ? 0.8
                          : 1,
                    }}
                    ref={(el) => (menuRefs.current[index] = el)}
                  >
                    {menu.label}
                  </div>
                </ScrollLink>
              ))}
            </div>
          </div>
          {/* Theme Icon */}
          <RouterLink to="/theme">
            <div
              className="mb-2 p-3"
              style={{
                opacity: 0.9,
                borderColor: textColor,
                backgroundColor: color,
                color: textColor,
                borderRadius: '50%',
              }}
            >
              <ThemeIcon color={textColor} />
            </div>
          </RouterLink>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
